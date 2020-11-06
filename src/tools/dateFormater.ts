
export const dateFormater = (dateStr: string): string => {
    var dateParts = dateStr.split("-");
    console.log("dateFormater -> dateParts", dateParts)
    return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`
} 