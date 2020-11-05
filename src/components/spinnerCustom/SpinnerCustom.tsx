import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import './Spinner.scss'

const SpinnerCustom: React.FC = () => {
    return (
        <div className='spinner'>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>);
}

export default SpinnerCustom