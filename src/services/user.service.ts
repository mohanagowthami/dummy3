// endpoints
import { FAVORITES, GET_USER, USER_CURRENT_LOCATION } from "./../lib/endpoints"
// service
import APIService from "./api.service"
//  async storage
import AsyncStorage from "@react-native-async-storage/async-storage"

class UserService extends APIService {
  // Getting access token
  async getAccessToken(): Promise<any> {
    try {
      const value = await AsyncStorage.getItem("accessToken")
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
      const value = await AsyncStorage.getItem("refreshToken")
      if (value !== null) {
        return value
      }
    } catch (e) {
      return e
    }
  }

  updateUserCurrentLocation(data: any): Promise<any> {
    return this.post(USER_CURRENT_LOCATION, data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  updateUserFavorites(data: any): Promise<any> {
    return this.post(FAVORITES, data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getUser(): Promise<any> {
    return this.get(GET_USER)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
}

export default UserService
