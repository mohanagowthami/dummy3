// services
import APIService from './api.service'

class RestaurantService extends APIService {
    pusher(url: string, data: any): Promise<any> {
        return this.post(url, data)
            .then((response: any) => {
                return response.data
            })
            .catch((error: any) => {
                throw error.response.data
            })
    }
}
export default RestaurantService
