exports.className = "Ninja"
exports.version = "1.0.0"

exports.Instance = require("./src/wrapper/Instance")
exports.User = require('./src/structures/User')
exports.Constants = require('./src/util/Constants')
exports.NinjaAPIError = require('./src/wrapper/NinjaAPIError')

exports.Server = require('./src/structures/Server')
exports.QueryDetails = require('./src/structures/QueryDetails')
exports.ServerDetails = require('./src/structures/ServerDetails')
