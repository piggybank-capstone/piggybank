const express = require('express');
const plaid = require('plaid');
const router = express.Router();
const { User } = require('../db/models');

// const passport = require('passport');
module.exports = router;

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET_SANDBOX;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: '2018-05-22' }
);

// router.get('/accounts/get', async (req, res, next) => {
//   try {
//     console.log('post accounts/get route hit');
//     if (req.user) {
//       const userId = req.user.id;
//       const user = User.findByPk(userId);
//       const access_token = user.access_token;
//       const accountRes = await plaidClient.getAccounts(access_token);
//       console.log('accounts are ', accountRes);
//       res.json(accountRes);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

router.post('/get_access_token', async (req, res, next) => {
  try {
    const public_token = req.body.public_token;
    const userId = req.user.id;
    const tokenResponse = await plaidClient.exchangePublicToken(
      public_token,
      async (error, tokenResponse) => {
        if (error != null) {
          const msg = 'Could not exchange public token!';
          console.log(msg + error);
          return res.json({ error: msg });
        }
        const user = await User.findByPk(userId);
        await user.update({
          access_token: tokenResponse.access_token,
          item_id: tokenResponse.item_id,
        });
        const accountRes = await plaidClient.getAccounts(
          tokenResponse.access_token
        );
        const transactionRes = await plaidClient.getTransactions(
          tokenResponse.access_token,
          '2018-10-01',
          '2019-01-20'
        );
        res.json({
          accounts: accountRes.accounts,
          transactions: transactionRes.transactions,
        });
      }
    );
  } catch (err) {
    next(err);
  }
});
