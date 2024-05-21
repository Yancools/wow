import { CHATLIST_URL, CHAT_URL, CREATECHAT_URL, CREATECONVERSATION_URL, SENDMESSAGE_URL } from "../utils/consts";
import { $authhost } from "./index";

export const chats = async () => {
    const {data} = await $authhost.get(CHATLIST_URL)
    return data
}
export const chat = async (chatId) => {
        const {data} = await $authhost.get(CHAT_URL + chatId)
        return data

}
export const sendMessage = async (formData) => {
        const result = await $authhost.post(SENDMESSAGE_URL, formData)
        return result
}
export const createChat = async (companionNickname) => {
        const {data} = await $authhost.post(CREATECHAT_URL, {companionNickname})
        return data
}
export const createConversation = async (conversationData) => {
        const {data} = await $authhost.post(CREATECONVERSATION_URL, conversationData)
        return data
}