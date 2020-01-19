// @TODO
Cypress.Commands.add('clearData', () => {
  const env = Cypress.env('TEST_ENV');
  if (env === 'dev') {
    // remove in-memory data (we could use ts-node-dev to simply restart the server?)
    // cy.exec('npm run server:restart');
  }
});
