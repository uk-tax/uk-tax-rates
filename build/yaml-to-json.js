
const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');

const filePath = path.join(__dirname, '..', 'data', '201718');

const yaml = fs.readFileSync(path.join(filePath, 'income-tax-201718.yml'), 'utf8');

const json = jsYaml.load(yaml);

function handleResponse(err) {
  console.log('File written?', err);
}
console.log('Writing', path.join(filePath, 'income-tax-201718.json'));

const json = loadYaml('../data/201718/income-tax-201718');

fs.writeFile(path.join(filePath, 'income-tax-201718.json'), JSON.stringify(json), 'utf8', handleResponse);
