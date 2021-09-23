import { CLEAR_ERROR, GET_PRODUCTS, GET_SINGLE_PRODUCT, PRODUCT_ERROR } from "../actions/types"

const initialState = {
      products: null,
      product: null,
      loading: false,
      error: null
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
        case GET_SINGLE_PRODUCT:
            return{
                ...state,
                product: action.payload
            }
        case PRODUCT_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default productReducer