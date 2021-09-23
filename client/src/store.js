import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootResucer from "./reducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  auth: {
    userInfo: userInfoFromStorage
  }
};
const middleware = [thunk];
const store = createStore(
  rootResucer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
