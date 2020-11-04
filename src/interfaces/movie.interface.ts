
export interface MovieInterface {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path?: string | null;
    original_language: string;
    original_title: string;
    genre_ids?: (number)[] | null;
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}
