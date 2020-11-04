import React, { useEffect, useState } from 'react'
import { MovieInterface } from "../../interfaces/movie.interface"
import Card from 'react-bootstrap/Card';
import "./CardCustom.scss"
import illus1 from '../../images/movie-illustrations/movie-illus-1.jpg'
import { FavoriteButton } from "../favoriteButon/FavoriteButton"
import _ from "lodash";

interface CardProps {
    movie: MovieInterface;
    handleFavorite: (movie: MovieInterface) => void;
    favorites: Array<number>;
};

const CardCustom: React.FC<CardProps> = (props: CardProps) => {
    const [isFavorite, setIsFavorite] = useState(true)

    const handleIconState = (): void => {
        if (props.movie.id && props.favorites.includes(props.movie.id)) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }

    const handleFavoriteButton = (): void => {
        props.handleFavorite(props.movie)
        handleIconState()

    }

    useEffect(() => {
        handleIconState()
    }, []);

    const addDefaultSrc = (ev: any): void => {
        ev.target.src = illus1
    }

    return (
        <Card >
            <Card.Img variant="top" onError={addDefaultSrc} src={`http://image.tmdb.org/t/p/w185/${props.movie.poster_path}`} />
            <Card.Body>
                <div className="fav-btn" onClick={handleFavoriteButton}>
                    <FavoriteButton isFavorite={isFavorite} />
                </div>
                <Card.Text>
                    {props.movie.release_date}
                </Card.Text>
                <Card.Title>{props.movie.title}</Card.Title>
                <Card.Text >
                    {props.movie.id}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardCustom