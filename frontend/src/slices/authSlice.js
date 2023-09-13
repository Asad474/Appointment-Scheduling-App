import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setCredential: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },

        removeCredential: state => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const {setCredential, removeCredential} = authSlice.actions;

export default authSlice.reducer;