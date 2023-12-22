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
const npmPackCmd = `npm pack ${template_package}`;
console.log('RUN: ', npmPackCmd);
exec(npmPackCmd, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }

  console.log(stderr);

  // Unexpected error:
  if (!stdout.includes('malparty-nextjs-template')) {
    return;
  }

  filePath = stdout.replace(/(\r\n|\n|\r)/gm, "");
  decompressTemplate(filePath);
});

// Decompress the tgz template
const decompressTemplate = (packageName) => {
  decompress(packageName, brandName, {
    plugins: [decompressTargz()],
    map: file => {
      file.path = file.path.replace('package/template/', '');
      return file;
    }
  }).then(() => {
    console.log('Files decompressed');

    console.log(`Project scaffolded. Now "cd ./${brandName}" and run "npm install"`);
  });
};
