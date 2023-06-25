describe('Login attempts', () => {
    const elements = {
        TITLE: '.login_logo',
        USERNAME: '[data-test="username"]',
        PASSWORD: '[data-test="password"]',
        LOGIN: '[data-test="login-button"]',
        ERROR: '[data-test="error"]',
        CLOSE_ERROR: '.error-button'
    }

    beforeEach(() => {
        cy.visit('/')
    })

    it('checks page contents', () => {
        cy.get(elements.TITLE).contains('Swag Labs').should('be.visible')
        cy.get(elements.USERNAME).should('be.visible')
        cy.get(elements.PASSWORD).should('be.visible')
        cy.get(elements.LOGIN).should('be.visible')
    })

    it('attempts login as standard_user', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
    })

    it('attempts login as locked_out_user', () => {
        cy.login('locked_out_user', 'secret_sauce')
        cy.url().should('eq','https://www.saucedemo.com/')
        cy.get(elements.ERROR).contains('Epic sadface: Sorry, this user has been locked out.').should('be.visible')
        cy.get(elements.CLOSE_ERROR).click()
        cy.get(elements.ERROR).should('not.exist')
    })

    it('attempts login as problem_user', () => {
        cy.login('problem_user', 'secret_sauce')
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
    })

    it('attempts login as performance_glitch_user', () => {
        cy.login('performance_glitch_user', 'secret_sauce')
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
    })

    it('attempts login as test_user', () => {
        cy.login('test_user', 'secret_sauce')
        cy.url().should('eq','https://www.saucedemo.com/')
        cy.get(elements.ERROR).contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
        cy.get(elements.CLOSE_ERROR).click()
        cy.get(elements.ERROR).should('not.exist')
    })

    it('attempts login with blank username', () => {
        cy.get(elements.PASSWORD).type('secret_sauce')
        cy.get(elements.LOGIN).click()
        cy.url().should('eq','https://www.saucedemo.com/')
        cy.get(elements.ERROR).contains('Epic sadface: Username is required').should('be.visible')
        cy.get(elements.CLOSE_ERROR).click()
        cy.get(elements.ERROR).should('not.exist')
    })

    it('attempts login with blank password', () => {
        cy.get(elements.USERNAME).type('standard_user')
        cy.get(elements.LOGIN).click()
        cy.url().should('eq','https://www.saucedemo.com/')
        cy.get(elements.ERROR).contains('Epic sadface: Password is required').should('be.visible')
        cy.get(elements.CLOSE_ERROR).click()
        cy.get(elements.ERROR).should('not.exist')
    })

    it('attempts login with blank username and password', () => {
        cy.get(elements.LOGIN).click()
        cy.url().should('eq','https://www.saucedemo.com/')
        cy.get(elements.ERROR).contains('Epic sadface: Username is required').should('be.visible')
        cy.get(elements.CLOSE_ERROR).click()
        cy.get(elements.ERROR).should('not.exist')
    })
})