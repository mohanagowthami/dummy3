// services
import APIService from "./api.service"
// endpoints
import { PLANNER, SEARCH_USER_PLANS } from "../lib/endpoints"

class PlannerService extends APIService {
    getUserPlannerData(): Promise<any> {
        return this.get(PLANNER)
            .then((response: any) => {
                return response.data
            })
            .catch((error: any) => {
                throw error.response.data
            })
    }
    updateUserPlannerData(data: any): Promise<any> {
        return this.post(PLANNER, data)
            .then((response: any) => {
                return response.data
            })
            .catch((error: any) => {
                throw error.response.data
            })
    }
    searchCurrentUserPlannerData(date: string): Promise<any> {
        console.log(SEARCH_USER_PLANS(date), "search with res")
        return this.get(SEARCH_USER_PLANS(date))
            .then((response: any) => {
                return response.data
            })
            .catch((error: any) => {
                throw error.response.data
            })
    }
}
export default PlannerService
