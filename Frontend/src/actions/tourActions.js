import axios from 'axios'
import { TOUR_LIST_FAILED, TOUR_LIST_SUCCESS, TOUR_LIST_REQUEST, GET_TOUR_REQUEST, GET_TOUR_SUCCESS, GET_TOUR_FAILED } from './../constants.js'

//Redux thunk allows to pass a async function in a function
export const listTours = () => async (dispatch) => {
  try {
    dispatch({ type: TOUR_LIST_REQUEST })

    const { data } = await axios.get('/api/tours')

    dispatch({ type: TOUR_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: TOUR_LIST_FAILED, payload: error.response && error.response.data.message })
  }
}

export const getTourDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOUR_REQUEST })

    const { data } = await axios.get(`/api/tours/${id}`)

    dispatch({ type: GET_TOUR_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_TOUR_FAILED, payload: error.response && error.response.data.message })
  }
}
