import { FACEBOOK_SIGNIN, GOOGLE_SIGNIN } from "./../lib/endpoints"
// axios
import axios, { AxiosPromise } from "axios"
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage"
import APIService from "./api.service"
import UserService from "./user.service"

const userService = new UserService()
class SocialLoginService extends APIService {
  async googleSignIn(data: any): Promise<any> {
    try {
      const response = await this.post(GOOGLE_SIGNIN, data)
      await this.setAccessToken(response.data.access)
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
  async facebookSignIn(data: any): Promise<any> {
    try {
      const response = await this.post(FACEBOOK_SIGNIN, data)
      await this.setAccessToken(response.data.access)
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}

export default SocialLoginService
