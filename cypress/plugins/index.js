/**
 * @type {Cypress.PluginConfig}
 */
const reporter = require('./utils/reporter.js');
module.exports = (on, config) => {
  //Here is the report called to be formated.
  //Report is made after all tests have run
  on('after:run', (event) => {
    reporter.reportSanitizer(event);
  });
  return config;
}
