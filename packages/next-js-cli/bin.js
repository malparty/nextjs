#!/usr/bin/env node
var fs = require('fs');

const yargs = require('yargs');
const brandName = yargs.argv['brand']

if (yargs.argv['help'] || yargs.argv['h']) {
  return console.log('Args: "--brand", set the name of the brand to scaffold the project for.');
}
if (brandName === undefined || brandName == '') {
  return console.log('The "--brand" argument is required.');
}

// Copy the template
fs.cpSync('../next-js-template/template', `./${brandName}`, { recursive: true });

// Rename the project name in the package.json
// WIP

console.log(`Project scaffolded. Now "cd ./${brandName}" and run "npm install"`);
