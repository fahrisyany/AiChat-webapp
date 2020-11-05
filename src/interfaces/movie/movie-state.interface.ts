import { MovieInterface, MovieDetailInterface, MovieCreditsInterface } from '../movie/movie.interface'


export interface MovieState {
    movies: MovieInterface[],
    loading: boolean,
    error?: string,
    page?: number,
    totalPage?: number,
    totalResult?: number,
    favorites: number[],
    favoritesDetails: MovieInterface[],
    movieDetail?: MovieDetailInterface,
    movieCredits?: MovieCreditsInterface
}