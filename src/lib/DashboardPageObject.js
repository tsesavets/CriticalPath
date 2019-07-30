const PageObject = require('puppeteer-page-object');

module.exports = class DashboardPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async takeSubNames() {
		await this.page.click('.main-navbar__brand');

		const tabsNames = await this.page.$eval('.sidebar--left', (el) => el.innerText);

		await this.page.screenshot({ path: './screenshots/screenshot-clients.png' });

		return tabsNames;
	}
};
