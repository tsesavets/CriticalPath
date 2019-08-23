const PageObject = require('puppeteer-page-object');

module.exports = class SignInPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async enterEmail(login) {
		await this.page.waitForSelector('input[type="email"]');

		await this.page.type('input[type="email"]', login);
	}

	async enterPassword(password) {
		await this.page.type('input[type="password"]', password);
	}

	async login() {
		await this.page.click('input[type="submit"]');
	}
};
