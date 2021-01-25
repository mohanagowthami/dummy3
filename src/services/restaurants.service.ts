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
    fetcher(url: string): Promise<any> {
        return this.get(url)
            .then((response: any) => {
                return response.data
            })
            .catch((error: any) => {
                throw error.response.data
            })
    }
}
export default RestaurantService
