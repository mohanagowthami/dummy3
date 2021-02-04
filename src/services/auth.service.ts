// endpoints
import { LOGIN, SIGN_UP } from "./../lib/endpoints"
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

  authenticateUser(accessToken: string, refreshToken: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    this.setAccessToken(accessToken)
    this.setRefreshToken(refreshToken)
  }

  logOut(): void {}
}

export default AuthService
