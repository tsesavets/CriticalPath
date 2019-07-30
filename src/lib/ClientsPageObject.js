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

	async totalClientsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/clients', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const contactList = res.data.meta.totalCount;
		return contactList;
	}

	async totalClientsCheck() {
		await this.page.waitForSelector('.row-table');

		const numClients = await this.page.$eval('.col-md-12 .title', (el) =>
			el.innerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
		);

		await this.page.screenshot({ path: './screenshots/screenshot-clients.png' });

		return numClients;
	}
};
