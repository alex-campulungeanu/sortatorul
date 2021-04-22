const cheerio = require('cheerio')

const {axiosService} = require('../src/services/axiosService')

module.exports.handler = async (event) => {
  // TODO: ar trebui sa pun asta intr-o constanta, este folosita in mai multe locuri
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  const url = event.queryStringParameters.url

  const fetchHtml = async (url) => {
    const {data} = await axiosService(url, {
      method: 'GET',
    })
    return cheerio.load(data)
  }

  const getComments = async (url) => {
    let commentsList = []
    let $
    try {
      $ = await fetchHtml(url)
    } catch (error) {
      console.log(`[+] fetch comments error: ${error.message}`)
    }
    const comments = $('ol.commentlist > li')
    comments.each((idx, el) => {
      // let childsList = []
      //TODO: This is a stupid implementation but it works for now
      let parentId = $(el).attr('id')
      let parentNr = parseInt($(el).find(`#div-${parentId} div.cmtnr`).text().replace(/\D/g,''))
      let parentAuthor = $(el).find(`#div-${parentId} cite.fn`).text()
      let parentUp = parseInt($(el).find(`#div-${parentId} i.icon-thumbs-up`).text())
      let parentDown = parseInt($(el).find(`#div-${parentId} i.icon-thumbs-down`).text())
      let parentBody = $(el).find(`#div-${parentId} div.comment-content p`).text()
      let childs = $(el).find('ul.children li')
      let commentObj = {
        id: parentId,
        parentId: 0,
        nr: parentNr,
        author: parentAuthor,
        up: parentUp,
        down: parentDown,
        body: parentBody,
        // childs: childsList
      }
      commentsList.push(commentObj)
      childs.each((idx, el) => {
        let childId = $(el).attr('id')
        let childNr = parseInt($(el).find(`#div-${childId} div.cmtnr`).text().replace(/\D/g,''))
        let childAuthor = $(el).find(`#div-${childId} cite.fn`).text()
        let childUp = parseInt($(el).find(`#div-${childId} i.icon-thumbs-up`).text())
        let childDown = parseInt($(el).find(`#div-${childId} i.icon-thumbs-down`).text())
        let childBody = $(el).find(`#div-${childId} div.comment-content p`).text()
        let childObj = {
          id: childId,
          parentId: parentId,
          nr: childNr,
          author: childAuthor,
          up: childUp,
          down: childDown,
          body: childBody,
        }
        commentsList.push(childObj)
      })
    })
    return commentsList
  }
  
  try {
    if (url) {
      let comms = await getComments(url)
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          data: comms
        })
      }
    } else {
      return {
        headers,
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          data: 'Post URL is missing'
        })
      }
    }
  } catch (error) {
    console.log(error)
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        data: 'Something went terrybli wrong where fetching urls!'
      })
    }
  }

}