require('express-async-errors') // 인터셉터가 비동기를 캐치할 수 있게 하는 의존성

const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')

const { responseBody, responseDtoJson } = require('./src/utils/response_dto.js')
const router = require('./src/routes/router.js')
const { initEnv } = require('./config/init_env.js')

const { Connection } = require('./config/db/dbCon.js')

///
/// 환경 변수 셋팅
initEnv()

const app = express()

///
/// Express Midleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

///
/// ejs template
app.set('view engine', 'ejs')
app.set('views', './public/static/views')

///
/// Express Route Import
app.use(router)

///
/// DB - DB env 셋팅 먼저!
// Connection();

///
/// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error()
  err.message = 'Page Not Found'
  res.status(404).json(responseBody(err, 'Page Not Found', 404)).end()
})

///
/// UnExpected Error Global Exception Handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  responseDtoJson(err, null, null, res)
})

///
/// Application Start
app.listen(process.env.PORT, function () {
  console.log('SERVER_RUNNING ::: ' + process.env.PORT)
})
