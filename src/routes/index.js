import express from 'express'
import movies from '../data/movies'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
})

router.get('/most_popular', (req, res, next) => {
  let page = req.query.page
  page = typeof page === 'undefined'
    ? page = 1
    : page

  let results = movies.filter((movie) => {
    return movie.most_popular;
  })

  const indexToStart = (page - 1) * 20
  results = results.slice(indexToStart, indexToStart + 19)
  res.json({ 
    page, 
    results
  })
})

export default router