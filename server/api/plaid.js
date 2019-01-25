const express = require('express');
const plaid = require('plaid');
const router = express.Router();

// const passport = require('passport');
module.exports = router;

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET_DEVELOPMENT;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PUBLIC_KEY,
  plaid.environments.development,
  { version: '2018-05-22' }
);

router.post('/get_access_token', async (req, res) => {
  try {
    const public_token = req.body.public_token;
    const res = await plaidClient.exchangePublicToken(public_token);
    const access_token = res.access_token;
    const accounts = await plaidClient.getAccounts(access_token);
    console.log('accounts.accounts is ', accounts.accounts);
    res.json(accounts);
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
