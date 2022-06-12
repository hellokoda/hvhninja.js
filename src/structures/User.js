class User {
    id;
    username;
    last_activity;
    register_date;
    permissions;
    /**
     * User class from object
     * @param {object} serialized_user 
     */
    constructor(serialized_user) {
        Object.assign(this, serialized_user);
    }
}
exports.User = User