import axios from 'axios';
import { appConfig, appConst } from '@core';

const apiRequest = axios.create({
  baseURL: appConfig.BASE_URL,
  timeout: appConfig.TIMEOUT,
  headers: {
    'Content-Type': appConfig.OCNTENT_TYPE
  }
});

apiRequest.interceptors.request.use(request => {
  // add slat & validate login expired

  if (request.method === 'post' || request.method === 'put') {
    if (request.data === undefined) { request.data = null; }
  }

  return request;
});

apiRequest.interceptors.response.use(
  response => {
    // success
    let data = response.data;
    if (data && !!data.success === false) {
      // TODO: if data.success is false add logic to redirector to current page
    }

    if (data.code && +data.code !== 200) {
      // notification error
    }
    return response.data;
  },
  ({ response }) => {
    // failed
    let data = response.data;
    let showError = false;
    if (data && !!data.success === false) {
      showError = true;
      // TODO add validate logic by API
    }

    if (showError) {
      // TODO add customer error message for notification
    }

    return Promise.reject(data);
  }
);

export default apiRequest;
