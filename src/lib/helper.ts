export const getFormatedDate = (date: any) => {
    if (date) {
        const day = date.getDate()

        const year = date.getFullYear()
        let month = date.getMonth()
        if (month.toString().length === 1) month = "0" + (month + 1)
        return `${day}-${month}-${year}`
    }
    return ""
}

export const deriveArrayFromString = (name: string) => {
    if (typeof name === "string" && name !== "") {
        console.log(name, "name")
        return JSON.parse(name.replace(/'/g, '"'))
    } else if (name === "") {
        return []
    } else return []
}
