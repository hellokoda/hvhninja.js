const NinjaAPIError = require("../wrapper/NinjaAPIError");
const Constants = require("../util/Constants")
const {default:axios} = require("axios");
const QueryDetails = require("./QueryDetails");
const ServerDetails = require("./ServerDetails");

class Server {
    #api_key;
    #parent

    /**
     * Server class with authorization
     * @param {string} ApiKey API key of the account
     * @param {Instance} parent Parent class
     * @returns {Server} Return server object
     */
    constructor(ApiKey, parent) {
        if (!ApiKey) {
            throw new NinjaAPIError(Constants.Error.MISSING_KEY)
            return /* Why it would get to this I don't know */
        }
        this.#api_key = ApiKey;
        this.#parent = parent
    }
    
    /**
     * Get the API key stored in the Server object for authorization
     * @returns {string} API key of the account
     */
     getApiKey() {
        return this.#api_key
    }

    /**
     * Fetch the active server on the platform account
     */
    async fetch() {
        const Auth = this.#api_key
        const reqdata = {
            method: "GET",
            url: Constants.Endpoint("api", Constants.ep.GET_SERVER),
            headers: {
                "X-Api-Key": Auth
            }
        }

        this.#parent.emitbfore("server:fetch", reqdata)

        try {
            let request = await axios(reqdata)
            let data = request.data
            var serverdata = {
                query: new QueryDetails(data.query),
                server: new ServerDetails(data.server)
            }
            this.#parent.emit("server:fetch", serverdata)
            return serverdata
        }
        catch (error) {
            let yielded_request_error = error.response.data.error.code
            throw new NinjaAPIError(  yielded_request_error  )
        }
    }

    /**
     * Kill the active server on the platform account
     */
     async kill() {
        const Auth = this.#api_key
        const reqdata = {
            method: "DELETE",
            url: Constants.Endpoint("api", Constants.ep.GET_SERVER),
            headers: {
                "X-Api-Key": Auth
            }
        }
        this.#parent.emitbfore("server:kill", reqdata)

        try {
            let request = await axios(reqdata)
            let data = request.data
            return true
        }
        catch (error) {
            let yielded_request_error = error.response.data.error.code
            throw new NinjaAPIError(  yielded_request_error  )
        }
    }

    /**
     * Create a server for the platform account
     * @param {"legacy"|"desync"} server_type 
     * @returns 
     */
    async create(server_type) {
        const Auth = this.#api_key

        // Hard stop the desync server type until its ready.
        if (server_type == Constants.ServerType.DESYNC) {
            throw new NinjaAPIError("Server creation type is not supported at this time.")
        }

        try {
            let request = await axios({
                method: "POST",
                url: Constants.Endpoint("api", `server/${server_type}`),
                headers: {
                    "X-Api-Key": Auth
                }
            })
            let data = request.data
            return new ServerDetails(data)
        }
        catch (error) {
            let yielded_request_error = error.response.data.error.code
            throw new NinjaAPIError(  yielded_request_error  )
        }
    }
}

module.exports = Server