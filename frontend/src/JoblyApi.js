import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

class JoblyApi {
  static async request(endpoint, params = {}, verb = 'get') {
    // for now, hardcode a token for user "testuser"
    let _token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc' +
      '3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDE1NjQ2Nzl9.LYDHSkl81gEm' +
      '7jfHv9wJhzD4ndpuBkSzBan8Nirb6UY';

    console.debug('API Call:', endpoint, params, verb);

    let q;

    if (verb === 'get') {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params }
      });
    } else if (verb === 'post') {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === 'patch') {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //get all companies from server
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  //get specific company from server
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //get searched companies from server based on search term.
  static async searchCompany(search) {
    let res = await this.request(`companies`, {
      search: `${search}`
    });
    return res.companies;
  }

  //get all jobs from server
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  //get searched jobs from server based on search term.
  static async searchJob(search) {
    let res = await this.request(`jobs`, {
      search: `${search}`
    });
    return res.jobs;
  }

  //login and return a token
  static async login(userData) {
    let res = await axios.post(`${BASE_URL}/login`, userData);
    return res.data.token;
  }

  //get specific user from server
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  static async signUp(userData) {
    let res = await axios.post(`${BASE_URL}/users`, userData);
    return res.data.token;
  }
}

export default JoblyApi;
