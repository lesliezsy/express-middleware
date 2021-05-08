  const express = require('express')
  const morgan = require('morgan')
  const app = express()
  const PORT = process.env.PORT || 3000;
  const moment = require('moment-timezone');

  // way01: middleware as function
  // const logger = function (req, res, next) {
  //   req.logger = Date.now();
  //   console.log(`Requested at: ${req.logger}`)
  //   next();
  // };
  // app.use(logger)
  // app.get('/', logger, (req, res) => {
  //   res.send('列出全部 Todo')
  // })

  // way02: utilize morgan module and moment-timezone
  morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format('YYYY-MM-DD HH:mm:ss');
  })
  morgan.format('myformat', 'timestamp: :date[Asia/Taipei] | method: :method | from: :url | response time: :response-time ms');
  
  app.use(morgan('myformat'))

  app.get('/', (req, res) => {
    res.send('列出全部 Todo')
  })

  app.get('/new', (req, res) => {
    res.send('新增 Todo 頁面')
  })

  app.get('/:id', (req, res) => {
    res.send('顯示一筆 Todo')
  })

  app.post('/', (req, res) => {
    res.send('新增一筆  Todo')
  })


  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })