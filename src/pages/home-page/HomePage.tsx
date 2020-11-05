import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import './HomePage.scss';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import illus1 from '../../images/movie-illustrations/movie-illus-1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, toggleFavorite, getFavorite } from '../../redux/actions/movie'
import { RootState } from '../../redux/reducers'
import { MovieInterface } from "../../interfaces/movie/movie.interface"
import CardCustom from '../../components/cardCustom/CardCustom'
import { MovieState } from "../../interfaces/movie/movie-state.interface"
import _ from "lodash";
import { Link } from "react-router-dom";
const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [page] = useState(1);
    const [debouncedState, setDebouncedState] = useState("");
    const { movies, favorites, loading, error }: MovieState = useSelector((state: RootState) => state.movieReducer) || '';

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setQuery(e.target.value)
        debounce(e.target.value)
    }

    const handleFavorite = (movie: MovieInterface): void => {
        let arr = favorites;
        let addArr = true
        arr.map((item: any):any => {    
            if (item === movie.id) {
                _.pull(arr, movie.id)
                addArr = false
                return null
            }
        })
        if (addArr) {
            arr.push(movie.id)
        }
        dispatch(toggleFavorite([...arr], movie))
    }

    const debounce = useCallback(
        _.debounce((_searchVal: string) => {
            if (_searchVal.length > 0) {
                setDebouncedState(_searchVal);
                console.log(debouncedState);
                dispatch(getMovie(page, _searchVal))
            }
        }, 600),
        []
    );

    useEffect(() => {
        dispatch(getFavorite())
    }, [dispatch])

    return (
        <div className='home-page'>
            <div className='hero d-flex'>
                <div className="d-flex flex-column justify-content-center">
                    <h1 className='hero-txt'> Discover movies, series and more</h1>
                    <p className='hero-subtxt'>Discover your favorites shows easily and quickly in one place.</p>
                    <div className="d-flex flex-row">
                        <InputGroup className="mb-3 search-bar">
                            <FormControl
                                placeholder="Search movie"
                                aria-label="Search movie"
                                aria-describedby="basic-addon2"
                                onChange={handleChange}
                                value={query}
                            />
                        </InputGroup>
                        <Link to="/favorites">
                            <Button className='cta-button'><b>My Favorites</b></Button>
                        </Link>
                    </div>
                </div>
                <img className='animate__animated animate__fadeInRight'  src={illus1} alt="movie-poster" />
            </div>

            <div className='card-ctnr d-flex flex-wrap '>
                {/* {loading && <p>Loading data</p>} */}
                {movies.length > 0 && movies.map((movie) =>
                    <CardCustom movie={movie} key={movie.id} handleFavorite={handleFavorite} favorites={favorites} />
                )}
                {error && !loading && <p>Error Fetching Data</p>}
            </div>
        </div>
    );
}

export default HomePage