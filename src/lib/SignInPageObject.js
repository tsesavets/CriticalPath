const PageObject = require('puppeteer-page-object');

module.exports = class SignInPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async EnterEmail(login) {
		await this.page.waitForSelector('input[type="email"]');

		await this.page.type('input[type="email"]', login);
	}

	async EnterPassword(password) {
		await this.page.type('input[type="password"]', password);
	}

	async Login() {
		await this.page.click('input[type="submit"]');

		await this.page.waitForSelector('.main-navbar__user__name');

		const agentName = await this.page.$eval('.main-navbar__user__name', (el) => el.innerText);

		await this.page.screenshot({ path: './screenshots/SignIn.png' });

		return agentName;
	}
};
