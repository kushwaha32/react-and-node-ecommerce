import axios from "axios";
import {
  ADD_TO_CART,
  CART_ERROR,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_ERROR,
} from "./types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product_id: res.data._id,
        product_name: res.data.name,
        product_image: res.data.image,
        product_price: res.data.price,
        countInStock: res.data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_ERROR,
      payload: error,
    });
  }
};

export const removeFromCart = (id) => async ( dispatch, getState) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: res.data,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_ERROR,
      payload: error,
    });
  }
};
