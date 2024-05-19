import { CHANGELOGIN_URL, CHANGEPASSWORD_URL, LOGIN_URL, LOGOUT_URL, REFRESH_URL, REGISTRATION_URL, SEARCHUSER_URL, USERDATA_URL } from "../utils/consts";
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

