const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class ClientsPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="users"]');
	}

	async getTotalClientsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/clients', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		return res.data.meta.totalCount;
	}

	async getTotalClientsInTable() {
		await this.page.waitForSelector('.row-table');

		return await this.page.$eval('.col-md-12 .title', (el) =>
			el.innerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
		);
	}
};
