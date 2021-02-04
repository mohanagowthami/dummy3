export const getFormatedDate = (date: any) => {
    if (date) {
        let day = date.getDate()
        day = day.toString()
        if (day.length === 1) day = `0${day}`

        const year = date.getFullYear()
        let month = date.getMonth()
        if (month.toString().length === 1) month = "0" + (month + 1)
        return `${year}-${month}-${day}`
    }
    return ""
}

export const deriveArrayFromString = (name: string) => {
    console.log(name, "name")
    if (typeof name === "string" && name !== "") {
        try {
            console.log("try")
            return JSON.parse(name.replace(/'/g, '"'))
        } catch (error) {
            console.log(error, "error")
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
