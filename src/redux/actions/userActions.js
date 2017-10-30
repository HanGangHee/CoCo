/* */

/* */
import AT from '../actions/actionTypes'
import client from '../base'

function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}

export default {
    signIn: (payload) => { // 로그인 직후 유저의 프로젝트 리스트 받기
        return (dispatch) => {
            dispatch(createAction(AT.SIGN_IN)(payload))
            return client.post('/auth/login', payload)
                .then(response => {
                    dispatch(createAction(AT.SIGN_IN_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.SIGN_IN_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    signUp: (payload) => { // 로그인 직후 유저의 프로젝트 리스트 받기
        return (dispatch) => {
            dispatch(createAction(AT.SIGN_UP)(payload))
            return client.post('/auth/signUp', payload)
                .then(response => {
                    dispatch(createAction(AT.SIGN_UP_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.SIGN_UP_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    logout: () => createAction(AT.LOG_OUT)(),
}
