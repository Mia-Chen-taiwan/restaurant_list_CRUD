const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const app = express()
const port = 3000

//setting database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// routes setting
// READ 瀏覽所有餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// CREATE 新增餐廳
app.get('/restaurants/new', (req,res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restaurant = req.body
  return Restaurant.create({
    name: restaurant.name,
    name: restaurant.name_en,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`,
    description: restaurant.description,
    rating: restaurant.rating
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// READ 瀏覽特定餐廳詳細資訊
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// UPDATE 編輯餐廳資料
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = req.body
  return Restaurant.findById(id)
    .then(r => {
      r.name = restaurant.name
      r.name_en = restaurant.name_en
      r.category = restaurant.category
      r.rating = restaurant.rating
      r.image = restaurant.image
      r.location = restaurant.location
      r.phone = restaurant.phone
      r.google_map = `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`
      r.description = restaurant.description
      return r.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// DELETE 刪除餐廳
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})