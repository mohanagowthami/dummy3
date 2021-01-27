// axios
import axios, { AxiosPromise } from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

abstract class APIService {
    //Passing bearer for all api calls
    async getAxiosHeaders(): Promise<any> {
        const token = await AsyncStorage.getItem('accessToken')
        return {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        }
    }
    // Setting access token
    async setAccessToken(value: string): Promise<any> {
        await AsyncStorage.setItem('accessToken', value)
    }

    // Setting refresh token
    async setRefreshToken(value: string): Promise<any> {
        await AsyncStorage.setItem('refreshToken', value)
    }

    // Axios get method
    get(url: string): AxiosPromise<any> {
        return axios({ method: 'GET', url })
    }

    post(url: string, data = {}): AxiosPromise<any> {
        return axios({
            method: 'POST',
            url,
            data,
            headers: this.getAxiosHeaders(),
        })
    }

    put(url: string, data = {}): AxiosPromise<any> {
        return axios({
            method: 'PUT',
            url,
            data,
            headers: this.getAxiosHeaders(),
        })
    }

    delete(url: string): AxiosPromise<any> {
        return axios({
            method: 'DELETE',
            url,
            headers: this.getAxiosHeaders(),
        })
    }
}

export default APIService
