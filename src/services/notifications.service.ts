import { PUSH_NOTIFICATIONS } from "../lib/endpoints"
import APIService from "./api.service"

class NotificationsService extends APIService {
  pushToken(data = {}): Promise<any> {
    return this.post(PUSH_NOTIFICATIONS, data)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
}

export default NotificationsService
