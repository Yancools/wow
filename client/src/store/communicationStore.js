import {makeAutoObservable} from "mobx"
export default class CommunicationStore {
    constructor() {
        this._chatList = []
        this._chat = []
        makeAutoObservable(this)
    }

    setChatList = (chatList) => {
        this._chatList = chatList
    }
    get chatList() {
        return this._chatList
    }
    setChat = (chat) => {
        this._chat = chat
    }
    get chat() {
        return this._chat
    }
}