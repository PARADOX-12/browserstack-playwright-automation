import { test, expect } from "@playwright/test";
import { PASSWORD, USERS } from "../../utils/constants";
import { loginPage } from "../../pages/login.page";


test.describe("Negative Login Test", () => {

  test("Verify login locked_user", async ({ page }) => {
    const login = new loginPage(page);
    await login.gotoLogin();

    await login.loginToApplication(USERS.LOCKED, PASSWORD);
    await expect(page).toHaveURL(/signin/);
    await expect(page.getByText("Your account has been locked.")).toBeVisible();
  });


  test.afterEach(async ({page}, testInfo) => {
    if(testInfo.status !== testInfo.expectedStatus){
        await page.screenshot({path: `screenshots/login/${testInfo.title}.png`});
    }
})
});

