const puppeteer = require('puppeteer');
const SignInPageObject = require('./lib/SignInPageObject');
const DashboardPageObject = require('./lib/DashboardPageObject');
const ClientsPageObject = require('./lib/ClientsPageObject');
const ProspectsPageObject = require('./lib/ProspectsPageObject');
const OpportunitiesPageObject = require('./lib/OpportunitiesPageObject');
const QuotesPageObject = require('./lib/QuotesPageObject');
const PoliciesPageObject = require('./lib/PoliciesPageObject');
const InvitationsPageObject = require('./lib/InvitationsPageObject');
const InvitationsBetaPageObject = require('./lib/InvitationsBetaPageObject');
const ConnectorsPageObject = require('./lib/ConnectorsPageObject');
const LogoutPageObject = require('./lib/LogOutPageObject');

const URL = 'https://api-staging.agentero.com/experts/sign_in';

let page;
let browser;

beforeAll(async () => {
	browser = await puppeteer.launch({
		headless: false,
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

afterAll(() => {
	browser.close();
});

describe('Agentero Loading', () => {
	test(
		'page title should be valid',
		async () => {
			await page.goto(URL, {
				waitUntil: 'networkidle0'
			});

			const title = await page.title();
			expect(title).toBe('Agentero Admin');
		},
		25000
	);
});

describe('Agentero Sign In', () => {
	test(
		'accepting correct creds should Login',
		async () => {
			const Sign = new SignInPageObject(page);
			await Sign.EnterEmail('dzianis.tsesavets+42@agentero.com');
			await Sign.EnterPassword('password');
			agentName = await Sign.Login();
			expect(agentName).toBe('Agent from Agency 3');
		},
		15000
	);
});

describe('Check the naming of each tab', () => {
	test('Check the naming of sub-tabs ', async () => {
		const Dashboard = new DashboardPageObject(page);
		tabsNames = await Dashboard.takeSubNames();
		expect(tabsNames.replace(/\r|\n/g, '')).toBe(
			' Dashboard Clients Prospects Opportunities Quotes Policies Invitations Invitations Beta Communications Notifications Connectors'
		);
	});
});

describe('Agentero Navigation throw all sub-tabs', () => {
	test(
		'Navigating to the Clients page and seen the clients list ',
		async () => {
			const Clients = new ClientsPageObject(page);
			await Clients.clickTab();
			const contactList = await Clients.totalClientsNumber();
			const numClients = await Clients.totalClientsCheck();
			expect(`CLIENTS ${contactList}`).toBe(numClients);
		},
		25000
	);

	test(
		'Navigating to the Prospects page and seen the Prospects list ',
		async () => {
			const Prospects = new ProspectsPageObject(page);
			await Prospects.clickTab();
			const prospectList = await Prospects.totalProspectsNumber();
			const numProspects = await Prospects.totalProspectsCheck();
			expect(`PROSPECTS ${prospectList} `).toBe(numProspects);
		},
		15000
	);

	/*	test(
		'Navigating to the Opportunities page and seen the Opportunities list ',
		async () => {
			const Opportunities = new OpportunitiesPageObject(page);
			await Opportunities.clickTab();
			const opportunitiesList = await Opportunities.totalOpportunitiesNumber();
			const numOpportunities = await Opportunities.totalProspectsCheck();
			expect(`OPPORTUNITIES (${opportunitiesList})`).toBe(numOpportunities);
		},
		15000
	); //API url has been changed
*/
	test(
		'Navigating to the Quotes page and seen the Quotes list ',
		async () => {
			const Quotes = new QuotesPageObject(page);
			await Quotes.clickTab();
			const quotesList = await Quotes.totalQuotesNumber();
			const numQuotes = await Quotes.totalQuotesCheck();
			expect(`QUOTES (${quotesList})`).toBe(numQuotes);
		},
		15000
	);

	test(
		'Navigating to the Policies page and seen the Policies list ',
		async () => {
			const Policies = new PoliciesPageObject(page);
			await Policies.clickTab();
			const policiesList = await Policies.totalPoliciesNumber();
			const numPolicies = await Policies.totalPoliciesCheck();
			expect(`POLICIES (${policiesList})`).toBe(numPolicies);
		},
		30000
	);

	test(
		'Navigating to the Invitations page and seen the Invitations metrics ',
		async () => {
			const Invitatios = new InvitationsPageObject(page);
			await Invitatios.clickTab();
			const invitationsList = await Invitatios.totalInvitationsNumber();
			const numTotal = await Invitatios.totalInvitationsCheck();
			expect(invitationsList + 'Total').toBe(numTotal.replace(/\r|\n/g, ''));
		},
		15000
	);

	//The same for the Invitations Beta
	/*
	test(
		'Navigating to the Invitations page and seen the Invitations Beta metrics ',
		async () => {
			const InvitatiosBeta = new InvitationsBetaPageObject(page);
			await InvitatiosBeta.clickTab();
			const invitationsList = await InvitatiosBeta.totalContactsNumber();
			const numTotal = await InvitatiosBeta.totalInvitationsCheck();
			expect(ContactTotal).toBe(NumTotal);
		},
		15000
	);
*/

	/*test(
		'Navigating to the Connectors page and incorrect login to the AMS 360 ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.AMS360Open();
			await Connectors.UpdateCredentials();
			await Connectors.AMS360EnterAgencyInc();
			await Connectors.AMS360EnterUsernameInc();
			await Connectors.AMS360EnterPasswordInc();
			await Connectors.ConnectorModalConnect();
			const feiledText = await Connectors.FailedLogin();
			await Connectors.MakeScreenshot('AMS360');
			await Connectors.CloseModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
		30000
	);

	test(
		'login to the AMS 360 Vertafone Single ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.AMS360SSOopen();
			await Connectors.UpdateCredentials();
			await Connectors.AMS360SSOEnterUsernameInc();
			await Connectors.AMS360SSOEnterPasswordInc();
			await Connectors.ConnectorModalConnect();
			const feiledText = await Connectors.FailedLogin();
			await Connectors.MakeScreenshot('AMS360SSO');
			await Connectors.CloseModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
		30000
	);*/

	test(
		'login to the Ezlynx ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.EzlynxOpen();
			await Connectors.UpdateCredentials();
			await Connectors.EzlynxEnterUsernameInc();
			await Connectors.EzlynxEnterPasswordInc();
			await Connectors.ConnectorModalConnect();
			const feiledText = await Connectors.FailedLogin();
			await Connectors.MakeScreenshot('Ezlynx');
			await Connectors.CloseModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				"Oh snap!Sorry, it looks like the credentials you provided are not valid or you have Two-Step Verification enabled and we can't connect the data.If you have Two-Step Verification enabled it's an easy fix, please log in to your EZLynx account, disable the Two-Step Verification and click Retry on this page.Try Again"
			);
		},
		30000
	);

	test(
		'login to the Ezlynx MS ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.EzlynxMSOpen();
			await Connectors.UpdateCredentials();
			await Connectors.EzlynxMSEnterUsernameInc();
			await Connectors.EzlynxMSEnterPasswordInc();
			await Connectors.ConnectorModalConnect();
			const feiledText = await Connectors.FailedLogin();
			await Connectors.MakeScreenshot('EzlynxMS');
			await Connectors.CloseModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
		30000
	);

	test(
		'login to the QQ Catalyst ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.QQCatalystOpen();
			await Connectors.UpdateCredentials();
			await Connectors.QQCatalystEnterUsernameInc();
			await Connectors.QQCatalystEnterPasswordInc();
			await Connectors.ConnectorModalConnect();
			const feiledText = await Connectors.FailedLogin();
			await Connectors.MakeScreenshot('QQ-Calalist');
			await Connectors.CloseModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
		30000
	);

	test(
		'login to the QQ Catalyst API ',
		async () => {
			const Connectors = new ConnectorsPageObject(page);
			await Connectors.clickTab();
			await Connectors.QQCatalystAPIOpen();
			await Connectors.RefreshToken();
			await Connectors.QQCatalystAPIEnterUsernameInc();
			await Connectors.QQCatalystAPIEnterPasswordInc();
			await Connectors.ConnectorModalConnect();
			const feiledText = await Connectors.FailedLogin();
			await Connectors.MakeScreenshot('QQ-Calalist-API');
			await Connectors.CloseModal();
			expect(feiledText.replace(/\r|\n/g, '')).toBe(
				'Oh snap!Sorry, it looks like the credentials you provided are not valid...Try Again'
			);
		},
		30000
	);

	test(
		'Agent is able to log out',
		async () => {
			const Logout = new LogoutPageObject(page);
			await Logout.ClickAgentName();
			await Logout.ClickLogout();

			expect(page.url()).toBe('https://api-staging.agentero.com/experts/sign_in');

			await page.screenshot({ path: './screenshots/logout.png' });
		},
		15000
	);
});
