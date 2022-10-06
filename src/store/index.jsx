import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './slices/cart.slice'
import isLoadingSlice from './slices/isLoading.slice'
import ProductsSlice from './slices/Products.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: ProductsSlice,
        purchases: purchasesSlice,
        cart: cartSlice
    }
})