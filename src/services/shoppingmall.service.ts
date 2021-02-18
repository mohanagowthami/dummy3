// endpoints
import {
  FAVORITE_SHOPPINGMALL,
  GET_SPECIFIC_LISTING,
  HALL_OF_FAME_CATEGORY,
  RECAP_CATEGORY,
  SEARCH,
} from "./../lib/endpoints"
// services
import APIService from "./api.service"

class ShoppingMallService extends APIService {
  getCurrentUserLocationBasedData(page?: number): Promise<any> {
    return this.get(FAVORITE_SHOPPINGMALL((page = 1)))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  getSpecificShoppingMall(id: number): Promise<any> {
    return this.get(GET_SPECIFIC_LISTING(id))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getHallOfFame(): Promise<any> {
    return this.get(HALL_OF_FAME_CATEGORY("shopping"))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getRecap(): Promise<any> {
    return this.get(RECAP_CATEGORY("shopping"))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  search(searchText: string, page: number): Promise<any> {
    return this.get(SEARCH("shopping", searchText, page))
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
      this.getHallOfFame(),
      this.getRecap(),
    ])
      .then((values) => values)
      .catch((error: any) => {
        throw error.response.data
      })
  }
}
export default ShoppingMallService
