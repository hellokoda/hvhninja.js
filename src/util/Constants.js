exports.ServerType = {
    LEGACY: "legacy",
    DESYNC: "desync"
}

exports.ServerUrls = {
    api: "https://platform.hvh.ninja/hapi/",
    main: "https://hvh.ninja/",
    platform: "https://platform.hvh.ninja/"
}

exports.Endpoint = (url, endpoint) => {
    return exports.ServerUrls[url] + endpoint
}

exports.ep = {
    SELF: "user/me",
    GET_SERVER: "server",
}