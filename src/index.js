
const incomeTax2018 = require('./data/2017-18/income-tax-2017-18.json');

/* eslint import/prefer-default-export: 0 */
// export function getRates(name, year) {
export function getRates() {
  return incomeTax2018;
}
