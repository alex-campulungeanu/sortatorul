const {Router} = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const postsRouter = Router()

postsRouter.get('/', async (event, res) => {
  const siteUrl = 'https://zoso.ro/'
  let postList = []

  const fetchHtml = async (url) => {
    const {data} = await axios(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    return cheerio.load(data)
  }

  const getUrls = async () => {
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
    let urls = await getUrls()
    return res.send(urls)
  } catch (error) {
    console.log(`[+] fetch posts error2: ${error.message}`)
    return res.status(500).send('Something went terrybli wrong where fetching urls!')
  }

})

module.exports = postsRouter
