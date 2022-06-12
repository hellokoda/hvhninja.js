const NinjaAPIError = require("./NinjaAPIError");
const Constants = require("../util/Constants");
const Server = require("../structures/Server");
const { default: axios } = require("axios");
const { User } = require("../structures/User");
const { ErrorCodes_h, Whats } = require("./NinjaAPIError");

class Instance {
    /** @type {string}  */  #api_key;
    /** @type {boolean} */  #logged_in;
    /** @type {Server}  */  server;
    /** @type {User}    */  user;
    /** @type {object}  */  #event_handles = {}
    /** @type {object}  */  #preevent_handles = {}

    /**
     * Initiate an instance class
     * @param {string} ApiKey API key of the account
     * @returns {Instance} Return dynamic instance class
     */
     constructor(ApiKey) {
        if (!ApiKey) {
            throw new NinjaAPIError(Whats.MISSING_KEY)
        }

        if (ApiKey.length != 34) {
            throw new NinjaAPIError(Whats.INVALID_KEY)
        }

        this.#api_key = ApiKey;
        this.#logged_in = false;
    }

    /**
     * Login to the API. This is required to enable the server and user declarations
     * @fires EventEmitter
     */
     async login() {
        var context = {
            method: "GET",
            url: Constants.Endpoint("api", Constants.ep.SELF),
            headers: {
                "X-Api-Key": this.#api_key
            }
        };
        this.emitbfore("login", context)

        try {
            let request = await axios(context)
            let data = request.data
            this.server = new Server(this.#api_key, this)
            this.user = new User(data)

            this.#logged_in = true;
            this.emit("login", {
                success: true,
                user: this.user
            })
        }
        catch (error) {
            let yielded_request_error = error.response.data.error.code
            throw new NinjaAPIError( yielded_request_error )
        }
    }


    /**
     * Register an event
     * @param {string} event 
     * @param {function(event)} callbackfn 
     * @returns {string} ID of the event
     * @alias Instance#addEventListener
     */
     on(event, callbackfn) {
        return this.addEventListener(event, callbackfn)
     }
    /**
     * Register an event
     * @param {string} event 
     * @param {function(event)} callbackfn 
     * @returns {string} ID of the event
     * @alias Instance#on
     */
    addEventListener(event, callbackfn) {
        function makeid(length) {
            var result           = '0x';
            var characters       = 'ABCDE1234567890';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
            }
            return result;
        }
        var id = makeid(6);
        
        if(!this.#event_handles[event]) {
            this.#event_handles[event] = {}
        }
        this.#event_handles[event][id] = callbackfn
        return id
    }

    /**
     * Unregisters an event
     * @param {string} event 
     * @param {function(event)} callbackfn 
     * @returns {string} ID of the event
     * @alias Instance#removeEventListener
     */
     off(event, id) {
        return this.removeEventListener(event, id)
     }

     removeEventListener(event, id) {
        if(!this.#event_handles[event]) {
            return false;
        }
        else {
            if(this.#event_handles[event][id]) {
                delete this.#event_handles[event][id]
                return true;
            }
            else {
                return false
            }
        }
    }

    /**
     * Register a before event
     * @param {string} event 
     * @param {function(object)} callbackfn 
     * @returns {string} ID of the event
     * @alias Instance#addBeforeEventListener
     */
     pre(event, callbackfn) {
        return this.addBeforeEventListener(event, callbackfn)
     }
    /**
     * Register a before event
     * @param {string} event 
     * @param {function(object)} callbackfn 
     * @returns {string} ID of the event
     * @alias Instance#pre
     */
     addBeforeEventListener(event, callbackfn) {
        function makeid(length) {
            var result           = '0x';
            var characters       = 'ABCDE1234567890';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
            }
            return result;
        }
        var id = makeid(6);
        
        if(!this.#preevent_handles[event]) {
            this.#preevent_handles[event] = {}
        }
        this.#preevent_handles[event][id] = callbackfn
        return id
    }

    /**
     * Unregisters an event
     * @param {string} event 
     * @param {function(event)} callbackfn 
     * @returns {string} ID of the event
     * @alias Instance#removeBeforeEventListener
     */
     unpre(event, id) {
        return this.removeBeforeEventListener(event, id)
     }

     removeBeforeEventListener(event, id) {
        if(!this.#preevent_handles[event]) {
            return false;
        }
        else {
            if(this.#preevent_handles[event][id]) {
                delete this.#preevent_handles[event][id]
                return true;
            }
            else {
                return false
            }
        }
    }

    getHandles(event) {
        if(this.#event_handles[event]) {
            return this.#event_handles[event];
        }
    }
    getBeforeHandles(event) {
        if(this.#preevent_handles[event]) {
            return this.#preevent_handles[event];
        }
    }

    /**
     * Initiate event callbacks with variables
     * @event EventEmitter
     * @param {string} event The event's name
     * @param {object} _var Variables to forward to the callback
     */
    emit(event, _var) {
        if(this.#event_handles[event]) {
            var handles = Object.values(this.#event_handles[event]);
            for(let i = 0; i < handles.length; i++) {
                handles[i](_var)
            }
        }
    }

        /**
     * Initiate before_event callbacks with variables
     * @event EventEmitter
     * @param {string} event The event's name
     * @param {object} _var Variables to forward to the callback
     */
    emitbfore(event, _var) {
        if(this.#preevent_handles[event]) {
            var handles = Object.values(this.#preevent_handles[event]);
            for(let i = 0; i < handles.length; i++) {
                handles[i](_var)
            }
        }
    }

}

module.exports = Instance