import * as type from '../types/movie.types'
import { MovieInterface } from "../../interfaces/movie/movie.interface"

export function getMovie(page: number, query: string): type.MovieActionTypes {
    return {
        type: type.GET_MOVIE_SEARCH_REQUESTED,
        page: page,
        query: query
    }
}

export function getMovieDetail(id: number): type.MovieActionTypes {
    return {
        type: type.GET_MOVIE_DETAIL_REQUESTED,
        id: id
    }
}

export function toggleFavorite(arr: number[] , movie: MovieInterface): type.ToggleFavoriteMovie {
    return {
        type: type.TOGGLE_FAVORITE_MOVIE,
        movie: movie,
        array: arr

    }
}

export function getFavorite(): type.GetFavoriteMovie {
    return {
        type: type.GET_FAVORITE_MOVIE,
    }
}