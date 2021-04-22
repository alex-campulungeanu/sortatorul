const {Router} = require('express')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')


const commentsRouter = Router()

commentsRouter.get('/', async (event, res) => {
  const url = event.query.url

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
      return res.send(comms)
    } else {
      return res.status(500).send('Post URL is missing')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send('Something went terrybli wrong !')
  }

})

module.exports = commentsRouter