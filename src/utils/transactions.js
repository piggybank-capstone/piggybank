// function takes in an array of transactions and outputs
// a dataset that contains category names and transaction amounts
// { name: [cat1, cat2, etc], value: [val1, val2, etc]}
export const categorizeTransactionsByMonth = (transactionsArr, month) => {
  let data = {};
  let finalData = [];
  transactionsArr.forEach(transaction => {
    let monthNum = transaction.date ? Number(transaction.date.slice(5, 7)) : 0;
    if (
      transaction.category &&
      data[transaction.category[0]] &&
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer' &&
      monthNum === month
    ) {
      data[transaction.category[0]] += Math.round(transaction.amount);
    } else if (
      transaction.category &&
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer' &&
      monthNum === month
    ) {
      data[transaction.category[0]] = Math.round(transaction.amount);
    }
  });
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== undefined) {
      finalData.push({ name: key, value: data[key] });
    }
  }
  return finalData;
};

export const categorizeTransactions = transactionsArr => {
  let data = {};
  let finalData = [];
  transactionsArr.forEach(transaction => {
    if (
      transaction.category &&
      data[transaction.category[0]] &&
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer'
    ) {
      data[transaction.category[0]] += Math.round(transaction.amount);
    } else if (
      transaction.category &&
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer'
    ) {
      data[transaction.category[0]] = Math.round(transaction.amount);
    }
  });
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      finalData.push({ name: key, value: data[key] });
    }
  }
  return finalData;
};

export const categorizeTransactionsByMerchant = transactionsArr => {
  let data = {};
  let finalData = [];
  let filtered = transactionsArr.filter(
    elem =>
      elem.category &&
      elem.category[0] !== 'Payment' &&
      elem.category &&
      elem.category[0] !== 'Transfer'
  );
  filtered.forEach(transaction => {
    if (data[transaction.name]) {
      data[transaction.name] += Math.round(transaction.amount);
    } else {
      let included = false;
      const partialName = transaction.name.slice(0, 4);
      for (let key in data) {
        if (key.includes(partialName)) {
          data[key] += Math.round(transaction.amount);
          included = true;
        }
      }
      if (!included) {
        data[transaction.name] = Math.round(transaction.amount);
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

export const maxMerchant = uniqueMerchantArr => {
  let maxAmountArr = [];
  let maxAmount = 0;

  for (let i = 0; i < uniqueMerchantArr.length; i++) {
    if (uniqueMerchantArr[i].value > maxAmount) {
      maxAmount = uniqueMerchantArr[i].value;
    }
  }

  uniqueMerchantArr.forEach(merchant => {
    if (merchant.value === maxAmount) {
      let maxMerchant = { value: merchant.value, name: merchant.name };
      maxAmountArr.push(maxMerchant);
    }
  });
  return maxAmountArr;
};

export const countMerchant = transactionsArr => {
  let data = {};
  let mostCount = [];

  transactionsArr.forEach(transaction => {
    if (
      transaction.name &&
      data[transaction.name] &&
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer'
    ) {
      data[transaction.name] += 1;
    } else if (
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer'
    ) {
      data[transaction.name] = 1;
    }
  });

  let count = 0;

  for (let key in data) {
    if (data[key] > count) {
      count = data[key];
    }
  }

  for (let key in data) {
    if (data[key] === count) {
      mostCount.push(key);
    }
  }

  return { merchants: mostCount, count };
};

export const spendingByMonth = transactionsArr => {
  let results = [];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let monthlyTotals = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  transactionsArr.forEach(item => {
    let monthNum = item.date ? Number(item.date.slice(5, 7)) : 0;
    let month = months[monthNum - 1];
    monthlyTotals[month] += item.amount;
  });

  for (let key in monthlyTotals) {
    console.log(key);
    if (monthlyTotals.hasOwnProperty(key) && key !== 'undefined') {
      results.push({ name: key, value: monthlyTotals[key] });
    }
  }
  console.log(results);
  return results;
};

export const sortTransactionsByMonth = transactionsArr => {
  let monthlyTransactions = [];
  let total = 0;

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  transactionsArr.forEach(transaction => {
    let month = transaction.date ? Number(transaction.date.slice(5, 7)) : 0;
    if (month === currentMonth) {
      monthlyTransactions.push(transaction);
      total += transaction.amount;
    }
  });

  const monthlyBudget = {
    transactions: monthlyTransactions,
    total,
  };

  return monthlyBudget;
};

export const sortTransactionsByCategory = (category, transactionsArr) => {
  let categoryTransactions = [];
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  let total = 0;
  transactionsArr.forEach(transaction => {
    let month = Number(transaction.date.slice(5, 7));
    if (month === currentMonth && transaction.category[0] === category) {
      categoryTransactions.push(transaction);
      total += transaction.amount;
    }
  });

  const monthlyBudget = {
    transactions: categorizeTransactions,
    totalSpent: total,
  };

  return monthlyBudget;
};

export const getCurrentMonth = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const nowDate = new Date();
  const currentMonth = nowDate.getMonth();
  return months[currentMonth];
};

export const months = [
  ['January', '01'],
  ['February', '02'],
  ['March', '03'],
  ['April', '04'],
  ['May', '05'],
  ['June', '06'],
  ['July', '07'],
  ['August', '08'],
  ['September', '09'],
  ['October', '10'],
  ['November', '11'],
  ['December', '12'],
];

export const COLORS = [
  '#0088FE',
  '#ff9787',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#ff87db',
  '#CEE0DC',
  '#B9CFD4',
  '#AFAAB9',
  '#902D41',
  '#B48291',
  '#331832',
  '#D81E5B',
  '#F0544F',
  '#C6D8D3',
  '#FDF0D5',
];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? 'start' : 'end'}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
