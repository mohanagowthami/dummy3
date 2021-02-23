// endpoints
import {
  DISLIKE,
  FAVORITES,
  GET_USER,
  LIKE,
  USER_CURRENT_LOCATION,
  PROFILE_PIC,
  UPDATE_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "./../lib/endpoints"
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
  async setAccessToken(): Promise<any> {
    return this.removeAccessToken().then((response) => {
      return response
    })
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
  likeListing(data: any): Promise<any> {
    return this.post(LIKE, data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  disLikeListing(data: any): Promise<any> {
    return this.post(DISLIKE, data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  updateUser(data: any): Promise<any> {
    return this.put(UPDATE_USER(data.userId), data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  updateUserPic(id: number, data: any): Promise<any> {
    return this.put(PROFILE_PIC(id), data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  forgotPassword(data: any): Promise<any> {
    return this.post(FORGOT_PASSWORD, data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  resetPassword(data: any): Promise<any> {
    return this.post(RESET_PASSWORD, data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
}

export default UserService
