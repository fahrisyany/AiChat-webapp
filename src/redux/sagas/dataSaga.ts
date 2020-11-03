import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../types/data.types'
import { environment } from '../../environments/environments'

const apiUrl = environment.endpoints.jsonPlaceholder.baseUrl

function getApi() {

    return fetch(apiUrl, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }

    }).then(response => response.json())
        .catch((err => { throw err }))

}


function* fetchData() {
    try {
        const datas = yield call(getApi)
        yield put({ type: type.GET_DATAS_SUCCESS, datas: datas })
    }
    catch (e) {
        yield put({ type: type.GET_DATAS_FAILED, message: e.message })
    }
}


function* dataSaga() {
    yield takeEvery(type.GET_DATAS_REQUESTED, fetchData)
}

export default dataSaga