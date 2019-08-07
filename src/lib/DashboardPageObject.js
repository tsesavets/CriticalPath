const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class DashboardPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async takeSubNames() {
		await this.page.click('.main-navbar__brand');
		await this.page.waitFor(2000);

		const tabsNames = await this.page.$eval('.sidebar--left', (el) => el.innerText);

		return tabsNames;
	}

	async inviteContacts() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/dashboard/todos', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const InviteContactsTotal = res.data.meta.usersPendingInvitationCount;
		return InviteContactsTotal;
	}

	async inviteContactsTile() {
		await this.page.waitForSelector('.card ');

		const numTotal = await this.page.$eval('.card__content__mainText', (el) => el.innerText);

		await this.page.screenshot({ path: './screenshots/screenshot-Dashboard.png' });
		return numTotal;
	}

	async newOpportunities() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/dashboard/todos', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const newOpportunitiesCount = res.data.meta.newOpportunitiesCount;
		return newOpportunitiesCount;
	}

	async newOpportunitiesTile() {
		await this.page.waitForSelector('.dXuUeq');
		const numNewOpportunities = await this.page.$eval(
			'#page-wrapper > div > div:nth-child(2) > div > div > div > div.m-b-10 > div > div > div > div.dXuUeq > div > div.card__content > div > p.card__content__mainText',
			(el) => el.innerText
		);
		return numNewOpportunities;
	}
};
