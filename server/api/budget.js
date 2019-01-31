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

router.get('/categories', async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const budgets = await Budget.findAll({
      where: {
        userId
      },
      include: [{ model: Category }]
    })

    const categories = await Category.findAll();
    let unUsedCat = [];

    const currentCats = budgets.map(budget => {
      return (budget.category.id);
    })


    categories.forEach(cat => {
      if (!currentCats.includes(cat.id)) {
        unUsedCat.push(cat)
      }
    })

    res.json(unUsedCat)


  } catch (err) {
    next(err)
  }
})



router.delete('/:budgetId', async (req, res, next) => {
  try {

    const budgetId = req.params.budgetId;

    await Budget.destroy({
      where: {
        id: budgetId
      }
    });

    res.sendStatus(202);
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {
  try {

    const { categoryId, amount } = req.body;
    const { userId } = req.session


    const createdBudget = await Budget.create(
      {
        categoryId,
        amount,
        userId
      }
    );

    res.json(createdBudget);
  } catch (err) {
    next(err)
  }
})
