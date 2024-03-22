import { expect } from '@playwright/test'
import { Navigation } from './Navigation'
import { isDesktopViewport } from '../utils/isDesktopViewport'

export class ProductsPage {
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto('/')
    }

    addProductToBasket = async (index) => {
        const addButton = this.addButtons.nth(index)
        await expect(addButton).toHaveText('Add to Basket')
        const navigation = new Navigation(this.page)
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount() 
        }
        await addButton.click()
        await expect(addButton).toHaveText('Remove from Basket')
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }

    sortByCheapest = async () => {
        const productTitlesBeforeSort = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption('price-asc')
        const productTitlesAfterSort = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSort).not.toEqual(productTitlesBeforeSort)
    }
}