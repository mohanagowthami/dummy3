import { FACEBOOK_SIGNIN, GOOGLE_SIGNIN } from "./../lib/endpoints"
// axios
import axios, { AxiosPromise } from "axios"
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage"
import APIService from "./api.service"
import UserService from "./user.service"

const userService = new UserService()
class SocialLoginService extends APIService {
  googleSignIn(data: any): Promise<any> {
    return this.post(GOOGLE_SIGNIN, data)
      .then((response: any) => {
        console.log("response.data.accessToken", response.data.accessToken)
        this.setAccessToken(response.data.accessToken).then(() => {
          return "successfullY google signin"
        })
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  facebookSignIn(data: any): Promise<any> {
    return this.post(FACEBOOK_SIGNIN, data)
      .then((response: any) => {
        console.log("(response.data.accessToken", response.data.accessToken)
        this.setAccessToken(response.data.accessToken).then(() => {
          return "successfullY facebook signin"
        })
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
}

export default SocialLoginService
