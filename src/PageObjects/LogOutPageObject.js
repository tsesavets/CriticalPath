const PageObject = require('puppeteer-page-object');

module.exports = class LogoutPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async ClickAgentName() {
		await this.page.waitForSelector('.main-navbar__user__name');
		await this.page.click('.main-navbar__user__name');
	}

	async ClickLogout() {
		await this.page.waitForSelector('a[href^="/experts/sign_out"]');

		await this.page.click('a[href^="/experts/sign_out"]');
	}
};
