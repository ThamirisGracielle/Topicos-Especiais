module.exports = {
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/cypress-[hash].xml',
    toConsole: true,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
};
