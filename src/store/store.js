import { configureStore } from '@reduxjs/toolkit';
import orderSlice from '../features/add-order/orderSlice';
import mealsSlice from '../features/meals/mealsSlice';
import orderListSlice from '../features/order-list/orderListSlice';

export const store = configureStore({
    reducer: {
        order: orderSlice,
        meals: mealsSlice,
        orders:orderListSlice,
    },
})