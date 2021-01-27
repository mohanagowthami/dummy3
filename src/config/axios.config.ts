import axios from 'axios'
// endpoints
import { BACKEND_API } from '../lib/endpoints'
// services
import UserService from '../services/user.service'

axios.defaults.baseURL = BACKEND_API
const userService = new UserService()

;(function () {
    const token = userService.getAccessToken()
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        axios.defaults.headers.common.Authorization = ''
    }
})()
