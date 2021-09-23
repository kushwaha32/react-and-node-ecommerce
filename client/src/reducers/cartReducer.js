import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_CART_ERROR } from "../actions/types";

const initialState = {
    cartItems:[],
    loading: false,
    error: null
}

const cartReducer = (state = initialState, action) => {
      switch (action.type) {
          case ADD_TO_CART:
              const item = action.payload
              const existItem = state.cartItems.find(x => (
                    x.product_id === item.product_id
              ))
              if(existItem){
                  return{
                      ...state,
                      cartItems: state.cartItems.map(x => (
                          x.product_id === existItem.product_id ? item : x
                      ))
                  }
              }else{
                  return{
                      ...state,
                      cartItems: [...state.cartItems, item]
                  }
              }
            case REMOVE_FROM_CART:
            return{
                 ...state,
                 cartItems:state.cartItems.filter(item => item.product_id !== action.payload._id),
                 loading:false
            }
            case REMOVE_FROM_CART_ERROR:
                return{
                    ...state,
                    removeCartError: action.payload
                }
          default:
              return state;
      }
}


export default cartReducer