const router = require('express').Router();
const { Budget, Category } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const budgets = await Budget.findAll({
      where: {
        userId
      },
      include: [{ model: Category }]
    });
    res.json(budgets);
  } catch (err) {
    next(err);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

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
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { categoryId, amount } = req.body;
    const { userId } = req.session;

    const foundBudget = await Budget.findOne({
      where: {
        categoryId: categoryId,
        userId: userId
      }
    });

    if (foundBudget) {
      Budget.update({
        amount,
        where: {
          id: foundBudget.id
        }
      });
    } else {
      Budget.create({
        categoryId,
        amount,
        userId
      });
    }

    // const createdBudget = await Budget.create({
    //   categoryId,
    //   amount,
    //   userId
    // });
    // const budgetFound = await Budget.find({
    //   where: {
    //     id: createdBudget.id
    //   },
    //   include: [{ model: Category }]
    // });
    // res.json(budgetFound);
  } catch (err) {
    next(err);
  }
});
