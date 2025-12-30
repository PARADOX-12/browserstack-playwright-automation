import { test, expect } from "@playwright/test";
import { PASSWORD, USERS } from "../../utils/constants";
import { loginPage } from "../../pages/login.page";

test.describe("Validation Login Test", () => {

    test.beforeEach(async ({page}) => {
        const login = new loginPage(page);
        await login.gotoLogin();
    });

    test("Verify login without entering password", async({page}) => {
        const Login = new loginPage(page);

        await Login.usernameDropdown.click();
        await page.getByText(USERS.DEMO, {exact: true}).click();
        await Login.loginButton.click();
        await expect(page).toHaveURL(/signin/);
        await expect(page.getByText("Password is required", {exact: true})).toBeVisible();
    })

    test("Verify login without entering username", async({page}) => {
        const Login = new loginPage(page);

        await Login.passwordDropdown.click();
        await page.getByText(PASSWORD, {exact: true}).click();
        await Login.loginButton.click();
        await expect(page).toHaveURL(/signin/);
        await expect(page.getByText("Username is required")).toBeVisible();
    })

    test("Verify login without entering username and password", async({page}) => {
        const Login = new loginPage(page);

        await Login.loginButton.click();
        await expect(page).toHaveURL(/signin/);
        await expect(page.getByText("Username and password are required", {exact: true})).toBeVisible();
    })

    test.afterEach(async({page}, testInfo) => {
    if(testInfo.status !== testInfo.expectedStatus){
        await page.screenshot({path: `screenshots/login/${testInfo.title}.png`});
    }
});
})

