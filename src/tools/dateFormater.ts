
export const dateFormater = (dateStr: string): string => {
    var dateParts = dateStr.split("-");
    return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`
} 