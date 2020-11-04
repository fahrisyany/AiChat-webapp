export const environment = {
    production: false,
    baseUrl: '',
    isLoaded: false,
    configPath: '',
    useLocalUser: true,
    loadConfigFromFile: null,
    endpoints: {
        jsonPlaceholder: {
            baseUrl: 'https://jsonplaceholder.typicode.com/users',
        },
        movieDB: {
            baseUrl: 'https://api.themoviedb.org/3/',
            apiKey:'api_key=9e6a20e4327dba49beb61851c2ead343'
        },
    },
};
