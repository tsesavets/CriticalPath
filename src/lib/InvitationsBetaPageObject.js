const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class InvitationsBetaPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="invitations/beta"]');
	}

	async totalContactsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/v1/users/contacts?count=true', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const ContactsTotal = res.data.meta.count;
		return ContactsTotal;
	}

	async totalInvitationsCheck() {
		await this.page.waitForSelector('.icon-card__content');

		const numTotal = await this.page.$eval('icon-card__content', (el) => el.innerText);

		await page.screenshot({ path: './screenshots/screenshot-invitationsBeta.png' });
		return numTotal;
	}
};
