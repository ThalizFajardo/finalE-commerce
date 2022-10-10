import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const addCartThunk = (add) => (dispatch) => {
    dispatch(setIsLoading(true))
    return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", add, getConfig())
        .then(res => dispatch(getCartThunk(res.data.data?.cart.products)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
}
export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(res => dispatch(setCart([])))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
}


export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;