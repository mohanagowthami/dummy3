import { LIKE, UNIVERSAL_SEARCH } from "./../lib/endpoints"
// endpoints
import {
  FAVORITE_RESTAURANTS,
  GET_SPECIFIC_LISTING,
  HALL_OF_FAME_CATEGORY,
  RECAP_CATEGORY,
  SEARCH,
} from "./../lib/endpoints"
// services
import APIService from "./api.service"
import UserService from "./user.service"

const userService = new UserService()
class RestaurantService extends APIService {
  getCurrentUserLocationBasedData(page?: number): Promise<any> {
    return this.get(FAVORITE_RESTAURANTS(page))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  getRestaurant(id: number): Promise<any> {
    return this.get(GET_SPECIFIC_LISTING(id))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getHallOfFame(page?: number): Promise<any> {
    return this.get(HALL_OF_FAME_CATEGORY("food", page))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getRecap(page?: number): Promise<any> {
    const url = RECAP_CATEGORY("food", page)

    return this.get(url)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  search(searchText: string, page: number): Promise<any> {
    return this.get(SEARCH("food", searchText, page))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getRestaurantDataFromServer(): Promise<any> {
    return Promise.all([
      this.getCurrentUserLocationBasedData(),
      this.getHallOfFame(),
      this.getRecap(),
      userService.getUser(),
    ])
      .then((values) => values)
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getUniversalSearchData(searchText: string, page: number): Promise<any> {
    return this.get(UNIVERSAL_SEARCH(searchText, page))
      .then((response) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  updateListingLike(data: any): Promise<any> {
    return this.post(LIKE, data)
      .then((response) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
}
export default RestaurantService
