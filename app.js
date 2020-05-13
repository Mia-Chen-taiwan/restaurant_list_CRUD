const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})