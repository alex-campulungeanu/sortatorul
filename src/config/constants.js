//TODO: nu e bine asa
let BASE_URL
if (process.env.NODE_ENV==='development') {
  BASE_URL = 'http://localhost:9000/.netlify/functions'
} else {
  BASE_URL = '/.netlify/functions'
}

export const config = {
  proxy: process.env.http_proxy,
}

export const SERVER_API_BASE_URL = BASE_URL
