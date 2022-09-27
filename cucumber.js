// cucumber.js
let common = [
    'Tests/Features/**/*.feature',                // Specify our feature files
    '--require-module ts-node/register',    // Load TypeScript module
    '--require Tests/Step-definitions/**/*.ts',   // Load step definitions
    '--format progress-bar',                // Load custom formatter
    '--format json:./Reports/cucumber_report.json'
  ].join(' ');
  
  module.exports = {
    test_runner: common
  };