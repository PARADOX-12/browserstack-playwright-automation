
class loginPage {
    constructor(page) {
        this.page = page;
        this.usernameDropdown = page.getByText('Select Username');
        this.passwordDropdown = page.getByText('Select Password');
        this.loginButton = page.getByRole('button', {name: 'Log In'});
    }
    async gotoLogin() {
        await this.page.goto('https://bstackdemo.com/signin')
    }

    async loginToApplication(username, password) {

        await this.usernameDropdown.click();
        await this.page.getByText(username, {exact: true}).click();

        await this.passwordDropdown.click();
        await this.page.getByText(password, {exact: true}).click();
        
        await this.loginButton.click();
    }
}

class logoutPage {
    constructor(page) {
        this.page = page;
        this.logOutButton = page.getByRole('link', { name: 'Logout' });
    }

    async logoutFromApplication() {
        await this.logOutButton.click();
    }
}

export {loginPage, logoutPage};