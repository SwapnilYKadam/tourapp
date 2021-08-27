import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED } from "../constants"
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILED, payload: error.response && error.response.data.message })
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('userInfo');

        dispatch({
            type: USER_LOGOUT
        })

    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILED, payload: error.response && error.response.data.message })
    }
}


export const signup = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        const { data } = await axios.post('/api/users/signup', { name, email, password }, config)

        console.log(data);

        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch({
            type: USER_SIGNUP_SUCCESS,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);

        dispatch({
            type: USER_SIGNUP_FAILED, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
