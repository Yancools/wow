import axios from "axios"
import { SERVER_API } from "../utils/consts"
const $host = axios.create({
    withCredentials: true,
    baseURL: SERVER_API
})

const $authhost = axios.create({
    withCredentials: true,
    baseURL: SERVER_API
})

const authInterceptor = config => {
    const token = localStorage.getItem('Token')
    config.headers.authorization = `Bearer ${token}`
    return config
}

$authhost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authhost
}