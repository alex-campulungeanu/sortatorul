const os = require("os");
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const morganMiddleware = require('./middlewares/morgan-middleware')
const apiRouter = require('./routes')

const app = express()
const port = 3091

app.use(express.json());
app.use(cors());
app.use(morgan('combined')); //TODO: proper configuration for morgan
app.use(morganMiddleware);

app.get('/api/test', (req, res) => {
  res.send('Test success')
})

app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`App listening at http://${os.hostname()}:${port}`)
})