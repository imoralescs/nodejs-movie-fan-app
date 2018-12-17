import express from 'express'
import movieDetails from '../data/movieDetails'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Movie' })
})

// -> /movie/top_rated?api_key=123456789&page=1
router.get('/top_rated', (req, res, next) => {
    let page = req.query.page
    if(!page){
        page = 0;
    }
    const results = movieDetails.sort((a,b) => {
        return b.vote_average - a.vote_average
    })

    const indexToStart = (page - 1) * 20
    res.json(results.slice(indexToStart, indexToStart + 20))
})

// For Analytics purpose, check api hit
router.param('movieId', (req, res, next) => {
    console.log('User hit a route movieId')
    next()
})

// Need to be after /top_rated route
router.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId
    const results = movieDetails.find((movie) => {
        return movie.id == movieId
    })
    
    if(!results) {
        res.json({
            msg: 'Movie ID is not found!'
        })
    }
    else {
        res.json(results)
    }
})

// POST PUT DELETE must be a JSON query
/*
const requireJSON = function(){
    if(!req.is('application/json')) {
        res.json({msg: 'Content type must be application/json'})
    }
    else {
        next()
    }
}
*/

function requireJSON(req, res, next){
    if(!req.is('application/json')) {
        res.json({
            msg: 'Content type must be application/json'
        })
    }
    else {
        next()
    }
}

router.post('/:movieId/rating', requireJSON, (req, res, next) => {
    const movieId = req.params.movieId
    const userRating = req.body.value

    if((userRating < .5) || (userRating > 10)) {
        res.json({
            msg: 'Rating must be between .5 and 10'
        })
    }
    else {
        res.json({
            msg: 'Thank you for submitting your rating',
            status_code: 200
        })
    }
})

router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
    res.json({
        msg: 'Rating deleted'
    })
})

export default router