import { yupToFormErrors } from "formik"

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

export function getCurrentMonthArray(today = 1, day?: number) {
  const date = new Date()
  let calculatedArray = new Array(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  ).fill(0)

  return calculatedArray.map((ele, index) => {
    const computatedDay = day ? day : today ? date.getDate() : null

    if (index + 1 < date.getDate()) return -1
    else if (computatedDay !== null && index + 1 === computatedDay) return 1
    else return 0
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
      return `${parseInt(hoursArray[0]) - 1}:${hoursArray[1]} PM`
    } else {
      return `${hoursArray[0]}:${hoursArray[1]} AM`
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
    console.log(day, year, month, currentDay, currentMonth, currentYear)
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
  console.log(lat1, lon1, lat2, lon2, "latitudes")
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  // console.log(dLat, dLon, "dlat,dlong")
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  // console.log(d, "distance")
  return { distance: d.toFixed(2), time: (d / 60).toFixed(2) }
}

function deg2rad(deg: any) {
  return deg * (Math.PI / 180)
}
