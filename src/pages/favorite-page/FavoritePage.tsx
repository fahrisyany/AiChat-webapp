import React, { useEffect } from 'react'
import '../favorite-page/FavoriteMovie.scss'
import CardCustom from '../../components/cardCustom/CardCustom'
import { RootState } from '../../redux/reducers';
import { MovieState } from '../../interfaces/movie/movie-state.interface';
import { MovieInterface } from '../../interfaces/movie/movie.interface';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorite, toggleFavorite } from '../../redux/actions/movie';
import ModalCustom from '../../components/modalCustom/ModalCustom'
import { useLocation } from "react-router-dom"


const FavoritePage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const { favorites, favoritesDetails }: MovieState = useSelector((state: RootState) => state.movieReducer) || '';

    const handleFavorite = (movie: MovieInterface): void => {
        dispatch(toggleFavorite(movie))
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
                    <CardCustom movie={movie} key={movie.id} handleFavorite={handleFavorite} favorites={favorites} pathname={location.pathname} />
                )}
            </div>
        </div>);
}

export default FavoritePage