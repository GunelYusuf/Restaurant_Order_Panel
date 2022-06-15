import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
}

export const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        ordersSet: (state,action) => {
            state.orders = action.payload;
        },
        cancelOrderItem:(state,action)=>{
            let a = state.orders.find((e) => e.id === action.payload.id )
            console.log(state.orders,'VUgaaaaarrrr')
            console.log(a, 'AAAAAAAA')
            let b = a.find((v) => v.name === action.payload.name)
            let c = [...a,{...b,status:"refusal"}]
            state.orders=[...state.orders.filter((g) => g.id !== action.payload.id),b];
        },
    }
})

export const { ordersSet,cancelOrderItem} = orderListSlice.actions

export default orderListSlice.reducer