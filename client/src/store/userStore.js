import {makeAutoObservable} from "mobx"
export default class UserStore {
    constructor() {
        this._profileUrl = {}
        this._userData = {}
        makeAutoObservable(this)
    }

    setUserData = (userData) => {
        this._userData = userData
    }
    get userData() {
        return this._userData
    }
    setProfileUrl = (profileUrl) => {
        this._profileUrl = profileUrl
    }
    get profileUrl() {
        return this._profileUrl
    }
}