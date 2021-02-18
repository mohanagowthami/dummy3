// axios
import axios, { AxiosPromise } from "axios"
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage"

abstract class APIService {
  //Passing bearer for all api calls
  async getAxiosHeaders(): Promise<any> {
    const token = await AsyncStorage.getItem("accessToken")
    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    }
  }

  // Setting access token
  async setAccessToken(value: string): Promise<any> {
    try {
      await AsyncStorage.setItem("accessToken", value)
    } catch (e) {}
  }

  // Setting refresh token
  async setRefreshToken(value: string): Promise<any> {
    try {
      await AsyncStorage.setItem("refreshToken", value)
    } catch (e) {}
  }

  // Axios get method
  async get(url: string): Promise<any> {
    return axios({
      method: "GET",
      url,
      headers: await this.getAxiosHeaders(),
    })
  }

  async post(url: string, data = {}, customHeaders?: any): Promise<any> {
    let headers = await this.getAxiosHeaders()

    return axios({
      method: "POST",
      url,
      data,
      headers: headers,
    })
  }

  async put(url: string, data = {}): Promise<any> {
    return axios({
      method: "PUT",
      url,
      data,
      headers: await this.getAxiosHeaders(),
    })
  }

  async delete(url: string): Promise<any> {
    return axios({
      method: "DELETE",
      url,
      headers: await this.getAxiosHeaders(),
    })
  }
}

export default APIService
