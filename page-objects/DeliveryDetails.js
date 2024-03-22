import { expect } from '@playwright/test'

export class DeliveryDetails {
    constructor (page) {
        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressBtn = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedCity = page.locator('[data-qa="saved-address-city"]')
        this.savedCountry = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentBtn = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (userAddress) => {
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.fill(userAddress.street)
        await this.postCodeInput.fill(userAddress.postCode)
        await this.cityInput.fill(userAddress.city)
        this.countryDropdown.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()

        await this.saveAddressBtn.click() 
        await this.savedAddressContainer.waitFor()
        expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        expect(await this.savedFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.savedStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.savedPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())
        expect(await this.savedCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.savedCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }
    
    continueToPayment = async () => {
        await this.continueToPaymentBtn.click()
        await this.page.waitForURL('/payment')
    }
}