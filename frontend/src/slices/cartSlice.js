import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        adddToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(e => e._id === item._id)
            if (existItem) {
                state.cartItems = state.cartItems.map(e => e._id === item._id ? item : e)
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            return updateCart(state)
        }
    }
})

export const { adddToCart } = cartSlice.actions

export default cartSlice.reducer