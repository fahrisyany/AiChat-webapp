import { MovieInterface, MovieDetailInterface, MovieCreditsInterface } from "../../interfaces/movie/movie.interface"

export const GET_MOVIE_SEARCH_REQUESTED = 'GET_MOVIE_SEARCH_REQUESTED'
export const GET_MOVIE_SEARCH_SUCCESS = 'GET_MOVIE_SEARCH_SUCCESS'
export const GET_MOVIE_SEARCH_FAILED = 'GET_MOVIE_SEARCH_FAILED'

export const GET_MOVIE_DETAIL_REQUESTED = 'GET_MOVIE_DETAIL_REQUESTED'
export const GET_MOVIE_DETAIL_SUCCESS = 'GET_MOVIE_DETAIL_SUCCESS'
export const GET_MOVIE_DETAIL_FAILED = 'GET_MOVIE_DETAIL_FAILED'

export const TOGGLE_FAVORITE_MOVIE = 'TOGGLE_FAVORITE_MOVIE'
export const GET_FAVORITE_MOVIE = 'GET_FAVORITE_MOVIE'
export const GET_FAVORITE_MOVIE_SUCCESS = 'GET_FAVORITE_MOVIE_SUCCESS'

///
export interface ToggleFavoriteMovie {
    type: typeof TOGGLE_FAVORITE_MOVIE,
    movie: MovieInterface,
    array: number[]
}
export interface GetFavoriteMovie {
    type: typeof GET_FAVORITE_MOVIE,
}

export interface GetFavoriteMovieActionSuccess {
    type: typeof GET_FAVORITE_MOVIE_SUCCESS,
    favorites: number[],
    favoritesDetails: MovieInterface[]
}
///
export interface GetMovieSearchActionInterface {
    type: typeof GET_MOVIE_SEARCH_REQUESTED,
    page: number,
    query?: string
}
export interface GetMovieSearchFailActionInterface {
    type: typeof GET_MOVIE_SEARCH_FAILED,
    message: string
}
export interface GetMovieSearchSuccessActionInterface {
    type: typeof GET_MOVIE_SEARCH_SUCCESS,
    movies: MovieInterface[],
    loading: boolean,
    page: number,
    totalPage: number,
    totalResult: number
}
///
export interface GetMovieDetailActionInterface {
    type: typeof GET_MOVIE_DETAIL_REQUESTED,
    id: number,
}
export interface GetMovieDetailSuccessActionInterface {
    type: typeof GET_MOVIE_DETAIL_SUCCESS,
    movieDetail?: MovieDetailInterface,
    movieCredits?: MovieCreditsInterface,
    loading: boolean,
}
export interface GetMovieDetailFailActionInterface {
    type: typeof GET_MOVIE_DETAIL_FAILED,
    message: string
}
///
export type MovieActionTypes = (GetMovieSearchActionInterface | GetMovieSearchFailActionInterface | GetMovieSearchSuccessActionInterface | GetFavoriteMovieActionSuccess | GetMovieDetailActionInterface | GetMovieDetailFailActionInterface | GetMovieDetailSuccessActionInterface)

