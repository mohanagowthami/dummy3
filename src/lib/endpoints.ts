import { APIKEY, mode } from "./content"

export const BACKEND_API = "https://frappy-crawler.herokuapp.com/"

export const FAVORITES = `${BACKEND_API}api/user/favorites/`

export const FAVORITE_RESTAURANTS = (page: number = 1) =>
  `${BACKEND_API}api/favorites/food/listings/?page=${page}`

export const FAVORITE_SHOPPINGMALL = (page: number = 1) =>
  `${BACKEND_API}api/favorites/shopping/listings/?page=${page}`
export const FAVORITE_TRAVELPLACES = (page: number = 1) =>
  `${BACKEND_API}api/favorites/travel/listings/?page=${page}`

export const REVIEWS_SPECIFIC_RESTAURANTS = (id: number) =>
  `${BACKEND_API}api/restaurant/reviews/?restaurant=${id}`

export const LOGIN = `${BACKEND_API}api/token/`

export const SIGN_UP = `${BACKEND_API}api/users/`

export const LOGOUT = `${BACKEND_API}api/logout/`

export const USER_CURRENT_LOCATION = `${BACKEND_API}api/location/`

export const HALL_OF_FAME_CATEGORY = (category: string) =>
  `${BACKEND_API}api/user/hall-of-fame/?category=${category}`

export const RECAP_CATEGORY = (category: string) =>
  `${BACKEND_API}api/recap/?category=${category}`

export const GET_SPECIFIC_LISTING = (id: number) =>
  `${BACKEND_API}api/listings/${id}/`

export const CATEGORY_LEVEL_REVIEW = `${BACKEND_API}api/review/`

export const PLANNER = `${BACKEND_API}api/planer/`

export const SEARCH_USER_PLANS = (date: string) =>
  `${BACKEND_API}api/search/plans/?date=${date}`

export const GET_REVIEWS = (id: string) =>
  `${BACKEND_API}api/listing/reviews/?listing=${id}`

export const UPDATE_REVIEW = `${BACKEND_API}api/review/`

export const SEARCH = (
  category: string,
  searchText: string,
  page: number = 1
) =>
  `${BACKEND_API}api/search/?establishment_category=${category}&search=${searchText}&page=${page}`

export const GET_USER = `${BACKEND_API}api/users/me/`

export const UNIVERSAL_SEARCH = (searchText: string, page: number = 1) =>
  `${BACKEND_API}api/universal/search/?search=${searchText}&page=${page}`

export const LIKE = `${BACKEND_API}api/listing/likes/`

export const DISLIKE = `${BACKEND_API}api/listing/dislikes/`

export const UPDATE_USER = (id: number) =>
  `${BACKEND_API}api/user/details/update/${id}/`

export const PROFILE_PIC = (id: number) =>
  `${BACKEND_API}api/profile/pic/update/${id}/`

export const MEDIA = `${BACKEND_API}api/assets/`

export const MAPLINK = ({ latitude, longitude, destination }: any) =>
  `https://maps.googleapis.com/maps/api/directions/json?origin=${latitude},${longitude}&destination=${destination}&key=${APIKEY}&mode=${mode}`

export const GOOGLE_SIGNIN = `${BACKEND_API}api/google/login/`
export const FACEBOOK_SIGNIN = `${BACKEND_API}api/facebook/login/`

export const FORGOT_PASSWORD = `${BACKEND_API}api/password/reset/`
export const RESET_PASSWORD = `${BACKEND_API}api/password/reset/confirm/`
