import { test } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'

import { Checkout } from '../page-objects/Checkout.js'
import { DeliveryDetails } from '../page-objects/DeliveryDetails.js'
import { LoginPage } from '../page-objects/LoginPage.js'
import { Navigation } from '../page-objects/Navigation.js'
import { ProductsPage } from '../page-objects/ProductsPage.js'
import { RegistrationPage } from '../page-objects/RegistrationPage.js'
import { PaymentPage } from '../page-objects/PaymentPage.js'
import { user } from '../data/user.js'
import { creditCard } from '../data/creditCard.js'

test('New user full end-to-end journey', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()
    
    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.goToSignup()
    
    const registrationPage = new RegistrationPage(page)
    const email = uuidv4() + "email.com"
    const password = uuidv4()
    await registrationPage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(user)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.applyDiscountCode()
    await paymentPage.fillPaymentDetails(creditCard)
    await paymentPage.submitPayment()
})