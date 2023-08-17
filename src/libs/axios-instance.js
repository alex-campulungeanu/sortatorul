import axios from 'axios'

class HttpError extends Error {
  constructor(message) {
    super(message) // 'Error' breaks prototype chain here
    this.name = 'HttpError'
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
  }
}

function responseHandler(response) {
  return response
}

function responseErrorHandler(response) {
  console.log('Enter error  handler')
  // return Promise.reject('eroare magnicifca')
  throw new HttpError("Whoops!");
}

//Intercept after response, usually to deal with result data or handle ajax call errors
const axiosDefaults = {}
const http = axios.create(axiosDefaults)
//register interceptor like this
http.interceptors.response.use(responseHandler, responseErrorHandler)

export default http