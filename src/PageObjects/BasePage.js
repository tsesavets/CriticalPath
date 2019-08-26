const PageObject = require('puppeteer-page-object');
const axios = require('axios');
const config = require('../config/config.json');
const apiUrl = 'https://api-staging.agentero.com/api/frontend/v1/';

module.exports = class ClientsPageObject extends PageObject {
	constructor(page) {
		super(page);
		this.page = page;
	}

	async getInviteContactsNumber() {
		const res = await axios.get(apiUrl + 'dashboard/todos', {
			headers: { 'X-Expert-Token': config.XExpertToken }
		});

		return res.data.meta.usersPendingInvitationCount;
	}

	async getTotalClientsNumber() {
		const res = await axios.get(apiUrl + 'clients', {
			headers: { 'X-Expert-Token': config.XExpertToken }
		});

		return res.data.meta.totalCount;
	}

	async getTotalQuotesNumber() {
		const res = await axios.get(apiUrl + 'quotes', {
			headers: { 'X-Expert-Token': config.XExpertToken }
		});

		const quotesList = res.data.meta.totalCount;
		return quotesList;
	}

	async getTotalPoliciesNumber() {
		const res = await axios.get(apiUrl + 'insurances', {
			headers: { 'X-Expert-Token': config.XExpertToken }
		});

		return res.data.meta.totalCount;
	}

	getOpportunitiesNumber() {
		const res = axios.get(
			'https://autopush.agentero.dev/opportunities.OpportunityFrontendService/GetOpportunityDetails',
			{
				headers: { 'X-Expert-Token': config.XExpertToken }
			}
		);

		return res.data.meta.totalCount;
	}

	async getTotalInvitationsNumber() {
		const res = await axios.get(apiUrl + 'users/contacts?count=true', {
			headers: { 'X-Expert-Token': config.XExpertToken }
		});

		return res.data.meta.count;
	}

	async getTotalInvitationsBetaNumber() {
		const res = await axios.get(apiUrl + 'users/contacts?count=true', {
			headers: { 'X-Expert-Token': config.XExpertToken }
		});

		return res.data.meta.count;
	}

	async getTotalProspectsNumber() {
		const res = await axios.get(apiUrl + '/prospects', {
			headers: { 'X-Expert-Token': config.XExpertToken }
		});

		return res.data.meta.totalCount;
	}
};
