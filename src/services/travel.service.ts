// endpoints
import {
  GET_SPECIFIC_LISTING,
  HALL_OF_FAME_CATEGORY,
  RECAP_CATEGORY,
  SEARCH,
  FAVORITE_TRAVELPLACES,
} from "../lib/endpoints"
// service
import APIService from "./api.service"

class TravelService extends APIService {
  getCurrentUserLocationBasedData(): Promise<any> {
    return this.get(FAVORITE_TRAVELPLACES)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  getTravelPlace(id: number): Promise<any> {
    return this.get(GET_SPECIFIC_LISTING(id))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getTravelPlacesHallOfFame(): Promise<any> {
    return this.get(HALL_OF_FAME_CATEGORY("travel"))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getTravelPlacesRecap(): Promise<any> {
    return this.get(RECAP_CATEGORY("travel"))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  search(searchText: string): Promise<any> {
    return this.get(SEARCH("travel", searchText))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getDataFromServer(): Promise<any> {
    return Promise.all([
      this.getCurrentUserLocationBasedData(),
      this.getTravelPlacesHallOfFame(),
      this.getTravelPlacesRecap(),
    ])
      .then((values) => values)
      .catch((error: any) => {
        throw error.response.data
      })
  }
}
export default TravelService
