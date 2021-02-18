import { MEDIA } from "../lib/endpoints"
import APIService from "./api.service"

class MediaService extends APIService {
  uploadMedia(data: any): Promise<any> {
    return this.post(MEDIA, data)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }

  getMedia(): Promise<any> {
    return this.get(MEDIA)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }
  deleteMedia(data: any): Promise<any> {
    return this.get(MEDIA)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }
}

export default MediaService
