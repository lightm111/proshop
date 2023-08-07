export const addDec = (num) => (Math.round(num * 100) / 100).toFixed(2)

export const updateCart = (state) => {
    // Items price
    state.itemsPrice = addDec(state.cartItems.reduce((acc, e) => acc += e.price * e.qty, 0))
    // Shipping price
    state.shippingPrice = addDec(Number(state.itemsPrice) > 100 ? 0 : 10)
    // Tax (12%)
    state.taxPrice = addDec(Number(state.itemsPrice * 0.12))
    // Total price
    state.totalPrice = addDec(
        Number(state.itemsPrice)
        + Number(state.shippingPrice)
        + Number(state.taxPrice)
    )
    localStorage.setItem("cart", JSON.stringify(state))
    return state
}