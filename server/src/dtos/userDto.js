module.exports = class UserDto {
    id;
    login;

    constructor(model) {
        this.id = model.id
        this.login = model.login
    }
}