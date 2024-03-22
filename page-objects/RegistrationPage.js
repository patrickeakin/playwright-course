import { v4 as uuidv4 } from 'uuid'

export class RegistrationPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerBtn = page.getByRole('button', { name: 'register' })
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.registerBtn.click()
    }
}