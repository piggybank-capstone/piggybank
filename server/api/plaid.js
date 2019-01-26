const express = require('express');
const plaid = require('plaid');
const router = express.Router();
const User = require('../db/models');

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

router.post('/accounts/get', async (req, res, next) => {
  try {
    const public_token = req.body.public_token;
    console.log('public token is ', public_token);
    const userId = req.user.id;
    const { access_token, item_id } = await plaidClient.exchangePublicToken(
      public_token
    );
    const user = await User.findByPk(userId);
    await user.update({
      access_token: access_token,
      item_id: item_id,
    });
    console.log('user is now ', user);

    // const accountRes = await plaidClient.getAccounts(access_token);
    // console.log('accounts are ', accountRes);
    // res.json(accounts);
  } catch (err) {
    if (!plaid.isPlaidError(err)) {
      res.sendStatus(500);
      return;
    }
    console.log('/exchange token returned an error', {
      error_type: err.error_type,
      error_code: res.statusCode,
      error_message: err.error_message,
      display_message: err.display_message,
      request_id: err.request_id,
      status_code: err.status_code,
    });
    res.sendStatus(500);
  }
});

router.post('/accounts/get', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
