const monthNames3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthNames = [
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
export function getMonthDays(month) {
  const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();
  const dayLabels = [];
  for (let i = 0; i < daysInMonth; i++) {
    dayLabels.push(`${i + 1} ${monthNames3[month]} `);
  }
  return dayLabels;
}
export function getMonthName(month) {
  return monthNames[month];
}

export function getCumulativeTokens(array) {
  let output = [];

  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
    output.push(sum);
  }
  return output;
}
