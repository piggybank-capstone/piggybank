// function takes in an array of accounts and outputs
// a dataset that contains account name and total available
// { name: [cat1, cat2, etc], value: [val1, val2, etc]} ?
export const categorizeAccounts = accountsArr => {
  let data = {};
  let finalData = [];
  accountsArr.forEach(account => {
    if (!data[account.name]) {
      if (account.balances) {
        data[account.name] = account.balances.available;
      }
    }
  });
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      finalData.push({ name: key, value: data[key] });
    }
  }
  return finalData;
};
