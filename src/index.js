
const incomeTax2018 = require('./data/2018/income-tax-2018.json');

console.log(incomeTax2018);

export function getRates(name, year) {
  return incomeTax2018;
};
