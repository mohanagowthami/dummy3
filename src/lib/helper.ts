export const getFormatedDate = (date: any) => {
  if (date) {
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
  }
  return ""
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
