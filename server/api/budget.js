const router = require('express').Router()

module.exports = router

router.get('/', async (req, res, next) => {
  try {

    console.log("BUDGET")
  } catch (err) {
    next(err)
  }
})
