describe('Cart Page', () => {
    const elements = {
        TITLE: '.app_logo',
        BURGER_BUTTON: '#react-burger-menu-btn',
        BURGER_MENU: '.bm-menu-wrap',
        BURGER_MENU_ALL_ITEMS: '#inventory_sidebar_link',
        BURGER_MENU_ABOUT: '#about_sidebar_link',
        BURGER_MENU_LOGOUT: '#logout_sidebar_link',
        BURGER_MENU_RESET_APP_STATE: '#reset_sidebar_link',
        CART: '#shopping_cart_container',
        CONTINUE_SHOPPING: '[data-test="continue-shopping"]',
        ADD_TO_CART_BIKE: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        ADD_TO_CART_BACKPACK: '[data-test="add-to-cart-sauce-labs-backpack"]',
        ADD_TO_CART_ONESIE: '[data-test="add-to-cart-sauce-labs-onesie"]',
        ITEM_IN_CART: '.cart_item',
        ITEM_NAME: '.inventory_item_name',
        QUANTITY: '.cart_quantity',
        REMOVE_FROM_CART_BIKE: '[data-test="remove-sauce-labs-bike-light"]',
        CHECKOUT: '[data-test="checkout"]',
        FOOTER: 'footer'
    }

    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.CART).click()
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
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
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
        cy.get(elements.BURGER_MENU_ABOUT).click()
        cy.url().should('eq', 'https://saucelabs.com/')
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.CART).click()
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU_LOGOUT).click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.CART).click()
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU_ALL_ITEMS).click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('checks the cart link', () => {
        cy.get(elements.CART).click()
        cy.url().should('eq','https://www.saucedemo.com/cart.html')
        cy.contains('Your Cart').should('be.visible')
    })

    it('checks the continue shopping link', () => {
        cy.get(elements.CONTINUE_SHOPPING).click()
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
    })

    it('checks removing item from cart', () => {
        cy.get(elements.CONTINUE_SHOPPING).click()
        cy.get(elements.ADD_TO_CART_BIKE).click()
        cy.get(elements.CART).click()
        cy.get(elements.ITEM_IN_CART).should('have.length', 1)
        cy.get(elements.ITEM_NAME).should('contain', 'Sauce Labs Bike Light')
        cy.get(elements.QUANTITY).should('have.text', '1')
        cy.get(elements.REMOVE_FROM_CART_BIKE).click()
        cy.get(elements.ITEM_IN_CART).should('have.length', 0)
    })

    it('checks proceeding to checkout', () => {
        cy.get(elements.CONTINUE_SHOPPING).click()
        cy.get(elements.ADD_TO_CART_BIKE).click()
        cy.get(elements.CART).click()
        cy.get(elements.CHECKOUT).click()
        cy.url().should('eq','https://www.saucedemo.com/checkout-step-one.html')
    })

    it('checks multiple items in cart', () => {
        cy.get(elements.CONTINUE_SHOPPING).click()
        cy.get(elements.ADD_TO_CART_BIKE).click()
        cy.get(elements.ADD_TO_CART_BACKPACK).click()
        cy.get(elements.ADD_TO_CART_ONESIE).click()
        cy.get(elements.CART).click()
        cy.get(elements.ITEM_IN_CART).should('have.length', 3)
        cy.get(elements.CHECKOUT).click()
        cy.url().should('eq','https://www.saucedemo.com/checkout-step-one.html')
    })
})