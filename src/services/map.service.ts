import { MAPLINK } from "./../lib/endpoints"
import APIService from "./api.service"

class MapService extends APIService {
  getPath(data: any): Promise<any> {
    return this.get(MAPLINK(data))
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }
}
export default MapService
