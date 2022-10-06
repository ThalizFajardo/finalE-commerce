import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProdutcs: (state, action) => {
            const products = action.payload;
            return products
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then(res => dispatch(setProdutcs(res.data.data?.products)))
        .finally(() => dispatch(setIsLoading(false)))
}


export const { setProdutcs } = productsSlice.actions;

export default productsSlice.reducer;