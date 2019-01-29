const router = require('express').Router()
const { Budget, Category } = require('../db/models');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const budgets = await Budget.findAll({
      where: {
        userId
      },
      include: [{ model: Category }]
    })
    res.json(budgets);
  } catch (err) {
    next(err)
  }
})
