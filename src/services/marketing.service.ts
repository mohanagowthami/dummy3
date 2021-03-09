import { TRENDS } from "../lib/endpoints"
import APIService from "./api.service"

class MarketingService extends APIService {
  getTrendingList(): Promise<any> {
    return this.get(TRENDS)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }
}
export default MarketingService
