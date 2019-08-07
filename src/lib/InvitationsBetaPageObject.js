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

	async totalInvitationsBetaNumber() {
		const res = await axios.get('https://api-staging.agentero.com/v1/users/contacts?count=true', {
			headers: { 'X-Expert-Token': 'KCJm522RoEbKkw_q5uVW' }
		});

		const ContactsTotal = res.data.meta.count;
		return ContactsTotal;
	}

	async totalInvitationsBetaCheck() {
		await this.page.waitForSelector(
			'#root > div > main > div.jss74 > div:nth-child(2) > div > div.css-iyv6ql-dashboardContainer--InvitationsDashboard > div.css-wbbzg8-leftContent--InvitationsDashboard > div.invitations__funnel.m-b-30 > div:nth-child(1) > div'
		);

		const numTotal = await this.page.$eval(
			'#root > div > main > div.jss74 > div:nth-child(2) > div > div.css-iyv6ql-dashboardContainer--InvitationsDashboard > div.css-wbbzg8-leftContent--InvitationsDashboard > div.invitations__funnel.m-b-30 > div:nth-child(1) > div',
			(el) => el.innerText
		);

		await page.screenshot({ path: './screenshots/screenshot-invitationsBeta.png' });
		return numTotal;
	}
};
