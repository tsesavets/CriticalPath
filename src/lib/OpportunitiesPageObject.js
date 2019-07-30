const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class OpportunitiesPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="opportunities"]');
	}

	async totalOpportunitiesNumber() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/opportunities', { //https://autopush.agentero.dev/opportunities.OpportunityFrontendService/GetOpportunityDetails
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const opportunitiesList = res.data.meta.totalCount;
		return opportunitiesList;
	}

	async totalProspectsCheck() {
		await this.page.waitForSelector('.row-table');

		const numOpportunities = await this.page.$eval('.col-md-12 .title', (el) => el.innerText);

		await this.page.screenshot({
			path: './screenshots/screenshot-opportunities.png'
		});

		return numOpportunities;
	}
};
