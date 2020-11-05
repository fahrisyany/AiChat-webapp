import { call, all, put, takeEvery } from 'redux-saga/effects'
import * as type from '../types/movie.types'
import { environment } from '../../environments/environments'
import { ResultRequestInterface } from "../../interfaces/resultRequest.interface"
import { MovieInterface } from "../../interfaces/movie/movie.interface"

const apiUrl = environment.endpoints.movieDB.baseUrl
const apiKey = environment.endpoints.movieDB.apiKey
const favoriteList = 'favorite-list'
const favoriteDetail = 'favorite-'

///
function getApi(url: string) {
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }

    }).then(response => response.json())
        .catch((err => { throw err }))

    // https://api.themoviedb.org/3/movie/618355?api_key=9e6a20e4327dba49beb61851c2ead343&language=en-US

}

async function setLocalStorage(payload: { item: string, title: string }) {
    localStorage.setItem(payload.title, payload.item);
}

async function getLocalStorage(title: string) {
    return localStorage.getItem(title);
}

async function removeLocalStorage(title: string) {
    localStorage.removeItem(title);
}
///

function* fetchMovies(action: type.GetMovieSearchActionInterface) {
    try {
        const results: ResultRequestInterface = yield call(getApi, `${apiUrl}search/movie?${apiKey}&language=en-US&page=${action.page}&include_adult=false&query=${action.query}`)
        yield put({ type: type.GET_MOVIE_SEARCH_SUCCESS, movies: results.results, page: results.page, totalPage: results.total_pages, total_results: results.total_results })
    }
    catch (e) {
        yield put({ type: type.GET_MOVIE_SEARCH_FAILED, message: e.message })
    }
}
function* fetchMovieDetail(action: type.GetMovieDetailActionInterface) {
    try {
        const { movieDetail, movieCredits } = yield all({
            movieDetail: call(getApi, `${apiUrl}movie/${action.id}?${apiKey}&language=en-US`),
            movieCredits: call(getApi, `${apiUrl}movie/${action.id}/credits?${apiKey}&language=en-US`),
        })
        yield put({ type: type.GET_MOVIE_DETAIL_SUCCESS, movieDetail: movieDetail, movieCredits: movieCredits })

    }
    catch (e) {
        yield put({ type: type.GET_MOVIE_DETAIL_FAILED, message: e.message })
    }
}

function* setFavoriteMovie(action: type.ToggleFavoriteMovie) {

    try {
        yield call(setLocalStorage, { item: JSON.stringify(action.array), title: favoriteList });
        const storage = yield call(getLocalStorage, `favorite-${action.movie.id}`)
        if (!storage) {
            yield call(setLocalStorage, { item: JSON.stringify(action.movie), title: `${favoriteDetail}${action.movie.id}` });
        } else {
            yield call(removeLocalStorage, `${favoriteDetail}${action.movie.id}`);
        }
    } catch (e) {
    }
}

function* getFavoriteMovie() {

    try {
        let favList: MovieInterface[] = []
        const storage = yield call(getLocalStorage, favoriteList)
        const storageArr = JSON.parse(storage || [])
        for (let i = 0; i < storageArr.length; i++) {
            const favItem = yield call(getLocalStorage, `${favoriteDetail}${storageArr[i]}`)
            favList[i] = JSON.parse(favItem)
        }
        yield put({ type: type.GET_FAVORITE_MOVIE_SUCCESS, favorites: JSON.parse(storage || []), favoritesDetails: favList })
    } catch (e) {
    }
}

function* movieSaga() {
    yield takeEvery(type.GET_MOVIE_SEARCH_REQUESTED, fetchMovies)
    yield takeEvery(type.GET_MOVIE_DETAIL_REQUESTED, fetchMovieDetail)
    yield takeEvery(type.TOGGLE_FAVORITE_MOVIE, setFavoriteMovie)
    yield takeEvery(type.GET_FAVORITE_MOVIE, getFavoriteMovie)
}

export default movieSaga