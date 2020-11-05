import React, { useCallback, useEffect, useState } from 'react'
import { MovieInterface } from "../../interfaces/movie/movie.interface"
import Card from 'react-bootstrap/Card';
import "./CardCustom.scss"
import { FavoriteButton } from "../favoriteButon/FavoriteButton"
import { useDispatch } from 'react-redux';
import { toggleToast, toggleModal } from '../../redux/actions/user-interface';
import { getMovieDetail } from '../../redux/actions/movie';

interface CardProps {
    movie: MovieInterface;
    handleFavorite: (movie: MovieInterface) => void;
    favorites: number[];
};

const CardCustom: React.FC<CardProps> = (props: CardProps) => {
    const [isFavorite, setIsFavorite] = useState(true)
    const dispatch = useDispatch();
    const toastTextSuccess: string = 'Added to Favorites'
    const toastTextFailed: string = 'Removed from Favorites'

    const handleFavoriteButton = (): void => {
        props.handleFavorite(props.movie)
        handleIconState()
        handleToast()
    }

    const handleToast = (): void => {
        dispatch(toggleToast(true, handleIsFavorite() ? toastTextSuccess : toastTextFailed))
    }
    const handleModal = (): void => {
        dispatch(toggleModal(true))
        dispatch(getMovieDetail(props.movie.id))
    }

    const handleIsFavorite = useCallback((): boolean => {
        return props.movie.id && props.favorites.includes(props.movie.id) ? true : false
    }, [props.movie.id, props.favorites])

    const handleIconState = useCallback((): void => {
        handleIsFavorite() ? setIsFavorite(true) : setIsFavorite(false)
    }, [handleIsFavorite])

    useEffect(() => {
        handleIconState()
    }, [handleIconState]);

    const addDefaultSrc = (ev: any): void => {
        ev.target.src = `https://via.placeholder.com/190x285?text=No+Poster+Available`
    }

    return (
        <Card className='animate__animated  animate__fadeInUpBig' >
            <Card.Img loading="lazy" variant="top" onError={addDefaultSrc} src={`http://image.tmdb.org/t/p/w185/${props.movie.poster_path}`} onClick={handleModal} />
            <Card.Body className='d-flex flex-column justify-content-between'>
                <div className="fav-btn" onClick={handleFavoriteButton}>
                    <FavoriteButton isFavorite={isFavorite} />
                </div>
                <Card.Text>
                    Release Date: {props.movie.release_date}
                </Card.Text>
                <Card.Title>{props.movie.title}</Card.Title>
                <Card.Text >
                    Movie ID: {props.movie.id}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardCustom