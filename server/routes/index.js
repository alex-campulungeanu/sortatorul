const {Router} = require('express')
const apiRouter = Router()

const postsRouter = require('./postsRoutes')
const commentsRouter = require('./commentsRoutes')

apiRouter.use('/posts', postsRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter