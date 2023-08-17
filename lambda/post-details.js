const {fetchHtml} = require('../lambda_utils/common')
const { headers } = require('../lambda_utils/constants')

module.exports.handler = async (event) => {
  const url = event.queryStringParameters.url

  const getDetails = async (url) => {
    // TODO: create a function in lambda utils to validate the url (proper with zoso.ro validation)
    let commentsList = []
    let postContent = ''
    let postTitle = ''
    let $
    try {
      $ = await fetchHtml(url)
    } catch (error) {
      // TODO: raise here an error and send the response with the error
      console.log(`[+] fetch comments error: ${error.message}`)
    }

    postTitle = $('h1.post-title').text()
    postContent = $('div.post-content').html()
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
    return {
      comments: commentsList,
      content: postContent,
      title: postTitle
    }
  }
  
  try {
    if (url) {
      let comms = await getDetails(url)
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
        statusCode: 400,
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