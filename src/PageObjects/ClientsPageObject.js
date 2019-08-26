const PageObject = require('puppeteer-page-object');

module.exports = class ClientsPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="/users"]');
	}

	async getTotalClientsInTable() {
		await this.page.waitForSelector('.row-table');

		return await this.page.$eval('.col-md-12 .title', (el) =>
			el.innerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
		);
	}
};
