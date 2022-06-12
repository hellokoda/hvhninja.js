class QueryDetails {
    /** @type {string} */       name;
    /** @type {string} */       map;
    /** @type {"csgo"}       */ mod;
    /** @type {730}          */ id;
    /** @type {string}       */ ip;
    /** @type {27015|number} */ port;
    /** @type {number}       */ players;
    /** @type {number}       */ places;
    /** @type {number}       */ bots;
    /** @type {"d"|"l"}      */ dedie;
    /** @type {"w"|"l"|"m"}  */ os;
    /** @type {1|0}          */ pass;
    /**
     * Query detail class
     * @param {object} serialized_querydata JSON data
     * @returns {ServerDetails} Return query details
     */
     constructor(serialized_querydata) {
        Object.assign(this, serialized_querydata)
    }
}

module.exports = QueryDetails;