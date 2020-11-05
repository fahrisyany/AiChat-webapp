import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { UIInterface } from '../../interfaces/user-interface.interface';
import { toggleModal } from '../../redux/actions/user-interface';
import { RootState } from '../../redux/reducers';
import "./ModalCustom.scss"
import Button from 'react-bootstrap/Button';
import { MovieState } from '../../interfaces/movie/movie-state.interface';
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
interface ModalCustomProps {

}

const ModalCustom: React.FC<ModalCustomProps> = ({ }) => {
    const dispatch = useDispatch();
    const { modal: { status } }: UIInterface = useSelector((state: RootState) => state.UIReducer) || '';
    const { movieDetail, loading }: MovieState = useSelector((state: RootState) => state.movieReducer) || '';

    const handleModal = () => {
        dispatch(toggleModal(!status))
    }

    return (<>
        <Modal show={status} onHide={handleModal} size="xl" centered >

            {loading ?
                <div className='spinner-cntr'>
                    <Spinner animation="border" variant="warning" />
                </div>
                :
                <Modal.Body className='d-flex flex-row'>
                    <div className='movie-poster'>
                        <img src={`http://image.tmdb.org/t/p/w185/${movieDetail?.poster_path}`} alt="movie-poster" />
                    </div>
                    <div className="movie-info">
                        <h1 className='movie-title'>
                            {movieDetail?.title}
                        </h1>
                        <Button className='cta-button'><b>Add to Favorites</b></Button>
                        <p className='movie-synopsis'>
                            {movieDetail?.overview ? movieDetail?.overview : 'No overview found'}
                        </p>
                        <ListGroup variant="flush">
                            <ListGroup.Item className='d-flex flex-row justify-content-between'>
                                <span>Released</span>
                                <span>
                                    {movieDetail?.release_date}
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex flex-row justify-content-between'>
                                <span>Langguage</span>

                                <div>
                                    {movieDetail?.spoken_languages?.map((lang, i) =>
                                        <span>
                                            {(i ? ', ' : '') + lang.name}
                                        </span>
                                    )}
                                </div>

                            </ListGroup.Item>

                        </ListGroup>
                        {/* {JSON.stringify(movieCredits)} */}
                    </div>
                </Modal.Body>
            }

        </Modal>
    </>);
}


export default ModalCustom