// endpoints
import {
  LOGIN,
  SIGN_UP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "./../lib/endpoints"
// axios
import axios from "axios"
// service
import APIService from "./api.service"

class AuthService extends APIService {
  // TODO: Validate Incoming service data with an interface
  // TODO: Validate Outgoing data with an interface
  logIn(data = {}): Promise<any> {
    return this.post(LOGIN, data)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }

  register(data = {}): Promise<any> {
    return this.post(SIGN_UP, data)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }

  authenticateUser(accessToken: string, refreshToken?: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    if (accessToken) this.setAccessToken(accessToken)
    if (refreshToken) this.setRefreshToken(refreshToken)
  }

  logOut(): void {}

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

export default AuthService
