const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class DashboardPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async getAgentName() {
		await this.page.waitForSelector('.main-navbar__user__name');

		return await this.page.$eval('.main-navbar__user__name', (el) => el.innerText);
	}

	async getSubTabsNames() {
		await this.page.click('.main-navbar__brand');
		await this.page.waitFor(2000);

		return await this.page.$eval('.sidebar--left', (el) => el.innerText);
	}

	async getInviteContactsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/dashboard/todos', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		return res.data.meta.usersPendingInvitationCount;
	}

	async getInviteContactsNumberInTile() {
		await this.page.waitForSelector('.card ');

		return await this.page.$eval('.card__content__mainText', (el) => el.innerText);
	}
	/*
	async newOpportunities() {
		const res = await axios.get('https://api-staging.agentero.com/api/frontend/v1/dashboard/todos', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		return res.data.meta.newOpportunitiesCount;
	}

	async newOpportunitiesTile() {
		await this.page.waitForSelector('.dXuUeq');
		return await this.page.$eval(
			'#page-wrapper > div > div:nth-child(2) > div > div > div > div.m-b-10 > div > div > div > div.dXuUeq > div > div.card__content > div > p.card__content__mainText',
			(el) => el.innerText
		);
	}*/
};
