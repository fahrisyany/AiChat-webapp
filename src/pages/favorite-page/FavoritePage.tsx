import React, { useEffect } from 'react'
import '../favorite-page/FavoriteMovie.scss'
import CardCustom from '../../components/cardCustom/CardCustom'
import { RootState } from '../../redux/reducers';
import { MovieState } from '../../interfaces/movie/movie-state.interface';
import { MovieInterface } from '../../interfaces/movie/movie.interface';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorite, toggleFavorite } from '../../redux/actions/movie';
import _ from "lodash";
import ModalCustom from '../../components/modalCustom/ModalCustom'


const FavoritePage: React.FC = () => {
    const dispatch = useDispatch();
    const { favorites, favoritesDetails }: MovieState = useSelector((state: RootState) => state.movieReducer) || '';

    const handleFavorite = (movie: MovieInterface): void => {
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
        dispatch(toggleFavorite([...arr], movie))
    }

    useEffect(() => {
        dispatch(getFavorite())
    }, [dispatch])

    return (
        <div className='favorite-page'>
            <ModalCustom />
            <h1> Your Favorite Movies : </h1>
            <div className='card-ctnr d-flex flex-wrap '>
                {favoritesDetails.length > 0 && favoritesDetails.map((movie) =>
                    <CardCustom movie={movie} key={movie.id} handleFavorite={handleFavorite} favorites={favorites} />
                )}
            </div>
        </div>);
}

export default FavoritePage