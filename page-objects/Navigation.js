import { isDesktopViewport } from '../utils/isDesktopViewport'

export class Navigation {
    constructor(page) {
        this.page = page

        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', {name: 'Checkout'})
        this.mobileBurgerBtn = page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        // if mobile viewport first open burger
        if (!isDesktopViewport(this.page)) {
            await this.mobileBurgerBtn.click()
        }
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }
}