// content
import {
  adventuresList,
  rectangleImageList,
  shoppingMallList,
  sightSeeingList,
  travellingList,
  worshipList,
} from "./content"
// constants
import Constants from "expo-constants"
// expo -notifications
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

export const getFormatedDate = (date: any) => {
  if (date && typeof date !== "string") {
    let day = date.getDate()
    day = day.toString()
    if (day.length === 1) day = `0${day}`

    const year = date.getFullYear()
    let month = date.getMonth()
    if (month < 9) month = "0" + (month + 1)
    else {
      month = month + 1
    }
    return `${year}-${month}-${day}`
  } else if (typeof date === "string") return date
  else return ""
}

export const deriveArrayFromString = (name: string) => {
  if (typeof name === "string" && name !== "") {
    try {
      return JSON.parse(name.replace(/'/g, '"'))
    } catch (error) {
      return []
    }
  } else if (name === "") {
    return []
  } else return []
}
export function decode(t?: any, e?: any) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    ;(a = null), (h = 0), (i = 0)
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5)
    while (a >= 32)
    ;(n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0)
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5)
    while (a >= 32)
    ;(o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c])
  }
  return (d = d.map(function (t) {
    return { latitude: t[0], longitude: t[1] }
  }))
}

export function getMonthArray(selectedDate?: string) {
  let calculatedArray: any
  let userSelectedDate: any
  let isCurrentDate: boolean
  if (selectedDate) {
    userSelectedDate = selectedDate
  } else {
    userSelectedDate = new Date()
    isCurrentDate = true
  }
  calculatedArray = new Array(
    new Date(
      userSelectedDate.getFullYear(),
      userSelectedDate.getMonth() + 1,
      0
    ).getDate()
  ).fill(0)
  return calculatedArray.map((ele: any, index: number) => {
    const nextDay = new Date(userSelectedDate)
    nextDay.setDate(index + 1)

    if (index + 1 === userSelectedDate.getDate()) {
      return {
        status: 1,
        date: nextDay,
      }
    } else if (index + 1 < userSelectedDate.getDate() && isCurrentDate)
      return {
        status: -1,
        date: nextDay,
      }
    else
      return {
        status: 0,
        date: nextDay,
      }
  })
}

export function convertToTweleveHoursFormat(
  hours: number | string,
  minutes?: number
) {
  if (typeof hours === "number") {
    if (hours > 12) {
      return `${hours - 12}:${minutes} PM`
    } else {
      return `${hours}:${minutes} AM`
    }
  } else {
    const hoursArray = hours.split(":")

    if (parseInt(hoursArray[0]) > 12) {
      const letModifiedHours = parseInt(hoursArray[0]) - 12
      let hrs: string = letModifiedHours.toString()

      hrs = hrs.length === 2 ? hrs : 0 + hrs
      return `${hrs}:${hoursArray[1]} PM`
    } else {
      const hrs = hoursArray[0].length === 2 ? hoursArray[0] : 0 + hoursArray[0]
      return `${hrs}:${hoursArray[1]} AM`
    }
  }
}

export function convertToTwentyFourHoursFormat(date: string) {
  if (date.includes("AM")) {
    return date
  } else {
    let dateArray = date.split(":")
    dateArray[0] = (parseInt(dateArray[0]) + 12).toString()
    return `${dateArray[0]}:${dateArray[1]}`
  }
}

export function getMonthInDetail(index: number) {
  const month = new Array(12)
  month[0] = "January"
  month[1] = "February"
  month[2] = "March"
  month[3] = "April"
  month[4] = "May"
  month[5] = "June"
  month[6] = "July"
  month[7] = "August"
  month[8] = "September"
  month[9] = "October"
  month[10] = "November"
  month[11] = "December"
  return month[index]
}

export const dateComparision = (date: any) => {
  if (typeof date !== "string") {
    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth()
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    if (day === currentDay && month === currentMonth && year === currentYear)
      return true
    else return false
  } else {
    return false
  }
}

export function getDistanceFromLatLon(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c

  const durationDetails = {
    distance: d.toFixed(2),
    time: (d.toFixed(2) / 60).toFixed(2),
  }
  let time: any = durationDetails.time.toString()
  time = time.split(".")
  const quotient = parseInt(time[1]) / 60
  const remainder = parseInt(time[1]) % 60
  let hours = quotient > 1 ? parseInt(time[0]) + Math.round(quotient) : time[0]

  hours = hours.toString()

  time = `${hours.slice(0, 2)} hours ${remainder} min`

  return { time: time, distance: `${Math.round(d / 1000)} kms` }
}

function deg2rad(deg: any) {
  return deg * (Math.PI / 180)
}

export const getRequireImage = (tag: string, category?: string) => {
  if (category === "food" || tag.includes("Restaurant"))
    return rectangleImageList[
      Math.floor(Math.random() * rectangleImageList.length)
    ]
  else {
    if (tag.includes("Sight seeing") || tag.includes("Beach"))
      return sightSeeingList[Math.floor(Math.random() * sightSeeingList.length)]
    else if (tag.includes("Worship") || tag.includes("temple"))
      return worshipList[Math.floor(Math.random() * worshipList.length)]
    else if (tag.includes("travel"))
      return adventuresList[Math.floor(Math.random() * adventuresList.length)]
    else if (category === "travel")
      return travellingList[Math.floor(Math.random() * travellingList.length)]
    else {
      return shoppingMallList[
        Math.floor(Math.random() * shoppingMallList.length)
      ]
    }
  }
}

// export async function registerForPushNotificationsAsync() {
//   let token
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync()
//     let finalStatus = existingStatus
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync()
//       finalStatus = status
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!")
//       return
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data
//   } else {
//     alert("Must use physical device for Push Notifications")
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     })
//   }

//   return token
// }
