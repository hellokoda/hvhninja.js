const Whats = {
    MISSING_KEY: "There was no API key, please make sure you create the Instance with an API key",
    FAILED_KEY: "The key you entered doesn't match an account, please make sure your API key correlates with your account's key",
    INVALID_KEY: "The key you entered was an invalid API key, please make sure your API key correlates with your account's key",
    NO_GAME_SERVER: "There is no active server."
}

const ErrorCodes_h = {
    0xAAB999: "FAILED_KEY",
    0xB99C30: "NO_GAME_SERVER"
}

const ErrorResolve_h = function(h_code) {
    if (ErrorCodes_h[ h_code ]) {
        return Whats[ ErrorCodes_h[ h_code ] ]
    }
    else {
        return null
    }
}

class NinjaAPIError extends Error {
    /**
     * Create a NinjaAPIError exception.
     * @param {string} message 
     * @param {string} code 
     */
     constructor(message, code) {
        super(message)
        
        this.name = "NinjaAPIError";
        this.message = message;
        this.code = code
        if (message.length == 8 && message.startsWith("0x") && typeof parseInt(message) == 'number' && ErrorResolve_h( parseInt(message) ) != null) {
            this.message = ErrorResolve_h( parseInt(message) );
            this.code = message
        }
    }

    static ErrorCodes_h = ErrorCodes_h
    static Whats = Whats
}

module.exports = NinjaAPIError