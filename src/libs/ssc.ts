import request from 'superagent';
import * as utils from '../utils/utils';

/*
const signals = (securityScorecard) => {
  return {
    patch: async (type, body) => {
      console.log(type);
      console.log(body);
      console.log('Auth', securityScorecard.config.token);
      console.log('url', `${securityScorecard.config.apiBaseUrl}/signals/by-type/${type}`);
      return request
          .patch(`${securityScorecard.config.apiBaseUrl}/signals/by-type/${type}`)
          .send(body)
          .retry(securityScorecard.config.maxRetries)
          .set({Authorization: `Token ${securityScorecard.config.token}`});
    },
  };
};
*/

interface ISSCConfig {
  token: string,
  timeout?: number,
  maxRetries?: number,
  apiBaseUrl?: string,
}

interface IApiCallOptions {
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  method?: string;
  path: string;
  query?: any;
  body?: any;
}

export default class SecurityScorecard {
  static get DEFAULT_TIMEOUT() {
    return 12e4;
  } // 2 minutes.

  static get DEFAULT_MAX_RETRIES() {
    return 0;
  } // Retries should only be used with requests that are idempotent.

  static get DEFAULT_API_BASE_URL() {
    return 'https://platform-api.securityscorecard.io';
  }

  public config: {
    timeout: number,
    token: string,
    maxRetries: number,
    apiBaseUrl: string
  };

  /**
   * @description Instantiates a SecurityScorecard SDK.
   *
   * @param {ISSCConfig} [config = {}] - configuration.
   *
   * @return {SecurityScorecard} A SecurityScorecard SDK instance.
   *
   * @example
   *
   *
   * const SecurityScorecard = require('../path_to_this');
   *
   * const securityScorecard = new SecurityScorecard('token', {
   *   timeout: 120000,
   *   maxRetries: 3,
   *   apiBaseUrl: 'https://platform-api.securityscorecard.io'
   * });
   *
   */
  constructor(config:ISSCConfig) {
    const timeout = config.timeout || SecurityScorecard.DEFAULT_TIMEOUT;
    const maxRetries = config.maxRetries || SecurityScorecard.DEFAULT_MAX_RETRIES;
    const apiBaseUrl = config.apiBaseUrl || SecurityScorecard.DEFAULT_API_BASE_URL;
    this.config = {token: config.token, maxRetries, apiBaseUrl, timeout};
  }

  async apiCall(options:IApiCallOptions): Promise<any> {
    const timeout = options.timeout || this.config.timeout;
    const maxRetries = options.maxRetries || this.config.maxRetries;
    const method = options.method || 'GET';
    const baseUrl = options.baseUrl || this.config.apiBaseUrl;
    const path = options.path || '/';

    const url = utils.normalizeUrl(baseUrl, path);

    const headers = {
      Authorization: `Token ${this.config.token}`
    }

    try {
      const req = request(method, url).timeout(timeout).retry(maxRetries).set(headers);
      if (options.query) {
        req.query(options.query);
      }
      if (options.body) {
        req.send(options.body);
      }
      const res = await req;
      return res.status === 204 ? undefined : res.body;
    } catch (error) {
      throw error;
    }
  }
}
