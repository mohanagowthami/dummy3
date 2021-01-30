export const BACKEND_API = "https://frappy-crawler.herokuapp.com/"

export const FAVORITES = `${BACKEND_API}api/user/favorites/`

export const FAVORITE_RESTAURANTS = `${BACKEND_API}api/favorites/food/restaurants/`

export const FAVORITE_SHOPPINGMALL = `${BACKEND_API}api/favorites/shopping/malls/`
export const FAVORITE_TRAVELPLACES = `${BACKEND_API}api/favorites/travel/places/`

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

export const GET_SPECIFIC_RESTAURANT = (id: number) =>
    `${BACKEND_API}api/restaurants/${id}/`

export const CATEGORY_LEVEL_REVIEW = `${BACKEND_API}api/review/`
