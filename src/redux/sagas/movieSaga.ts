import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../types/movie.types'
import { environment } from '../../environments/environments'
import { ResultRequestInterface } from "../../interfaces/resultRequest.interface"

const apiUrl = environment.endpoints.movieDB.baseUrl
const apiKey = environment.endpoints.movieDB.apiKey

///
function getApi(action: any) {

    return fetch(`${apiUrl}search/movie?${apiKey}&language=en-US&page=${action.page}&include_adult=false&query=${action.query}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }

    }).then(response => response.json())
        .catch((err => { throw err }))

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

function* fetchMovies(action: type.MovieSearchActionTypes) {
    try {
        const results: ResultRequestInterface = yield call(getApi, action)
        yield put({ type: type.GET_MOVIE_SEARCH_SUCCESS, movies: results.results, page: results.page, totalPage: results.total_pages, total_results: results.total_results })
    }
    catch (e) {
        yield put({ type: type.GET_MOVIE_SEARCH_FAILED, message: e.message })
    }
}

function* setFavoriteMovie(action: type.ToggleFavoriteMovie) {

    try {
        yield call(setLocalStorage, { item: JSON.stringify(action.array), title: 'favorites-list' });
        const storage = yield call(getLocalStorage, `favorite-${action.movie.id}`)
        console.log("function*setFavoriteMovie -> storage", storage)
        if (!storage) {
            yield call(setLocalStorage, { item: JSON.stringify(action.movie), title: `favorite-${action.movie.id}` });
        } else {
            yield call(removeLocalStorage, `favorite-${action.movie.id}`);
        }
    } catch (e) {

    }


}


function* movieSaga() {
    yield takeEvery(type.GET_MOVIE_SEARCH_REQUESTED, fetchMovies)
    yield takeEvery(type.TOGGLE_FAVORITE_MOVIE, setFavoriteMovie)
}

export default movieSaga