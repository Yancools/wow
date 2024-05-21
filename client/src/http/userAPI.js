import { CHANGEFIRSTNAME_URL, CHANGEGENDER_URL, CHANGELASTNAME_URL, CHANGELOGIN_URL, CHANGENICKNAME_URL, CHANGEPASSWORD_URL, CHANGEPHOTO_URL, CHANGESTATUS_URL, LOGIN_URL, LOGOUT_URL, REFRESH_URL, REGISTRATION_URL, SEARCHUSER_URL, USERDATA_URL } from "../utils/consts";
import { $host, $authhost } from "./index";


export const registration = async (login, password, firstname, lastname, gender) => {
    const result = await $host.post(REGISTRATION_URL, {login, password, firstname, lastname , gender})
    localStorage.setItem('Token', result.data)
    return result
}
export const login = async (login, password) => {
    const result = await $host.post(LOGIN_URL, {login, password})
    localStorage.setItem('Token', result.data)
    return result
}
export const logout = async () => {
    const result = await $authhost.post(LOGOUT_URL)
    localStorage.removeItem('Token')
    return result
}
export const checkAuth = async () =>{
    const result = await $host.get(REFRESH_URL)
    localStorage.setItem('Token', result.data)
    return result
}
export const userData = async (userNickname) => {
    const {data} = await $host.get(USERDATA_URL + userNickname)
    return data
}
export const searchUser = async (searchUser) => {
    const {data} = await $authhost.post(SEARCHUSER_URL, {searchUser})
    return data
}
export const changeLogin = async (login, newLogin, password) => {
    const result = await $authhost.post(CHANGELOGIN_URL, {login, newLogin, password})
    return result
}
export const changePassword = async (password, newPassword, confirmNewPassword) => {
    const result = await $authhost.post(CHANGEPASSWORD_URL, {password, newPassword, confirmNewPassword})
    return result
}
export const changeNickname = async (newNickname) => {
    const result = await $authhost.post(CHANGENICKNAME_URL, {newNickname})
    return result
}
export const changeGender = async (newGender) => {
    const result = await $authhost.post(CHANGEGENDER_URL, {newGender})
    return result
}
export const changeFirstname = async (newFirstname) => {
    const result = await $authhost.post(CHANGEFIRSTNAME_URL, {newFirstname})
    return result
}
export const changeLastname = async (newLastname) => {
    const result = await $authhost.post(CHANGELASTNAME_URL, {newLastname})
    return result
}
export const changePhoto = async (data) => {
    const result = await $authhost.post(CHANGEPHOTO_URL, data)
    return result
}
export const changeStatus = async (newStatus) => {
    const result = await $authhost.post(CHANGESTATUS_URL, {newStatus})
    return result
}

