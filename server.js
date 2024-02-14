const port = require('node:process').env.PORT || 3000
const path = require('node:path')
const Express = require('express')

const log = console

const app = new Express()
app.use(express.static('./.output/public'))

app.use((request, res, next) => {
  log.log('[CALL_ROUTE] [', request.originalUrl, '] ', ' METHOD [', request.method, '] ')
  next()
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist', 'index.html'))
})

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './dist', 'index.html')))

app.listen(port, () => {
  log.log('**** ->  App listening on port : ', port)
})
