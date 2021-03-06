import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { MovieInterface } from "../../interfaces/movie/movie.interface"
import Card from 'react-bootstrap/Card';
import "./CardCustom.scss"
import { FavoriteButton } from "../favoriteButon/FavoriteButton"
import { useDispatch } from 'react-redux';
import { toggleToast, toggleModal } from '../../redux/actions/user-interface';
import { getMovieDetail } from '../../redux/actions/movie';
import { dateFormater } from '../../tools/dateFormater'

interface CardProps {
    movie: MovieInterface;
    handleFavorite: (movie: MovieInterface) => void;
    favorites: number[];
    pathname?:string
};

const CardCustom: React.FC<CardProps> = (props: CardProps) => {
    const [isFavorite, setIsFavorite] = useState(true)
    const dispatch = useDispatch();
    const toastTextSuccess: string = 'Added to Favorites'
    const toastTextFailed: string = 'Removed from Favorites'
    const dateFormated: string = dateFormater(props.movie.release_date)

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

    const addDefaultSrc = (ev: SyntheticEvent<HTMLImageElement, Event>): void => {
        ev.currentTarget.src = `https://via.placeholder.com/190x285?text=No+Poster+Available`
    }

    return (
        <Card className='animate__animated  animate__fadeInUpBig' >
            <Card.Img loading="lazy" variant="top" onError={addDefaultSrc} src={`http://image.tmdb.org/t/p/w185/${props.movie.poster_path}`} onClick={handleModal} />
            <Card.Body className='d-flex flex-column justify-content-between'>
                <div className="fav-btn" onClick={handleFavoriteButton}>
                    <FavoriteButton isFavorite={isFavorite} />
                </div>
                <Card.Text>
                    Release Date:  {dateFormated ? dateFormated : 'No date info available'}

                </Card.Text>
                <Card.Title>{props.movie.title}</Card.Title>
                <Card.Text>
                    {props.pathname === '/favorites' && (<span>Langguage :  {props.movie.original_language} </span>)}
                    {props.pathname === '/' && (<span>imDB ID :  {props.movie.id} </span>)}
                </Card.Text>


            </Card.Body>
        </Card>
    )
}

export default CardCustom