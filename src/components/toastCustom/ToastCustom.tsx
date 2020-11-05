import React from 'react'
import Toast from 'react-bootstrap/Toast'
import { UIInterface } from "../../interfaces/user-interface.interface"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { toggleToast } from "../../redux/actions/user-interface"
import "./ToastCustom.scss"

const ToastCustom: React.FC = () => {
    const dispatch = useDispatch();

    const { toast: { status, text } }: UIInterface = useSelector((state: RootState) => state.UIReducer) || '';
    const handleToast = () => {
        dispatch(toggleToast(!status))
    }

    return (
        <div className="toast-cntr">
            <Toast onClose={handleToast} show={status} delay={800} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Tout Regarder</strong>
                    <small>moment ago</small>
                </Toast.Header>
                <Toast.Body> {text} </Toast.Body>
            </Toast>
        </div >
    );
}

export default ToastCustom