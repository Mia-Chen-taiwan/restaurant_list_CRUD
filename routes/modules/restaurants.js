// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// CREATE 新增餐廳
router.get('/new', (req,res) => {
    return res.render('new')
  })
  
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  const id = req.params.id
  const show = true
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant, show }))
    .catch(error => console.log(error))
})
  
// UPDATE 編輯餐廳資料
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
  
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, rating, image, location, phone, description} = req.body
  return Restaurant.findById(id)
    .then(r => {
      r.name = name
      r.name_en = name_en
      r.category = category
      r.rating = rating
      r.image = image
      r.location = location
      r.phone = phone
      r.google_map = `https://www.google.com/maps/search/?api=1&query=${location}`
      r.description = description
      return r.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
  
// DELETE 刪除餐廳
router.get('/:id/delete', (req, res) => {
  const id = req.params.id
  const del = true
  Restaurant.findById(id)
    .lean()
    .then((restaurant => res.render('show', { restaurant, del })))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router