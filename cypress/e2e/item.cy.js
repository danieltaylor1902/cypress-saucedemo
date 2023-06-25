describe('Item Page', () => {
    const elements = {
        TITLE: '.app_logo',
        BURGER_BUTTON: '#react-burger-menu-btn',
        BURGER_MENU: '.bm-menu-wrap',
        BURGER_MENU_ALL_ITEMS: '#inventory_sidebar_link',
        BURGER_MENU_ABOUT: '#about_sidebar_link',
        BURGER_MENU_LOGOUT: '#logout_sidebar_link',
        BURGER_MENU_RESET_APP_STATE: '#reset_sidebar_link',
        BACK_TO_PRODUCTS: '[data-test="back-to-products"]',
        CART: '#shopping_cart_container',
        CART_BADGE: '.shopping_cart_badge',
        ITEM_NAME_INV: '.inventory_item_name',
        ITEM_NAME: '.inventory_details_name',
        ITEM_IMAGE: '.inventory_details_img',
        ITEM_DESCRIPTION: '.inventory_details_desc',
        ITEM_PRICE: '.inventory_details_price',
        ADD_TO_CART: '[data-test*="add-to-cart-sauce-labs-"]',
        REMOVE_FROM_CART: '[data-test*="remove-sauce-labs-"]',
        FOOTER: 'footer'
    }

    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.ITEM_NAME_INV).randomClick()
        cy.url().should('contain', 'https://www.saucedemo.com/inventory-item.html?id=')
    })

    it('checks page contents', () => {
        cy.get(elements.TITLE).contains('Swag Labs').should('be.visible')
        cy.get(elements.BURGER_BUTTON).should('be.visible')
        cy.get(elements.CART).should('be.visible')
        cy.get(elements.ITEM_NAME).should('be.visible')
        cy.get(elements.ITEM_DESCRIPTION).should('be.visible')
        cy.get(elements.ITEM_PRICE).should('be.visible')
        cy.get(elements.FOOTER).should('be.visible')
    })

    it('checks the burger menu links', () => {
        cy.get(elements.BURGER_MENU).should('have.attr', 'aria-hidden', 'true')
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU).should('have.attr', 'aria-hidden', 'false')
        cy.get(elements.BURGER_MENU_RESET_APP_STATE).click()
        cy.url().should('contain', 'https://www.saucedemo.com/inventory-item.html?id=')
        cy.get(elements.BURGER_MENU_ABOUT).click()
        cy.url().should('eq', 'https://saucelabs.com/')
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.ITEM_NAME_INV).randomClick()
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU_LOGOUT).click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.ITEM_NAME_INV).randomClick()
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU_ALL_ITEMS).click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('checks the cart link', () => {
        cy.get(elements.CART).click()
        cy.url().should('eq','https://www.saucedemo.com/cart.html')
        cy.contains('Your Cart').should('be.visible')
    })

    it('checks adding to and removing from cart', () => {
        cy.get(elements.CART_BADGE).should('not.exist')
        cy.get(elements.ADD_TO_CART).click()
        cy.get(elements.CART_BADGE).should('have.text', '1')
        cy.get(elements.REMOVE_FROM_CART).click()
        cy.get(elements.CART_BADGE).should('not.exist')
    })

    it('checks back to products', () => {
        cy.get(elements.BACK_TO_PRODUCTS).click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })
})