import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../redux/actions/datas'
import { RootState } from '../../redux/reducers'
import Card from '../card-comp/card.comp'
import { User } from "../../interfaces/user.interface"


const Data:React.FC = () => {
    const dispatch = useDispatch();
    const datas: User[] = useSelector((state: RootState) => state.datasReducer.datas);
    const loading: boolean = useSelector((state: RootState) => state.datasReducer.loading);
    const error: string = useSelector((state: RootState) => state.datasReducer.error) || '';

    useEffect(() => {
        dispatch(getData())
    }, []);

    return (
        <>
            {loading && <p>Loading data</p>}
            {datas.length > 0 && datas.map((data) =>
                <Card user={data} key={data.id} />
            )}
            {!loading && datas.length === 0 && <p>no data found</p>}
            {error && !loading && <p>Error Fetching Data</p>}
        </>
    )


}

export default Data