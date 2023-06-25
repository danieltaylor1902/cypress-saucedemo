describe('Checkout Pages', () => {
    const elements = {
        TITLE: '.app_logo',
        BURGER_BUTTON: '#react-burger-menu-btn',
        BURGER_MENU: '.bm-menu-wrap',
        BURGER_MENU_ALL_ITEMS: '#inventory_sidebar_link',
        BURGER_MENU_ABOUT: '#about_sidebar_link',
        BURGER_MENU_LOGOUT: '#logout_sidebar_link',
        BURGER_MENU_RESET_APP_STATE: '#reset_sidebar_link',
        CART: '#shopping_cart_container',
        ADD_TO_CART_BIKE: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        FIRST_NAME: '[data-test="firstName"]',
        LAST_NAME: '[data-test="lastName"]',
        POSTAL_CODE: '[data-test="postalCode"]',
        ITEM_IN_CART: '.cart_item',
        ITEM_NAME: '.inventory_item_name',
        QUANTITY: '.cart_quantity',
        CANCEL: '[data-test="cancel"]',
        CONTINUE: '[data-test="continue"]',
        FINISH: '[data-test="finish"]',
        ERROR: '[data-test="error"]',
        CHECKOUT: '[data-test="checkout"]',
        THANK_YOU: '.complete-header',
        BACK_HOME: '[data-test="back-to-products"]',
        FOOTER: 'footer'
    }

    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.ADD_TO_CART_BIKE).click()
        cy.get(elements.CART).click()
        cy.get(elements.CHECKOUT).click()
        cy.url().should('eq','https://www.saucedemo.com/checkout-step-one.html')
    })

    it('checks page contents', () => {
        cy.get(elements.TITLE).contains('Swag Labs').should('be.visible')
        cy.get(elements.BURGER_BUTTON).should('be.visible')
        cy.get(elements.CART).should('be.visible')
        cy.get(elements.FOOTER).should('be.visible')
    })

    it('checks the burger menu links', () => {
        cy.get(elements.BURGER_MENU).should('have.attr', 'aria-hidden', 'true')
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU).should('have.attr', 'aria-hidden', 'false')
        cy.get(elements.BURGER_MENU_RESET_APP_STATE).click()
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')
        cy.get(elements.BURGER_MENU_ABOUT).click()
        cy.url().should('eq', 'https://saucelabs.com/')
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.ADD_TO_CART_BIKE)
        cy.get(elements.CART).click()
        cy.get(elements.CHECKOUT).click()
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU_LOGOUT).click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.ADD_TO_CART_BIKE)
        cy.get(elements.CART).click()
        cy.get(elements.CHECKOUT).click()
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU_ALL_ITEMS).click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('checks the cart link', () => {
        cy.get(elements.CART).click()
        cy.url().should('eq','https://www.saucedemo.com/cart.html')
        cy.contains('Your Cart').should('be.visible')
    })

    it('checks the cancel link', () => {
        cy.get(elements.CANCEL).click()
        cy.url().should('eq','https://www.saucedemo.com/cart.html')
    })

    it('checks attempting continue with all fields blank', () => {
        cy.get(elements.ERROR).should('not.exist')
        cy.get(elements.CONTINUE).click()
        cy.get(elements.ERROR).should('exist')
        cy.get(elements.ERROR).contains('Error: First Name is required')
    })

    it('checks attempting continue with only first name', () => {
        cy.get(elements.ERROR).should('not.exist')
        cy.get(elements.FIRST_NAME).type('Test')
        cy.get(elements.CONTINUE).click()
        cy.get(elements.ERROR).should('exist')
        cy.get(elements.ERROR).contains('Error: Last Name is required')
    })

    it('checks attempting continue with only first name and last name', () => {
        cy.get(elements.ERROR).should('not.exist')
        cy.get(elements.FIRST_NAME).type('Test')
        cy.get(elements.LAST_NAME).type('Test')
        cy.get(elements.CONTINUE).click()
        cy.get(elements.ERROR).should('exist')
        cy.get(elements.ERROR).contains('Error: Postal Code is required')
    })

    it('checks attempting continue with all fields completed', () => {
        cy.get(elements.ERROR).should('not.exist')
        cy.get(elements.FIRST_NAME).type('Test')
        cy.get(elements.LAST_NAME).type('Test')
        cy.get(elements.POSTAL_CODE).type('CV37 7JD')
        cy.get(elements.CONTINUE).click()
        cy.url().should('eq','https://www.saucedemo.com/checkout-step-two.html')
    })

    it('checks contents on step two', () => {
        cy.get(elements.FIRST_NAME).type('Test')
        cy.get(elements.LAST_NAME).type('Test')
        cy.get(elements.POSTAL_CODE).type('CV37 7JD')
        cy.get(elements.CONTINUE).click()
        cy.url().should('eq','https://www.saucedemo.com/checkout-step-two.html')
        cy.get(elements.ITEM_IN_CART).should('have.length', 1)
        cy.get(elements.ITEM_NAME).should('contain', 'Sauce Labs Bike Light')
        cy.get(elements.QUANTITY).should('have.text', '1')
    })

    it('checks finish link', () => {
        cy.get(elements.FIRST_NAME).type('Test')
        cy.get(elements.LAST_NAME).type('Test')
        cy.get(elements.POSTAL_CODE).type('CV37 7JD')
        cy.get(elements.CONTINUE).click()
        cy.url().should('eq','https://www.saucedemo.com/checkout-step-two.html')
        cy.get(elements.FINISH).click()
        cy.url().should('eq','https://www.saucedemo.com/checkout-complete.html')
        cy.get(elements.THANK_YOU).contains('Thank you for your order!').should('be.visible')
        cy.get(elements.BACK_HOME).click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })
})