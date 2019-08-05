const PageObject = require('puppeteer-page-object');
const axios = require('axios');

module.exports = class InvitationsBetaPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href*="invitations/beta"]');
		this.page.waitForNavigation();
	}

	async totalContactsNumber() {
		const res = await axios.get('https://api-staging.agentero.com/v1/users/contacts?count=true', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const ContactsTotal = res.data.meta.count;
		return ContactsTotal;
	}

	async totalInvitationsCheck() {
		console.log('1');
		await this.page.waitForSelector('.css-wbbzg8-leftContent--InvitationsDashboard');
		console.log('2');
		const numTotal = await this.page.$eval(
			'.icon-card:nth-child(1) > .icon-card__content > ul > li > .icon-card__number',
			(el) => el.innerText
		);
		console.log('3' + numTotal);
		await page.screenshot({ path: './screenshots/screenshot-invitationsBeta.png' });
		return numTotal;
	}
};
