import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    meals: [],
}
export const mealsSlice = createSlice({
    name:'meals',
    initialState,
    reducers: {
        mealsCal: (state,action) => {
            state.meals=action.payload
        }
    },
})

export const { mealsCal } = mealsSlice.actions

export default mealsSlice.reducer;