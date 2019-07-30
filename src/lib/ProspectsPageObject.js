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

	async totalProspectsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/prospects', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const prospectList = res.data.meta.totalCount;
		return prospectList;
	}

	async totalProspectsCheck() {
		await this.page.waitForSelector('.row-table');

		const numProspects = await this.page.$eval('.col-md-12 .title', (el) =>
			el.innerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
		);

		await this.page.screenshot({ path: './screenshots/screenshot-prospects.png' });

		return numProspects;
	}
};
