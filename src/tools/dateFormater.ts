
export const dateFormater = (dateStr: string): string => {
    var dateParts = dateStr.split("-");
    if (dateStr) {
        return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`
    } else { return '' }
} 