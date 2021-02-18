// endpoints
import { GET_REVIEWS, UPDATE_REVIEW } from "./../lib/endpoints"
// service
import APIService from "./api.service"

class ReviewService extends APIService {
  getReviews(id: string): Promise<any> {
    return this.get(GET_REVIEWS(id))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  updateReviews(data: any, customHeaders?: any): Promise<any> {
    return this.post(UPDATE_REVIEW, data, customHeaders)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
}
export default ReviewService
