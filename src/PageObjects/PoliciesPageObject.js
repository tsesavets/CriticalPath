const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class PoliciesPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="insurances"]');
	}

	async getTotalPoliciesNumberInTable() {
		await this.page.waitForSelector('.row-table');

		return await this.page.$eval('.col-md-12 .title', (el) => el.innerText);

		await this.page.screenshot({
			path: './screenshots/screenshot-policies.png'
		});
	}
};
