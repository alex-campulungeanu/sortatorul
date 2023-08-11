const {Router} = require('express')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')


const postContentRouter = Router()

postContentRouter.get('/', async (event, res) => {
  const url = event.query.url
  console.log('enter here')
  
  
  

})

module.exports = postContentRouter