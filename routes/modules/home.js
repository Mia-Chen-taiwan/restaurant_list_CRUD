// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
// READ 瀏覽所有餐廳
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// searching restaurant
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  // 此處參考同學的作品
  Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
  .lean()
  .then(restaurants => res.render('index', { restaurants, keyword }))
  .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router