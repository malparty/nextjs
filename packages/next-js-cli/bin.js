#!/usr/bin/env node

const decompress = require('decompress');
const decompressTargz = require('decompress-targz');
const fs = require('fs');
const { exec } = require('child_process');
const yargs = require('yargs');

const template_package = '@malparty/nextjs-template';
const brandName = yargs.argv['brand'];

// Arguments validation
if (yargs.argv['help'] || yargs.argv['h']) {
  return console.log('Args: "--brand", set the name of the brand to scaffold the project for.');
}
if (brandName === undefined || brandName == '') {
  return console.log('The "--brand" argument is required.');
}

// Download the template package using the NPM cli (to allow authenticated requests)
exec(`npm pack ${template_package}`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  decompressTemplate(stdout);
});

// Decompress the tgz template
const decompressTemplate = (packageName) => {
  decompress(packageName, brandName, {
    plugins: [decompressTargz()],
  }).then(() => {
    console.log('Files decompressed');

    console.log(`Project scaffolded. Now "cd ./${brandName}" and run "npm install"`);
  });
};
