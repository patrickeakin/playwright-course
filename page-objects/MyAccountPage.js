import { expect } from '@playwright/test'

export class MyAccountPage {
    constructor(page) {
        this.page = page

        this.pageHeading = page.getByRole('heading', { name: 'My Account' })
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        //Make a request to get login token
        await this.page.goto('/my-account')
    }
    
    authCookieInjection = async (loginToken) => {
        await this.page.evaluate(([loginTokenInBrowser]) => {
            document.cookie = 'token=' + loginTokenInBrowser
        }, [loginToken])
    }
    
    waitForPageHeading = async () => {
        await this.pageHeading.waitFor()
    }

    waitForErrorMessage = async ()=> {
        await expect(this.errorMessage).toBeVisible()
    }
}