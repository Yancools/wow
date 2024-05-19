module.exports = class UserDto {
    id;
    nickname;

    constructor(model) {
        this.id = model.id
        this.nickname = model.nickname
    }
}