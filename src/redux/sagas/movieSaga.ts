import { call, all, put, takeEvery } from 'redux-saga/effects'
import * as type from '../types/movie.types'
import { environment } from '../../environments/environments'
import { ResultRequestInterface } from "../../interfaces/resultRequest.interface"
import { MovieInterface } from "../../interfaces/movie/movie.interface"
import { get } from "../../services/api-handler/index"
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "../../tools/localStorage"
import _ from "lodash";
import { select } from 'redux-saga/effects';
import { RootState } from '../reducers'

const apiUrl = environment.endpoints.movieDB.baseUrl
const apiKey = environment.endpoints.movieDB.apiKey
const favoriteList = 'favorite-list'
const favoriteDetail = 'favorite-'

function* fetchMovies(action: type.GetMovieSearchActionInterface) {
    try {
        const results: ResultRequestInterface = yield call(get, `${apiUrl}search/movie?${apiKey}&language=en-US&page=${action.page}&include_adult=false&query=${action.query}`)
        yield put({ type: type.GET_MOVIE_SEARCH_SUCCESS, movies: results.results, page: results.page, totalPage: results.total_pages, total_results: results.total_results })
    }
    catch (e) {
        yield put({ type: type.GET_MOVIE_SEARCH_FAILED, message: e.message })
    }
}
function* fetchMovieDetail(action: type.GetMovieDetailActionInterface) {
    try {
        const { movieDetail, movieCredits } = yield all({
            movieDetail: call(get, `${apiUrl}movie/${action.id}?${apiKey}&language=en-US`),
            movieCredits: call(get, `${apiUrl}movie/${action.id}/credits?${apiKey}&language=en-US`),
        })
        yield put({ type: type.GET_MOVIE_DETAIL_SUCCESS, movieDetail: movieDetail, movieCredits: movieCredits })
    }
    catch (e) {
        yield put({ type: type.GET_MOVIE_DETAIL_FAILED, message: e.message })
    }
}

function* setFavoriteMovie(action: type.ToggleFavoriteMovie) {
    const { movie } = action
    const favorites: number[] = yield select((state: RootState) => state.movieReducer.favorites) || [];
    try {
        const storage = yield call(getLocalStorage, `favorite-${movie.id}`)
        let arr = favorites;
        let addArr = true
        arr.forEach((item: any) => {
            if (item === movie.id) {
                _.pull(arr, movie.id)
                addArr = false
            }
        })
        if (addArr) {
            arr.push(movie.id)
        }
        yield call(setLocalStorage, { item: JSON.stringify(arr), title: favoriteList });
        if (!storage) {
            yield call(setLocalStorage, { item: JSON.stringify(movie), title: `${favoriteDetail}${movie.id}` });
        } else {
            yield call(removeLocalStorage, `${favoriteDetail}${movie.id}`);
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