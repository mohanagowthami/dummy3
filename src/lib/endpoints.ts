export const BACKEND_API = "https://frappy-crawler.herokuapp.com/"

export const FAVORITES = `${BACKEND_API}api/user/favorites/`

export const FAVORITE_RESTAURANTS = `${BACKEND_API}api/favorites/food/listings/`

export const FAVORITE_SHOPPINGMALL = `${BACKEND_API}api/favorites/shopping/listings/`
export const FAVORITE_TRAVELPLACES = `${BACKEND_API}api/favorites/travel/listings/`

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

export const SEARCH = (category: string, searchText: string) =>
    `${BACKEND_API}api/search/?establishment_category=${category}&search=${searchText}`

export const GET_USER = `${BACKEND_API}api/users/me/`
