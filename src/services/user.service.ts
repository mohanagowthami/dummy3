import APIService from './api.service'

import AsyncStorage from '@react-native-async-storage/async-storage'

//TODO: Add url in endpoints
class UserService extends APIService {
    // Getting access token
    async getAccessToken(): Promise<any> {
        try {
            const value = await AsyncStorage.getItem('accessToken')
            if (value !== null) {
                return value
            }
        } catch (e) {
            return e
        }
    }

    // Getting refresh token
    async getRefreshToken(): Promise<any> {
        try {
            const value = await AsyncStorage.getItem('refreshToken')
            if (value !== null) {
                return value
            }
        } catch (e) {
            return e
        }
    }
}

export default UserService
