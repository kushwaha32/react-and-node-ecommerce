
import axios from "axios";
import { CLEAR_ERROR, GET_PRODUCTS, GET_SINGLE_PRODUCT, PRODUCT_ERROR } from "./types";

export const getProducts = () => async dispatch => {
    try {
        const res = await axios.get("/api/products");
        dispatch({
            type:GET_PRODUCTS,
            payload: res.data
        })
    } catch (error) {
        console.error(error)
        dispatch({
            type:PRODUCT_ERROR,
            payload: error
        })
    }
}


// get single product

export const getSingleProduct = id => async dispatch => {
      try {
          const res = await axios.get(`/api/products/${id}`)
          dispatch({
              type: GET_SINGLE_PRODUCT,
              payload: res.data
          })
      } catch (error) {
        dispatch(clearError())
        console.error(error)
        dispatch({
            type:PRODUCT_ERROR,
            payload: error
        })
      }
}

const clearError = () => {
    return{
        type: CLEAR_ERROR
    }
}