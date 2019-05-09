import { appConfig } from '@core';
import apiRequest from './api-request';

class LoginService {
  constructor () {
    this.serviceUrl = ``; // if set a GATEWAY_PREFIX in appCnfig, serviceUrl is nessasery
    this.api = {
      LOGIN: ''
    };
  }

  login (userName, password) {
    let url = `${this.serviceUrl}/${this.api.LOGIN}`;
    return apiRequest.post(url, {
      // user + password   maybe need encryption
    });
  }
}

const loginService = new LoginService();
export default loginService;
