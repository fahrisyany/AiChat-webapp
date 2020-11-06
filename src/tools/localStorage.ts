


export const setLocalStorage = (payload: { item: string, title: string }) => {
    localStorage.setItem(payload.title, payload.item);
}

export const getLocalStorage = (title: string) => {
    return localStorage.getItem(title);
}

export const removeLocalStorage = (title: string) => {
    localStorage.removeItem(title);
}
