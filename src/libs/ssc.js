const request = require('superagent');

const signals = (securityScorecard) => ({
  patch: async (type, body) => request
      .patch(`${securityScorecard.apiBaseUrl}/signals/by-type/${type}`)
      .send(body)
      .maxRetries(securityScorecard.maxRetries)
      .set({Authorization: `Token ${securityScorecard.token}`}),
});

/**
 * The SecurityScorecard SDK configuration.
 *
 * @typedef {Object} SDKConfiguration
 * @property {number} [timeout = 120000] - The HTTP request timeout in milliseconds.
 * @property {number} [maxRetries = 0] - The maximum amount of request retries.
 * @property {string} [apiBaseUrl = 'https://platform-api.securityscorecard.io'] - The SecurityScorecard API base URL.
 * */

class SecurityScorecard {
  static get DEFAULT_TIMEOUT() {
    return 12e4;
  } // 2 minutes.

  static get DEFAULT_MAX_RETRIES() {
    return 0;
  } // Retries should only be used with requests that are idempotent.

  static get DEFAULT_API_BASE_URL() {
    return 'https://platform-api.securityscorecard.io';
  }
  /**
   * @description Instantiates a SecurityScorecard SDK.
   *
     * @param {string} token - The SecurityScorecard token.
     * @param {SDKConfiguration} [config = {}] - Additional configuration.
     *
     * @return {SecurityScorecard} A SecurityScorecard SDK instance.
     *
     * @example
     *
     * 'use strict';
     *
     * const SecurityScorecard = require('../path_to_this');
     *
     * const securityScorecard = new SecurityScorecard('token', {
     *   timeout: 120000,
     *   maxRetries: 3,
     *   apiBaseUrl: 'https://platform-api.securityscorecard.io'
     * });
     * */
  constructor(token, config = {}) {
    const timeout = config.timeout ?? SecurityScorecard.DEFAULT_TIMEOUT;
    const maxRetries = config.maxRetries ?? SecurityScorecard.DEFAULT_MAX_RETRIES;
    const apiBaseUrl = config.apiBaseUrl ?? SecurityScorecard.DEFAULT_API_BASE_URL;
    this.config = {token, maxRetries, apiBaseUrl, timeout};
    this.services = {
      signals: signals(this),
    };
  }
}

module.exports = SecurityScorecard;
