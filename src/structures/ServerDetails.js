class ServerDetails {
    /** @type {string} */ address;
    /** @type {number} */ port;
    /** @type {string} */ password;
    /** @type {string} */ connect;
    /**
     * Server detail class
     * @param {object} serialized_serverdata JSON data
     * @returns {ServerDetails} Return server details
     */
     constructor(serialized_serverdata) {
        Object.assign(this, serialized_serverdata)
    }
}

module.exports = ServerDetails;