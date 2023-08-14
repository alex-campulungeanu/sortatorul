const cheerio = require('cheerio')

const {axiosService} = require('../src/services/axiosService')

export const fetchHtml = async (url) => {
  const {data} = await axiosService(url, {
    method: 'GET',
  })
  return cheerio.load(data)
}

// export default fetchHtml