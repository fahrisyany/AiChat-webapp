import * as type from '../types/movie.types'
import { MovieInterface } from "../../interfaces/movie.interface"

export function getMovie(page: number, query: string): type.MovieSearchActionTypes {
    return {
        type: type.GET_MOVIE_SEARCH_REQUESTED,
        page: page,
        query: query
    }
}
export function toggleFavorite(arr: Array<number>, movie: MovieInterface): type.ToggleFavoriteMovie {
    return {
        type: type.TOGGLE_FAVORITE_MOVIE,
        movie: movie,
        array: arr

    }
}