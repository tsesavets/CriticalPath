const puppeteer = require('puppeteer');
const BasePageObject = require('./PageObjects/BasePage.js');
const SignInPageObject = require('./PageObjects/SignInPageObject');
const DashboardPageObject = require('./PageObjects/DashboardPageObject');
const ClientsPageObject = require('./PageObjects/ClientsPageObject');
const ProspectsPageObject = require('./PageObjects/ProspectsPageObject');
const OpportunitiesPageObject = require('./PageObjects/OpportunitiesPageObject');
const QuotesPageObject = require('./PageObjects/QuotesPageObject');
const PoliciesPageObject = require('./PageObjects/PoliciesPageObject');
const InvitationsPageObject = require('./PageObjects/InvitationsPageObject');
const InvitationsBetaPageObject = require('./PageObjects/InvitationsBetaPageObject');
const ConnectorsPageObject = require('./PageObjects/ConnectorsPageObject');
const LogoutPageObject = require('./PageObjects/LogOutPageObject');
const config = require('./config/config.json');

let page;
let browser;

beforeAll(async () => {
	browser = await puppeteer.launch({
		headless: true,
		ignoreHTTPSErrors: true,
		args: [
			// '--start-fullscreen',
			'-start-maximized',
			'--detectOpenHandles'
		],
		devtools: true
		//slowMo: 20
	});

	page = await browser.newPage();

	page.setViewport({
		width: 1920,
		height: 1080
	});
});

/*afterEach(async (testName) => { OPen suggestion  https://github.com/facebook/jest/issues/7774
	await page.screenshot({ path: './screenshots/' + testName + '.png' });
	log(`Test '${testName}' ended at ${getTime()}`);
});*/

afterAll(() => {
	browser.close();
});

describe('Agentero Loading', () => {
	test('page title should be valid', async () => {
		await page.goto(config.URL, {
			waitUntil: 'networkidle0'
		});

		const title = await page.title();
		expect(title).toBe('Agentero Admin');
	});
});

describe(
	'Agentero Sign In',
	() => {
		test('accepting correct creds should Login', async () => {
			const Sign = new SignInPageObject(page);
			await Sign.enterEmail(config.agentEmail);
			await Sign.enterPassword(config.agentPassword);
			await Sign.login();
			const Dashboard = new DashboardPageObject(page);
			agentName = await Dashboard.getAgentName();
			expect(agentName).toBe('Agent from Agency 3');
		});
	},
	35000
);

describe(
	'Check the naming of each tab',
	() => {
		test('Check the naming of sub-tabs ', async () => {
			const Dashboard = new DashboardPageObject(page);
			tabsNames = await Dashboard.getSubTabsNames();
			expect(tabsNames.replace(/\r|\n/g, '')).toBe(
				' Dashboard Clients Prospects Opportunities Policies Invitations Communications Configuration Connectors'
			);
		});
	},
	35000
);

describe('Agentero Navigation throw all sub-tabs', () => {
	test(
		'Navigating to the Dashboard page and check invite contacts number',
		async () => {
			const Dashboard = new DashboardPageObject(page);
			const BasePage = new BasePageObject(page);
			const inviteContactsNumber = await BasePage.getInviteContactsNumber();
			const inviteContactsTile = await Dashboard.getInviteContactsNumberInTile();
			expect(`${inviteContactsNumber} contacts`).toBe(inviteContactsTile);
		},
		35000
	);

	test(
		'Navigating to the Clients page and seen the clients list ',
		async () => {
			const Clients = new ClientsPageObject(page);
			const BasePage = new BasePageObject(page);
			await Clients.clickTab();
			const contactList = await BasePage.getTotalClientsNumber();
			const numClients = await Clients.getTotalClientsInTable();
			expect(`CLIENTS ${contactList}`).toBe(numClients);
		},
		35000
	);

	test(
		'Navigating to the Prospects page and seen the Prospects list ',
		async () => {
			const Prospects = new ProspectsPageObject(page);
			const BasePage = new BasePageObject(page);
			await Prospects.clickTab();
			const prospectList = await BasePage.getTotalProspectsNumber();
			const numProspects = await Prospects.getTtalProspectsInTable();
			expect(`PROSPECTS ${prospectList} `).toBe(numProspects);
		},
		35000
	);

	/*test( //API url has been changed - page is in developing 
		'Navigating to the Opportunities page and seen the Opportunities list ',
		async () => {
			const Opportunities = new OpportunitiesPageObject(page);
			const BasePage = new BasePageObject(page)
			await Opportunities.clickTab();
			const opportunitiesList = await BasePage.getOpportunitiesNumber();
			const numOpportunities = await Opportunities.getOpportunitiesNumberInTile();
			expect(`OPPORTUNITIES (${opportunitiesList})`).toBe(numOpportunities);
		},
	35000
	); */

	/*test( Tab has been removed
		'Navigating to the Quotes page and seen the Quotes list ',
		async () => {
			const Quotes = new QuotesPageObject(page);
			const BasePage = new BasePageObject(page);
			await Quotes.clickTab();
			const quotesList = await BasePage.getTotalQuotesNumber();
			const numQuotes = await Quotes.getTotalQuotesInTable();
			expect(`QUOTES (${quotesList})`).toBe(numQuotes);
		},
	35000
	);*/

	test(
		'Navigating to the Policies page and seen the Policies list ',
		async () => {
			const Policies = new PoliciesPageObject(page);
			const BasePage = new BasePageObject(page);
			await Policies.clickTab();
			const policiesList = await BasePage.getTotalPoliciesNumber();
			const numPolicies = await Policies.getTotalPoliciesNumberInTable();
			expect(`POLICIES (${policiesList})`).toBe(numPolicies).replace(/[,]/g, '');
		},
		35000
	);

	/*test( has been deleted
		'Navigating to the Invitations page and seen the Invitations metrics ',
		async () => {
			const Invitatios = new InvitationsPageObject(page);
			const BasePage = new BasePageObject(page);
			await Invitatios.clickTab();
			const invitationsList = await BasePage.getTotalInvitationsNumber();
			await page.waitFor(2000); // ожадние загрузки данных в tile
			const numTotal = await Invitatios.getTotalInvitationsInTile();
			expect(invitationsList + 'Total').toBe(numTotal.replace(/\r|\n/g, ''));
		},
	35000
	);*/

	test(
		'Navigating to the Invitations Beta page and seen the Invitations Beta metrics ',
		async () => {
			const InvitatiosBeta = new InvitationsBetaPageObject(page);
			const BasePage = new BasePageObject(page);
			await InvitatiosBeta.clickTab();
			const invitationsBetaList = await BasePage.getTotalInvitationsBetaNumber();
			//const numTotal = await InvitatiosBeta.getTotalInvitationsBetaNumberInTile();
			expect(invitationsBetaList + 'Total').toBe('751Total');
		},
		35000
	);

	// AMS360 connectors have issues
	/*test(
		'Navigating to the Connectors page and incorrect login to the AMS 360 ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.AMS360Open();
			await Connectors.updateCredentials();
			await Connectors.AMS360EnterAgencyInc();
			await Connectors.AMS360EnterUsernameInc();
			await Connectors.AMS360EnterPasswordInc();
			await Connectors.connectorModalConnect();
			const feiledText = await Connectors.failedLogin();
			await Connectors.makeScreenshot('AMS360');
			await Connectors.closeModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
	35000
	);

	test(
		'login to the AMS 360 Vertafone Single ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.AMS360SSOopen();
			await Connectors.updateCredentials();
			await Connectors.AMS360SSOEnterUsernameInc();
			await Connectors.AMS360SSOEnterPasswordInc();
			await Connectors.connectorModalConnect();
			const feiledText = await Connectors.failedLogin();
			await Connectors.makeScreenshot('AMS360SSO');
			await Connectors.closeModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
	35000
	); */

	test(
		'login to the Ezlynx ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.EzlynxOpen();
			await Connectors.updateCredentials();
			await Connectors.EzlynxEnterUsernameInc();
			await Connectors.EzlynxEnterPasswordInc();
			await Connectors.connectorModalConnect();
			const feiledText = await Connectors.failedLogin();
			await Connectors.makeScreenshot('Ezlynx');
			await Connectors.closeModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				"Oh snap!Sorry, it looks like the credentials you provided are not valid or you have Two-Step Verification enabled and we can't connect the data.If you have Two-Step Verification enabled it's an easy fix, please log in to your EZLynx account, disable the Two-Step Verification and click Retry on this page.Try Again"
			);
		},
		35000
	);

	test(
		'login to the Ezlynx MS ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.EzlynxMSOpen();
			await Connectors.updateCredentials();
			await Connectors.EzlynxMSEnterUsernameInc();
			await Connectors.EzlynxMSEnterPasswordInc();
			await Connectors.connectorModalConnect();
			const feiledText = await Connectors.failedLogin();
			await Connectors.makeScreenshot('EzlynxMS');
			await Connectors.closeModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
		35000
	);

	test(
		'login to the QQ Catalyst ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.QQCatalystOpen();
			await Connectors.updateCredentials();
			await Connectors.QQCatalystEnterUsernameInc();
			await Connectors.QQCatalystEnterPasswordInc();
			await Connectors.connectorModalConnect();
			const feiledText = await Connectors.failedLogin();
			await Connectors.makeScreenshot('QQ-Calalist');
			await Connectors.closeModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
		35000
	);

	//Button is disappeared
	/*test(
		'login to the QQ Catalyst API ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.QQCatalystAPIOpen();
			await Connectors.refreshToken();
			await Connectors.QQCatalystAPIEnterUsernameInc();
			await Connectors.QQCatalystAPIEnterPasswordInc();
			await Connectors.connectorModalConnect();
			const feiledText = await Connectors.failedLogin();
			await Connectors.makeScreenshot('QQ-Calalist-API');
			await Connectors.closeModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
	35000
	);*/

	test('Agent is able to log out', async () => {
		const Logout = new LogoutPageObject(page);
		await Logout.clickAgentName();
		await Logout.clickLogout();

		expect(page.url()).toBe('https://api-staging.agentero.com/experts/sign_in');

		await page.screenshot({ path: './screenshots/logout.png' });
	});
});
