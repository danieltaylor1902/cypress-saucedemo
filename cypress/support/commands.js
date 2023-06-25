// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
})

Cypress.Commands.add('checkAZ', () => {
    cy.get('.inventory_item_name').then(items => {
        const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
        const sortedItems = unsortedItems.slice().sort();
        expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
    })
})

Cypress.Commands.add('checkZA', () => {
    cy.get('.inventory_item_name').then(items => {
        const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
        const sortedItems = unsortedItems.slice().sort().reverse();
        expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
    })
})

Cypress.Commands.add('checkLoHi', () => {
    cy.get('.inventory_item_price').then(items => {
        const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
        const sortedItems = unsortedItems.slice().sort(function(a, b){return a-b});
        expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
    })
})

Cypress.Commands.add('checkHiLo', () => {
    cy.get('.inventory_item_price').then(items => {
        const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
        const sortedItems = unsortedItems.slice().sort(function(a, b){return b-a});
        expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
    })
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
Cypress.Commands.add('randomClick', { prevSubject: true }, (selector) => {
    let num = Math.floor(Math.random() * selector.length)
    cy.get(selector[num]).click()
})
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })