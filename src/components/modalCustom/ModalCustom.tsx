import React, { SyntheticEvent, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { UIInterface } from '../../interfaces/user-interface.interface';
import { toggleModal } from '../../redux/actions/user-interface';
import { RootState } from '../../redux/reducers';
import "./ModalCustom.scss"
import { MovieState } from '../../interfaces/movie/movie-state.interface';
import ListGroup from 'react-bootstrap/ListGroup'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import SpinnerCustom from '../../components/spinnerCustom/SpinnerCustom'
import { dateFormater } from '../../tools/dateFormater'

const ModalCustom: React.FC = () => {
    const dispatch = useDispatch();
    const { modal: { status } }: UIInterface = useSelector((state: RootState) => state.UIReducer) || '';
    const { movieDetail, loading, movieCredits }: MovieState = useSelector((state: RootState) => state.movieReducer) || '';
    const dateFormated: string = dateFormater(movieDetail?.release_date || '')

    const handleModal = () => {
        dispatch(toggleModal(!status))
    }
    const addDefaultSrc = (ev: SyntheticEvent<HTMLImageElement, Event>): void => {
        ev.currentTarget.src = `https://via.placeholder.com/320x480?text=No+Poster+Available`
    }
    useEffect(() => {
        dispatch(toggleModal(false))
    }, [dispatch])

    return (<>
        <Modal show={status} onHide={handleModal} size="xl" centered >

            {loading ?
                <SpinnerCustom />
                :
                <Modal.Body className='d-flex flex-row'>
                    <div className='movie-poster'>
                        <img onError={addDefaultSrc} src={`http://image.tmdb.org/t/p/w185/${movieDetail?.poster_path}`} alt="movie-poster" />
                    </div>
                    <div className="movie-info">
                        <h1 className='movie-title'>
                            {movieDetail?.title}
                        </h1>
                        <p className='movie-synopsis'>
                            {movieDetail?.overview ? movieDetail?.overview : 'No overview found'}
                        </p>
                        <ListGroup variant="flush">
                            <ListGroup.Item className='d-flex flex-row justify-content-between'>
                                <span>Released</span>
                                <span>{dateFormated ? dateFormated : 'No date info available'}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex flex-row justify-content-between'>
                                <span>Langguage</span>
                                <div>
                                    {movieDetail?.spoken_languages?.map((lang, i) =>
                                        <span key={i}> {(i ? ', ' : '') + lang.name} </span>
                                    )}
                                    {movieDetail?.spoken_languages?.length === 0 && <span>No langguage info available</span>}
                                </div>
                            </ListGroup.Item>

                            <Tabs defaultActiveKey="crew" >
                                <Tab eventKey="crew" title="Crew">
                                    <div className='tab-detail'>
                                        {
                                            movieCredits?.crew?.map((crew, i) =>
                                                <ListGroup.Item className='d-flex flex-row justify-content-between' key={i}>
                                                    <span>{crew.job}</span>
                                                    <span>{crew.name}</span>
                                                </ListGroup.Item>
                                            )
                                        }
                                    </div>
                                </Tab>
                                <Tab eventKey="cast" title="Cast">
                                    <div className='tab-detail'>
                                        {
                                            movieCredits?.cast?.map((cast, i) =>
                                                <ListGroup.Item className='d-flex flex-row justify-content-between' key={i}>
                                                    <span>{cast.character}</span>
                                                    <span>{cast.name}</span>
                                                </ListGroup.Item>
                                            )
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </ListGroup>
                    </div>
                </Modal.Body>
            }

        </Modal>
    </>);
}


export default ModalCustom