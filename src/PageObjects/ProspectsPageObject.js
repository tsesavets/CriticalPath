const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class ProspectsPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="prospects"]');
	}

	async getTotalProspectsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/prospects', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		return res.data.meta.totalCount;
	}

	async getTtalProspectsInTable() {
		await this.page.waitForSelector('.row-table');

		return await this.page.$eval('.col-md-12 .title', (el) =>
			el.innerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
		);
	}
};
