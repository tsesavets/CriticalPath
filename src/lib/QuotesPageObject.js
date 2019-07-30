const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class QuotesPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="quotes"]');
	}

	async totalQuotesNumber() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/quotes', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const quotesList = res.data.meta.totalCount;
		return quotesList;
	}

	async totalQuotesCheck() {
		await this.page.waitForSelector('.row-table');

		const numQuotes = await this.page.$eval('.col-md-12 .title', (el) => el.innerText);
		await this.page.screenshot({ path: './screenshots/screenshot-quotes.png' });
		return numQuotes;
	}
};
