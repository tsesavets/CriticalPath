const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class InvitationsPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="invitations/scheduled/new"]');
	}

	async getTotalInvitationsInTile() {
		await this.page.waitForSelector('.invitations__funnel.m-b-30');

		return await this.page.$eval('.icon-card__content', (el) => el.innerText);

		await this.page.screenshot({
			path: './screenshots/screenshot-invitations.png'
		});
	}
};
