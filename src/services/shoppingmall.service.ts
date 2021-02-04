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
  getCurrentUserLocationBasedShoppingMalls(): Promise<any> {
    return this.get(FAVORITE_SHOPPINGMALL)
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

  getShoppingMallsHallOfFame(): Promise<any> {
    return this.get(HALL_OF_FAME_CATEGORY("shopping"))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getShoppingMallsRecap(): Promise<any> {
    return this.get(RECAP_CATEGORY("shopping"))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  search(searchText: string): Promise<any> {
    return this.get(SEARCH("shopping", searchText))
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  getDataFromServer(): Promise<any> {
    return Promise.all([
      this.getCurrentUserLocationBasedShoppingMalls(),
      this.getShoppingMallsHallOfFame(),
      this.getShoppingMallsRecap(),
    ])
      .then((values) => values)
      .catch((error: any) => {
        throw error.response.data
      })
  }
}
export default ShoppingMallService
