const express = require('express')
const Entries = require('../models/').Entries
const Sequelize = require('sequelize')

const router = express.Router()

router.get('/entries', (request, response, next) => {
  Entries.findAll()
  .then( entry => {
    return response.json(entry)
  })
  .catch(err =>  next(err))
})


router.post('/entries', (request, response, next) => {
  Entries.create(request.body).then( entry => {
    return response.send("ok")
  })
  .catch(err =>  {
    if (err instanceof Sequelize.ValidationError) {
      let message = err.errors.map(e => e.message)
      return response.status(500).json(message)
    }
    return next(err)
  })
})

router.patch('/entries', (request, response, next) => {
  const d = new Date(request.body.date)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const formattedMonth  = month < 10 ? `0${month}`: month
  const formattedDay = day < 10 ? `0${day}` : day
  const fullDate = `${d.getFullYear()}-${formattedMonth}-${formattedDay}`
  const update = {
    ...request.body,
    date: fullDate
  }
  Entries.update(update, {where : { date: request.body.date }}).then( entry => {
    return response.send("ok")
  })
  .catch(err =>  {
    return next(err)
  })
})

module.exports = router
