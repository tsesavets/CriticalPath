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

	getOpportunitiesNumber() {
		const res = axios.get(
			'https://autopush.agentero.dev/opportunities.OpportunityFrontendService/GetOpportunityDetails',
			{
				headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
			}
		);

		return res.data.meta.totalCount;
	}

	async getOpportunitiesNumberInTile() {
		await this.page.waitForSelector('.row-table');

		return await this.page.$eval('.col-md-12 .title', (el) => el.innerText);
	}
};
