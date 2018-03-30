
const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');

function yamlLoader(filePath) {
  // Build the filename from the dirname and the provided relative path.
  const yamlPath = path.join(__dirname, path.join.apply(null, filePath.split('/')));
  const yaml = fs.readFileSync(`${yamlPath}.yml`, 'utf8');

  return jsYaml.load(yaml);
}

function fileWriter(filePath) {
  // Build the filename from the dirname and the provided relative path.
  const filePath = path.join(__dirname, path.join.apply(null, filePath.split('/')));
  const yaml = fs.readFileSync(`${yamlPath}.yml`, 'utf8');
}

export default yamlLoader;
