const Restaurant = require('../restaurant')
const rList = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  //此處參考同學的code (我一開始一直想不到要怎麼import data)
  rList.results.forEach((r) => {
    Restaurant.create({
      name: r.name,
      name_en: r.name_en,
      category: r.category,
      image: r.image,
      location: r.location,
      phone: r.phone,
      google_map: r.google_map,
      rating: r.rating,
      description: r.description
    })
  })
  console.log('done!')
})