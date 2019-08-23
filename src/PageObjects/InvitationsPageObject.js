const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class InvitationsPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="invitations/new"]');
	}

	async getTotalInvitationsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/v1/users/contacts?count=true', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		return res.data.meta.count;
	}

	async getTotalInvitationsInTile() {
		await this.page.waitForSelector('.invitations__funnel.m-b-30');

		return await this.page.$eval('.icon-card__content', (el) => el.innerText);

		await this.page.screenshot({
			path: './screenshots/screenshot-invitations.png'
		});
	}
};
