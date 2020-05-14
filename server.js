const express = require('express')
const bodyParser = require('body-parser')
const entriesApi = require('./routes/entries')

const app = express()
if (process.env.NODE_ENV === 'production'){
  const path = require('path')
  app.use(express.static(path.join(__dirname, 'client', 'dist')))
}
app.use(bodyParser.json())
app.use('/api', entriesApi)

app.use(function(req, res, next) {
  res.status(400).send('Not Found')
})

app.use(function(req, res, next) {
  res.status(500).send('Server Error')
})

let server = app.listen(process.env.PORT || 3000, function () {
  console.log('App runnning on port: ', server.address().port)
})