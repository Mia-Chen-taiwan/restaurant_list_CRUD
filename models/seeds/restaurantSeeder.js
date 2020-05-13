const mongoose = require('mongoose')
const Todo = require('../restaurant') // 載入 todo model
mongoose.connect('mongodb://localhost/restuarant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})