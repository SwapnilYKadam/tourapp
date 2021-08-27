import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { tourListReducer, getTourReducer } from "./reducers/tourReducers.js";
import { userLoginReducer, userSignupReducer } from "./reducers/userReducers.js";

const reducers = combineReducers({
  tourList: tourListReducer,
  getTour: getTourReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
