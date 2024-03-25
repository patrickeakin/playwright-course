import { expect } from '@playwright/test'

export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        const cardsBeforeRemoval = await this.basketCards.count()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceTexts.map((el) => parseInt(el.replace('$', '')))
        const lowestPrice = Math.min(...justNumbers)
        const lowestPriceIdx = justNumbers.indexOf(lowestPrice)
        const itemRemoveButton = this.basketItemRemoveButton.nth(lowestPriceIdx)
        await itemRemoveButton.click()
        await expect(this.basketCards).toHaveCount(cardsBeforeRemoval - 1)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutBtn.click()
        await this.page.waitForURL(/\/login/)
    }
}