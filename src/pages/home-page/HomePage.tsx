import React, { useCallback, useEffect, useState } from 'react'
import './HomePage.scss';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import illus1 from '../../images/movie-illustrations/movie-illus-1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, toggleFavorite } from '../../redux/actions/movie'
import _ from "lodash";
import { RootState } from '../../redux/reducers'
import { MovieInterface } from "../../interfaces/movie.interface"
import CardCustom from '../../components/cardCustom/CardCustom'

const HomePage: React.FC = ({ }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState([] as Array<number>)
    const [debouncedState, setDebouncedState] = useState("");
    const movies: MovieInterface[] = useSelector((state: RootState) => state.movieReducer.movies) || [];
    const loading: boolean = useSelector((state: RootState) => state.movieReducer.loading);
    const error: string = useSelector((state: RootState) => state.movieReducer.error) || '';
    const getArray = JSON.parse(localStorage.getItem('favorites-list') || '0')

    const handleChange = (text: string): void => {
        setQuery(text)
        debounce(text)
    }

    const handleFavorite = (movie: MovieInterface) => {
        let arr = favorites;
        let addArr =  true
        arr.map((item: any) => {
            if (item === movie.id) {
                _.pull(arr, movie.id)
                setFavorites([...arr])
                addArr =  false
            }
        })
        if(addArr){
            arr.push(movie.id)
        }
        dispatch(toggleFavorite([...arr],movie))
    }

    const debounce = useCallback(
        _.debounce((_searchVal: string) => {
            if (_searchVal.length > 0) {
                setDebouncedState(_searchVal);
                dispatch(getMovie(page, _searchVal))
            }
        }, 600),
        []
    );

    useEffect(() => {
        if (getArray !== 0) {
            setFavorites([...getArray])
        }
    }, [])

    return (
        <div className='home-page'>
            <div className='hero d-flex'>
                <div className="d-flex flex-column justify-content-center">
                    <h1 className='hero-txt'> Discover movies, series and more</h1>
                    <p className='hero-subtxt'>Discover your favorites shows easily and quickly in one place with Tout Regarder.</p>
                    <div className="d-flex flex-row">
                        <InputGroup className="mb-3 search-bar">
                            <FormControl
                                placeholder="Search movie"
                                aria-label="Search movie"
                                aria-describedby="basic-addon2"
                                onChange={e => handleChange(e.target.value)}
                                value={query}
                            />
                        </InputGroup>
                        <Button className='cta-button'><b>My Favorites</b></Button>
                    </div>
                </div>
                <img src={illus1} alt="movie-poster" />
            </div>

            <div className='card-ctnr d-flex flex-wrap '>
                {loading && <p>Loading data</p>}
                {movies.length > 0 && movies.map((movie) =>
                    <CardCustom movie={movie} key={movie.id} handleFavorite={handleFavorite} favorites={favorites} />
                )}
                {error && !loading && <p>Error Fetching Data</p>}
            </div>
        </div>
    );
}

export default HomePage