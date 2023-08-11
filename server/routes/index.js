const {Router} = require('express')
const apiRouter = Router()

const postsRouter = require('./postsRoutes')
const commentsRouter = require('./commentsRoutes')
// const postContentRouter = require('./postContentRoutes')

apiRouter.use('/posts', postsRouter)
apiRouter.use('/comments', commentsRouter)
// apiRouter.use('/postContent', postContentRouter)

module.exports = apiRouter