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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test1');
      cy.get('#password').type('1234');
      cy.get('#login-button').click();
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test1');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(214, 64, 64)')
        .and('have.css', 'background', 'rgb(255, 247, 247) none repeat scroll 0% 0% / auto padding-box border-box')
        .and('have.css', 'border-color', 'rgb(255, 230, 230)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
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

    it('a blog can be liked', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('test');
      cy.get('#author').type('cypress');
      cy.get('#url').type('http://www.test.com');
      cy.get('#create-blog-button').click();
      cy.contains('Blog added');

      cy.get('#show-blog-button').click();
      cy.contains('likes: 0');
      cy.get('#like-blog-button').click();
      cy.contains('likes: 1');
    });

    it('a blog can be deleted', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('test');
      cy.get('#author').type('cypress');
      cy.get('#url').type('http://www.test.com');
      cy.get('#create-blog-button').click();
      cy.contains('Blog added');

      cy.get('#show-blog-button').click();
      cy.get('#remove-blog-button').click();
      cy.get('html').should('not.contain', 'test cypress');
    });

    it('only the creator can see the delete button of a blog', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('test');
      cy.get('#author').type('cypress');
      cy.get('#url').type('http://www.test.com');
      cy.get('#create-blog-button').click();
      cy.contains('Blog added');

      const user = {
        username: 'test2',
        password: '1234',
        name: 'testName2',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);

      cy.get('#logout-button').click();
      cy.get('#username').type('test2');
      cy.get('#password').type('1234');
      cy.get('#login-button').click();

      cy.get('#show-blog-button').click();
      cy.get('#remove-blog-button').should('not.exist');
    });

    it('blogs are ordered by likes', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('test');
      cy.get('#author').type('cypress');
      cy.get('#url').type('http://www.test.com');
      cy.get('#create-blog-button').click();
      cy.contains('Blog added');

      cy.contains('new blog').click();

      cy.get('#title').type('2');
      cy.get('#author').type('2');
      cy.get('#create-blog-button').click();
      cy.contains('Blog added');

      cy.get('.blog').eq(0).should('contain', 'test');
      cy.get('.blog:eq(0) #show-blog-button').click();
      cy.get('.blog').eq(1).should('contain', 'test2');
      cy.get('.blog:eq(1) #show-blog-button').click();
      cy.get('.blog:eq(1) #like-blog-button').click();
      cy.get('.blog').eq(0).should('contain', 'test2');
    });
  });
});
