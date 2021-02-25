// service
import { FEEDBACK } from "../lib/endpoints"
import APIService from "./api.service"

class FeedbackService extends APIService {
  // TODO: Validate Incoming service data with an interface
  // TODO: Validate Outgoing data with an interface
  submitFeedback(data = {}): Promise<any> {
    return this.post(FEEDBACK, data)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error.response.data
      })
  }
}
export default FeedbackService
