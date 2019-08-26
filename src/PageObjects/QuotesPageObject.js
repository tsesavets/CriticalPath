const PageObject = require('puppeteer-page-object');

module.exports = class QuotesPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="/quotes"]');
	}

	async getTotalQuotesInTable() {
		await this.page.waitForSelector('.row-table');

		return await this.page.$eval('.col-md-12 .title', (el) => el.innerText);
	}
};
