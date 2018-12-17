import express from 'express'
import { createError } from 'http-errors'
import path from 'path'
import cookieParse from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'
import indexRouter from './routes/index'
import movieRouter from './routes/movie'
import searchRouter from './routes/search'

// Declare an app from express
const app = express()

app.use (helmet())

// Validate API key
app.use((req, res, next) => {
  if(req.query.api_key != 123456789) {
    res.status(401)
    res.json('Invalid API Key')
  }
  else {
    next()
  }
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParse())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/movie', movieRouter)
app.use('/search', searchRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app