const PageObject = require('puppeteer-page-object');

module.exports = class ConnectorsPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async clickTab() {
		await this.page.click('a[href="/connectors"]');
		await this.page.waitForSelector('.provider-box__title');
	}

	async AMS360Open() {
		await this.page.click('div:nth-child(1) '); //> div > div:nth-child(2) > div.provider-box__title

		await this.page.waitForSelector('button');
	}

	async AMS360SSOopen() {
		await this.page.waitForSelector('.provider-box__title');

		await this.page.click('div:nth-child(2)');

		await this.page.waitForSelector('button');
	}

	async EzlynxOpen() {
		await this.page.waitForSelector('.provider-box__title');

		await this.page.click('div:nth-child(3)');

		await this.page.waitForSelector('button');
	}

	async EzlynxMSOpen() {
		await this.page.waitForSelector('.provider-box__title');

		await this.page.click('div:nth-child(4)');

		await this.page.waitForSelector('button');
	}

	async QQCatalystOpen() {
		await this.page.waitForSelector('.provider-box__title');

		await this.page.click('div:nth-child(5)');

		await this.page.waitForSelector('button');
	}

	async QQCatalystAPIOpen() {
		await this.page.waitForSelector('.provider-box__title');

		await this.page.click('div:nth-child(6)');

		await this.page.waitForSelector('button');
	}

	async UpdateCredentials() {
		await this.page.click('button');
	}

	async RefreshToken() {
		await this.page.click('button(2)');
	}

	// Creds for AMS360
	async AMS360EnterAgencyInc() {
		await this.page.waitForSelector('input[type="text"]');
		await this.page.type('.form-group .form-control', 'test');
	}

	async AMS360EnterUsernameInc() {
		await this.page.type('form > div:nth-child(2) .form-control', 'test');
	}

	async AMS360EnterPasswordInc() {
		await this.page.type('input[type ="password"]', 'test');
	}

	//Creds for AMS360SSO
	async AMS360SSOEnterUsernameInc() {
		await this.page.type(' .form-control', 'test');
	}

	async AMS360SSOEnterPasswordInc() {
		await this.page.type('input[type ="password"]', 'test');
	}

	//Creds for Ezlynx
	async EzlynxEnterUsernameInc() {
		await this.page.type(' .form-control', 'test');
	}

	async EzlynxEnterPasswordInc() {
		await this.page.type('input[type ="password"]', 'test');
	}

	//Creds for Ezlynx MS
	async EzlynxMSEnterUsernameInc() {
		await this.page.type(' .form-control', 'test');
	}

	async EzlynxMSEnterPasswordInc() {
		await this.page.type('input[type ="password"]', 'test');
	}

	//Creds for QQ Catalyst
	async QQCatalystEnterUsernameInc() {
		await this.page.type(' .form-control', 'test');
	}

	async QQCatalystEnterPasswordInc() {
		await this.page.type('input[type ="password"]', 'test');
	}

	//Creds for QQ Catalyst API
	async QQCatalystAPIEnterUsernameInc() {
		await this.page.type(' .form-control', 'test');
	}

	async QQCatalystAPIEnterPasswordInc() {
		await this.page.type('input[type ="password"]', 'test');
	}

	async ConnectorModalConnect() {
		await this.page.click('button');
	}

	async FailedLogin() {
		await this.page.waitFor({ waitUntil: 'networkidle0' });

		const feiledText = await this.page.$eval('.text-center', (el) => el.innerText);

		return feiledText;
	}

	async MakeScreenshot(page) {
		await this.page.screenshot({
			path: './screenshots/screenshot-' + page + '.png'
		});
	}

	async CloseModal() {
		await this.page.click(
			'#page-wrapper > div > div:nth-child(2) > div > div > div > div > div > div > div > div.modal-dialog__cross'
		);
	}
};
