
const headerConf = {
    headers: {
        'Content-type': 'application/json'
    }
}


export const get = (path: string) => {
    return new Promise((res, rej) => {
        return fetch(path, {
            method: "GET",
            headers: headerConf.headers

        }).then(response => res(response.json()))
            .catch((err => { rej(err) }))
    })
}