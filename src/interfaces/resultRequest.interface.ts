import {MovieInterface} from './movie/movie.interface'
export interface ResultRequestInterface {
    page: number;
    total_results: number;
    total_pages: number;
    results: (MovieInterface)[] | null;
}