
import kebabCase from 'lodash/kebabCase';

const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');

function getFilename(section, year) {
  const $section = kebabCase(section);
  return (`${$section}-${year}.yml`);
}

function getRates(section, year) {
  function getOneRates(oneSection, oneYear) {
    const filename = getFilename(oneSection, oneYear);
    const yamlPath = path.join(__dirname, '..', 'data', oneYear.toString(), filename);
    const yaml = fs.readFileSync(yamlPath, 'utf8');

    return jsYaml.load(yaml);
  }
  if (typeof section === 'string') {
    return getOneRates(section, year);
  }
  const rates = {};
  section.forEach((oneSection) => {
    rates[oneSection] = getOneRates(oneSection, year);
  });
  return rates;
}

export {
  getFilename,
  getRates,
};
