import { test } from '@playwright/test'
import { MyAccountPage } from '../page-objects/MyAccountPage'
import { getLoginToken } from '../api-calls/getLoginToken'
import { admin } from '../data/userDetails.js'

test('My Account using network mocking and cookie injection', async ({ page, context }) => {
    const loginToken = await getLoginToken(admin.username, admin.password)

    await page.route('**/api/user**', async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'PLAYWRIGHT MOCKING ERROR' })
        })
    })

    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await myAccount.authCookieInjection(loginToken)
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})
