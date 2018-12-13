import express from 'express'

// Declare an app from express
const app = express()

// Catch all or 404
app.all('*', (req, res) => {
    res.json({ok: true})
})

export default app