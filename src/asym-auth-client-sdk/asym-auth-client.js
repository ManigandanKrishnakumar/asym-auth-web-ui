import {
  AUTHENTICATOR_END_POINTS,
  ERR_MESSAGES,
  HTTP_METHODS,
} from "./constants";

export class AsymAuth {
  #domain;
  #isAccountExist;
  #currentUsername;
  #userNames;

  constructor() {
    this.#init();
  }

  /**
   * This method initializes the class with necessary data
   */
  #init() {
    this.#domain = this.#getDomainName();
    // this.#isAccountExist = this.getIsAccountAvailable();
    // this.#userNames = this.#fetchExistingUsernames();
  }

  /**
   * This method is responsible for setting the selected username by the user
   * @param {string} username Selected Username
   */
  setCurrentUsername(username) {
    this.#currentUsername = username;
  }

  /**
   * This method returns all the existing usernames in this domain
   * @returns [string] List of existing usernames
   */
  getExistingUsernames() {
    return this.#userNames;
  }

  /**
   * This method returns the current domain name
   * @returns {string} Domain Name
   */
  #getDomainName() {
    const urlString = window.location;
    const url = new URL(urlString);

    return url.hostname;
  }

  /**
   * This method returns a boolean representing whether there is an existing account in this domain
   * @returns {boolean}
   */
  #getIsAccountAvailable() {
    return this.#isAccountExist;
  }

  /**
   * This method fetches all the existing usernames of this domain and sets the values in the userNames field
   */
  async #fetchExistingUsernames() {
    const usernames = await this.#httpClient(
      AUTHENTICATOR_END_POINTS.FETCH_EXISTING_USERNAMES,
      HTTP_METHODS.GET
    );

    this.#userNames = usernames;
    this.#isAccountExist = usernames.length > 0;
  }

  /**
   * Checks whether the user has account is available in this domain
   * @returns {boolean | null} is account available on this site
   */
  async fetchIsAccountAvailable() {
    return await this.#httpClient(
      AUTHENTICATOR_END_POINTS.CHECK_ACCOUNT_AVAILABILITY,
      HTTP_METHODS.GET
    );
  }

  /**
   * This method generates a new asymmetric key-pair for the user in this domain and returns the public key.
   * @param {string} username Unique username for the user account in this application
   * @returns {string} Public key of the user
   */
  async createAccountKeyPair(username) {
    if (!username) {
      throw new Error(ERR_MESSAGES.NO_USERNAME_PROVIDED);
    }

    const data = {
      username,
    };

    return await this.#httpClient(
      AUTHENTICATOR_END_POINTS.CREATE_ACCOUNT_KEY_PAIR,
      HTTP_METHODS.POST,
      data
    );
  }

  /**
   * This method accepts the server message and encrypts the message using the private key of the user.
   * @param {string} serverMessage
   * @returns {string} Returns the encrypted message.
   */
  async encryptServerMessage(serverMessage) {
    if (!this.#currentUsername) {
      throw new Error(ERR_MESSAGES.NO_USERNAME_PROVIDED);
    }

    const data = {
      serverMessage,
      username: this.#currentUsername,
    };

    return await this.#httpClient(
      AUTHENTICATOR_END_POINTS.GET_ENCRYPTED_SERVER_MESSAGE,
      HTTP_METHODS.POST,
      data
    );
  }

  async #httpClient(url = "", method = HTTP_METHODS.GET, body = {}) {
    try {
      const METHOD_BODY = {
        [HTTP_METHODS.POST]: (options) => {
          options["body"] = JSON.stringify({ ...body, domain: this.#domain });
        },

        [HTTP_METHODS.GET]: () => {
          url = `${url}?${new URLSearchParams(body)}`;
        },
      };

      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      METHOD_BODY[method](options);

      if (HTTP_METHODS.POST) {
      } else {
      }
      const response = await fetch(url);

      const data = response.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.errorMessage);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
