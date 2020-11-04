import { MovieInterface } from "../../interfaces/movie.interface"

export const GET_MOVIE_SEARCH_REQUESTED = 'GET_MOVIE_SEARCH_REQUESTED'
export const GET_MOVIE_SEARCH_SUCCESS = 'GET_MOVIE_SEARCH_SUCCESS'
export const GET_MOVIE_SEARCH_FAILED = 'GET_MOVIE_SEARCH_FAILED'

export const TOGGLE_FAVORITE_MOVIE = 'TOGGLE_FAVORITE_MOVIE'


export interface MovieState {
    movies: MovieInterface[] ,
    loading: boolean,
    error?: string,
    page?:number,
    totalPage?:number,
    totalResult?:number
}

export interface ToggleFavoriteMovie {
    type: typeof TOGGLE_FAVORITE_MOVIE,
    movie:MovieInterface,
    array:Array<number>
}

interface GetMovieSearchActionInterface {
    type: typeof GET_MOVIE_SEARCH_REQUESTED,
    page: number,
    query?: string
}
interface GetMovieSearchFailActionInterface {
    type: typeof GET_MOVIE_SEARCH_FAILED,
    message: string
}
interface GetMovieSearchSuccessActionInterface {
    type: typeof GET_MOVIE_SEARCH_SUCCESS,
    movies: MovieInterface[],
    loading: boolean,
    page:number,
    totalPage:number,
    totalResult:number
}

export type MovieSearchActionTypes = (GetMovieSearchActionInterface | GetMovieSearchFailActionInterface | GetMovieSearchSuccessActionInterface)
