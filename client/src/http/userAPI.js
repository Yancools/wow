import { $host, $authhost } from "./index";
export const registration = async (login, password, firstname, lastname) => {
    try {
        const token = await $host.post('api/user/registration', {login, password, firstname, lastname})
        localStorage.setItem('Token', token.data)
        localStorage.setItem('userAuth', true)
    } catch (error) {
        alert(error.response?.data?.message)
    }
}

export const login = async (login, password) => {
    try {
        const token = await $host.post('api/user/login', {login, password})
        localStorage.setItem('Token', token.data) 
        localStorage.setItem('userAuth', true)  
    } catch (error) {
        alert(error.response?.data?.message)
    }
}
export const logout = async () => {
    try {
        await $host.post('api/user/logout', {withCredentials: true})
        localStorage.removeItem('Token')
        localStorage.removeItem('userAuth')
    } catch (error) {
        alert(error.response?.data?.message)
    }
}
export const checkAuth = async () =>{
    try {
        const token = await $host.get('api/user/refresh', {withCredentials: true})
        if(token) {
            localStorage.setItem('userAuth', true)
            localStorage.setItem('Token', token.data)
        }
        return token
    } catch (error) {
        alert(error.response?.data?.message)
    }
}
export const userData = async () => {
    const {data} = await $authhost.get('api/user/data')
    return data
}