import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
}

export const orderSlice = createSlice({
    name: 'totalPrice',
    initialState,
    reducers: {
        totalPrice: (state,action) => {
            state.totalPrice = Math.round(action.payload.reduce((sum,item) => (
                sum += item.count * item.price
            ),0) * 100)/100
        },
     },

})



export const { totalPrice} = orderSlice.actions

export default orderSlice.reducer