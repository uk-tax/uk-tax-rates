
const incomeTax2018 = require('../data/201718/income-tax-201718.json');

/* eslint import/prefer-default-export: 0 */
// export function getRates(name, year) {
export function getRates() {
  return incomeTax2018;
}
