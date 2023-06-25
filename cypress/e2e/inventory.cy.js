describe('Inventory Page', () => {
    const elements = {
        TITLE: '.app_logo',
        BURGER_BUTTON: '#react-burger-menu-btn',
        BURGER_MENU: '.bm-menu-wrap',
        BURGER_MENU_ALL_ITEMS: '#inventory_sidebar_link',
        BURGER_MENU_ABOUT: '#about_sidebar_link',
        BURGER_MENU_LOGOUT: '#logout_sidebar_link',
        BURGER_MENU_RESET_APP_STATE: '#reset_sidebar_link',
        CART: '#shopping_cart_container',
        CART_BADGE: '.shopping_cart_badge',
        ITEMS_ORDER: '.product_sort_container',
        ACTIVE_ORDER: '.active_option',
        ITEM: '.inventory_item',
        ITEM_NAME: '.inventory_item_name',
        ITEM_IMAGE: 'img.inventory_item_img',
        ADD_TO_CART_BIKE: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        REMOVE_FROM_CART_BIKE: '[data-test="remove-sauce-labs-bike-light"]',
        ADD_TO_CART_ONESIE: '[data-test="add-to-cart-sauce-labs-onesie"]',
        REMOVE_FROM_CART_ONESIE: '[data-test="remove-sauce-labs-onesie"]',
        FOOTER: 'footer'
    }

    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
    })

    it('checks page contents', () => {
        cy.get(elements.TITLE).contains('Swag Labs').should('be.visible')
        cy.get(elements.BURGER_BUTTON).should('be.visible')
        cy.get(elements.CART).should('be.visible')
        cy.get(elements.ITEM).should('have.length', 6)
        cy.get(elements.FOOTER).should('be.visible')
    })

    it('checks the burger menu links', () => {
        cy.get(elements.BURGER_MENU).should('have.attr', 'aria-hidden', 'true')
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU).should('have.attr', 'aria-hidden', 'false')
        cy.get(elements.BURGER_MENU_ALL_ITEMS).click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get(elements.BURGER_MENU_RESET_APP_STATE).click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get(elements.BURGER_MENU_ABOUT).click()
        cy.url().should('eq', 'https://saucelabs.com/')
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.get(elements.BURGER_BUTTON).click()
        cy.get(elements.BURGER_MENU_LOGOUT).click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
    })

    it('checks the cart link', () => {
        cy.get(elements.CART).click()
        cy.url().should('eq','https://www.saucedemo.com/cart.html')
        cy.contains('Your Cart').should('be.visible')
    })

    it('checks the ordering option A to Z', () => {
        cy.get(elements.ACTIVE_ORDER).should('have.text', 'Name (A to Z)')
        cy.checkAZ()
    })

    it('checks the ordering option Z to A', () => {
        cy.get(elements.ITEMS_ORDER).select('Name (Z to A)')
        cy.get(elements.ACTIVE_ORDER).should('have.text', 'Name (Z to A)')
        cy.checkZA()
    })

    it('checks the ordering option Low to High', () => {
        cy.get(elements.ITEMS_ORDER).select('Price (low to high)')
        cy.get(elements.ACTIVE_ORDER).should('have.text', 'Price (low to high)')
        cy.checkLoHi()
    })

    it('checks the ordering option High to Low', () => {
        cy.get(elements.ITEMS_ORDER).select('Price (high to low)')
        cy.get(elements.ACTIVE_ORDER).should('have.text', 'Price (high to low)')
        cy.checkHiLo()
    })

    it('checks clicking an item image', () => {
        cy.get(elements.ITEM_IMAGE).randomClick()
        cy.url().should('contain', 'https://www.saucedemo.com/inventory-item.html?id=')
    })

    it('checks clicking an item name', () => {
        cy.get(elements.ITEM_NAME).randomClick()
        cy.url().should('contain', 'https://www.saucedemo.com/inventory-item.html?id=')
    })

    it('checks adding to and removing from cart', () => {
        cy.get(elements.CART_BADGE).should('not.exist')
        cy.get(elements.ADD_TO_CART_BIKE).click()
        cy.get(elements.CART_BADGE).should('have.text', '1')
        cy.get(elements.ADD_TO_CART_ONESIE).click()
        cy.get(elements.CART_BADGE).should('have.text', '2')
        cy.get(elements.REMOVE_FROM_CART_BIKE).click()
        cy.get(elements.CART_BADGE).should('have.text', '1')
        cy.get(elements.REMOVE_FROM_CART_ONESIE).click()
        cy.get(elements.CART_BADGE).should('not.exist')
    })
})