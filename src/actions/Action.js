import axios from 'axios';

export const SUCCESS = {
    GET_DATA_SUCCESS : "GET_DATA_SUCCESS",
    CONCAT_DATA_SUCCESS : "CONCAT_DATA_SUCCESS"
}

export const OTHER = {
    CLEAR_DATA : "CLEAR_DATA"
};

export const FAILURE = {
    GET_DATA_FAILURE : "GET_DATA_FAILURE",
    CONCAT_DATA_FAILURE : "CONCAT_DATA_FAILURE"
}


//새로운 데이터로 dogData 교체
export const getData = () => dispatch => {

    return getAPIData().then(
        (res) => {
            dispatch({
                type : SUCCESS.GET_DATA_SUCCESS,
                payload: res.data
            })
        }
    )
        .catch(err => {
            dispatch({
                type: FAILURE.GET_DATA_FAILURE,
                payload : err
            })
        })
}

//기존 dogData에 새로운 데이터 결합
export const concatData = () => dispatch => {
    return getAPIData().then(
        (res) => {
            dispatch({
                type : SUCCESS.CONCAT_DATA_SUCCESS,
                payload: res.data
            })
        }
    )
        .catch(err => {
            dispatch({
                type: FAILURE.CONCAT_DATA_FAILURE,
                payload : err
            })
        })
}

//dogData clear
export const clearData = () => dispatch => {
    return dispatch({
        type : OTHER.CLEAR_DATA
    })
}

//data.json 가져오기
function getAPIData() {
    return axios.get('/data.json');
}