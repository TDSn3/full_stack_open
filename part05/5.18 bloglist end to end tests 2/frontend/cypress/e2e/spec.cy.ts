/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Blog list app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'test1',
      password: '1234',
      name: 'testName',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
  });

  it('login page', function () {
    cy.get('#username').type('test1');
    cy.get('#password').type('1234');
    cy.get('#login-button').click();
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('test1');
      cy.get('#password').type('1234');
      cy.get('#login-button').click();
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('test');
      cy.get('#author').type('cypress');
      cy.get('#url').type('http://www.test.com');
      cy.get('#create-blog-button').click();
      cy.contains('Blog added');
    });
  });
});
