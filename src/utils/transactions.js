// function takes in an array of transactions and outputs
// a dataset that contains category names and transaction amounts
// { name: [cat1, cat2, etc], value: [val1, val2, etc]}
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
  transactionsArr.forEach(transaction => {
    const partialMerchant = transaction.name.slice(0, 4);
    if (
      transaction.name &&
      data[transaction.name] &&
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer' &&
      transaction.name.includes(partialMerchant)
    ) {
      data[transaction.name] += Math.round(transaction.amount);
    } else if (
      transaction.category[0] !== 'Payment' &&
      transaction.category[0] !== 'Transfer'
    ) {
      data[transaction.name] = Math.round(transaction.amount);
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

  let maxMerchant = [];
  let maxAmount = 0;

  for (let i = 0; i < uniqueMerchantArr.length; i++) {

    if (uniqueMerchantArr[i].value > maxAmount) {
      maxAmount = uniqueMerchantArr[i].value;
    }
  }

  maxMerchant = uniqueMerchantArr.map(merchant => {
    if (merchant.value === maxAmount) {
      return merchant.name;
    }
  });
  return { maxMerchant, maxAmount };
}

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
    let monthNum = Number(item.date.slice(5, 7));
    let month = months[monthNum - 1];
    monthlyTotals[month] += item.amount;
  });

  for (let key in monthlyTotals) {
    if (monthlyTotals.hasOwnProperty(key)) {
      results.push({ name: key, value: monthlyTotals[key] });
    }
  }

  return results;
};

export const sortTransactionsByMonth = transactionsArr => {
  let monthlyTransactions = [];
  let total = 0;

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  transactionsArr.forEach(transaction => {
    let month = Number(transaction.date.slice(5, 7));
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
