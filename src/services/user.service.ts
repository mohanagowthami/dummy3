import APIService from './api.service'

import AsyncStorage from '@react-native-async-storage/async-storage'

//TODO: Add url in endpoints
class UserService extends APIService {
    // Getting access token
    async getAccessToken(): Promise<any> {
        return await AsyncStorage.getItem('accessToken')
    }

    // Getting refresh token
    async getRefreshToken(): Promise<any> {
        return await AsyncStorage.getItem('refreshToken')
    }
}

export default UserService
