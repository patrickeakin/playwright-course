export class LoginPage {
    constructor(page) {
        this.page = page

        this.registerBtn = page.getByRole('button', { name: 'Register' })
    }

    goToSignup = async () => {
        await this.registerBtn.click()
        await this.page.waitForURL(/\/signup/)
    }
}