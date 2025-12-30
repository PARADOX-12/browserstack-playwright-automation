import { PASSWORD, USERS } from "../../utils/constants";
import { test, expect } from "@playwright/test";
import { loginPage } from "../../pages/login.page";

test.describe("Login Tests", () => {
    test.beforeEach(async ({page}) => {
        const login = new loginPage(page);
        await login.gotoLogin();
    });


  test("Verify login page loads successfully", async ({ page }) => {
    // Verify that the login page elements are visible
    await expect(page.getByText("Select Username")).toBeVisible();
    await expect(page.getByText("Select Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
  });

  test("Verify login using demouser account", async ({ page }) => {
    const login = new loginPage(page);

    await login.loginToApplication(USERS.DEMO, PASSWORD);
    await expect(page).toHaveURL(/signin/);
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
  });

  test("Verify login using image_not_loading_user", async ({ page }) => {
    const login = new loginPage(page);

    await login.loginToApplication(USERS.IMAGE_ISSUE, PASSWORD);
    await expect(page).toHaveURL(/signin/);
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
  });

  test("Verify login using existing_orders_user", async ({ page }) => {
    const login = new loginPage(page);

    await login.loginToApplication(USERS.ORDERS, PASSWORD);
    await expect(page).toHaveURL(/signin/);
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();

    await page.getByRole("link", { name: "Orders" }).click();
    await expect(page.getByText("Order placed").first()).toBeVisible();
  });

  test("Verify login using fav_user", async ({ page }) => {
    const login = new loginPage(page);

    await login.loginToApplication(USERS.FAVORITE, PASSWORD);
    await expect(page).toHaveURL(/signin/);
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();

    await expect(page.getByRole('button', {name: 'delete'}).first()).toBeVisible();
  });

  test.afterEach(async ({page}, testInfo) => {
    if(testInfo.status !== testInfo.expectedStatus){
        await page.screenshot({path: `screenshots/login/${testInfo.title}.png`});
    }
})

});

