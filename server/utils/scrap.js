const axios = require('axios')
const cheerio = require('cheerio')

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

module.exports.fetchHtml = fetchHtml