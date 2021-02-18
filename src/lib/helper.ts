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

export function getCurrentMonthArray(day?: number) {
  const date = new Date()
  let calculatedArray = new Array(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  ).fill(0)

  return calculatedArray.map((ele, index) => {
    const computatedDay = day ? day : date.getDate()

    if (index + 1 === computatedDay) return 1
    else return 0
  })
}

export function convertToTweleveHoursFormat(hours: number, minutes: number) {
  if (hours > 12) {
    return `${hours - 12}:${minutes} PM`
  } else {
    return `${hours}:${minutes} AM`
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
