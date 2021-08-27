import { TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS, TOUR_LIST_FAILED, GET_TOUR_FAILED, GET_TOUR_SUCCESS, GET_TOUR_REQUEST } from "../constants";

export const tourListReducer = (state = { tours: [] }, action) => {
  switch (action.type) {
    case TOUR_LIST_REQUEST:
      return { loading: true, tours: [] };
    case TOUR_LIST_SUCCESS:
      return { loading: false, tours: action.payload };
    case TOUR_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTourReducer = (state = { tour: {} }, action) => {
  switch (action.type) {
    case GET_TOUR_REQUEST:
      return { loading: true, tour: {} }
    case GET_TOUR_SUCCESS:
      return { loading: false, tour: action.payload }
    case GET_TOUR_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}