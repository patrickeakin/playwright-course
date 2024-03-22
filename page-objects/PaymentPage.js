import { expect } from '@playwright/test'

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.getByPlaceholder('Discount code')
        this.submitDiscountBtn = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.creditCardExpDateInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payBtn = page.locator('[data-qa="pay-button"]')
    }

    applyDiscountCode = async () => {
        const code = await this.discountCode.innerText()
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)
        await expect(this.discountActiveMessage).toBeHidden()
        await expect(this.discountedValue).toBeHidden()

        await this.submitDiscountBtn.click()
        await this.discountActiveMessage.waitFor()
        await this.discountedValue.waitFor()
        const totalBeforeDiscount = parseInt(await this.totalValue.innerText())
        const totalAfterDiscount = parseInt(await this.discountedValue.innerText())
        expect(totalAfterDiscount).toBeLessThan(totalBeforeDiscount)
    }

    fillPaymentDetails = async (creditCard) => {
        await this.creditCardOwnerInput.fill(creditCard.name)
        await this.creditCardNumberInput.fill(creditCard.number)
        await this.creditCardExpDateInput.fill(creditCard.expirationDate)
        await this.creditCardCVCInput.fill(creditCard.cvc)
    }

    submitPayment = async () => {
        await this.payBtn.click()
        await this.page.waitForURL('/thank-you')
    }
}