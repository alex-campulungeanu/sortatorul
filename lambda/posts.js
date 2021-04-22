const cheerio = require('cheerio')

const {axiosService} = require('../src/services/axiosService')

module.exports.handler = async (event, context, callback) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };
  
  const siteUrl = 'https://zoso.ro/'
  let postList = []

  const fetchHtml = async (url) => {
    const {data} = await axiosService(url, {
      method: 'GET',
    })
    return cheerio.load(data)
  }

  const getPosts = async () => {
    let $
    try {
      $ = await fetchHtml(siteUrl)
    } catch (error) {
      console.log(`[+] fetch posts error: ${error.message}`)
    }
    const urlList = $('h3.post-title a')
    urlList.each((idx, el) => {
      const url = $(el).attr('href')
      const text = $(el).text()
      let urlObj = {
        url: url,
        label: text
      }
      postList.push(urlObj)
    })
    return postList
  }

  try {
    let urls = await getPosts()
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: urls
      })
    }
  } catch (error) {
    console.log(`[+] fetch posts error2: ${error}`)
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        data: 'Something went terrybli wrong where fetching urls!'
      })
    }
  }
};