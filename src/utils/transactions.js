// function takes in an array of transactions and outputs
// a dataset that contains category names and transaction amounts
// { name: [cat1, cat2, etc], value: [val1, val2, etc]}
export const categorizeTransactions = transactionsArr => {
  let data = {};
  let finalData = [];
  transactionsArr.forEach(transaction => {
    if (transaction.category && data[transaction.category[0]]) {
      data[transaction.category[0]] += Math.round(transaction.amount);
    } else {
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

export const COLORS = [
  '#0088FE',
  '#ff9787',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#ff87db',
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
