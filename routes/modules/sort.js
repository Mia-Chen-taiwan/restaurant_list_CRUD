// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// sorting restaurant
router.get('/:type/:direction', (req, res) => {
    const { type, direction } = req.params
    Restaurant.find()
    .lean()
    .sort({ [type]: [direction] })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
  })

module.exports = router