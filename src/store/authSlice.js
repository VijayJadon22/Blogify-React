import { createSlice } from "@reduxjs/toolkit";

// Initial state of the auth slice
const initialState = {
    status: false, // Represents if the user is logged in or not
    userData: null, // Stores user data when logged in
}

// Creating the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Reducer for logging in
        login: (state, action) => {
            state.status = true; // Sets the status to true indicating the user is logged in
            state.userData = action.payload.userData; // Sets the userData to the data provided in the action payload
        },

        // Reducer for logging out
        logout: (state) => {
            state.status = false; // Sets the status to false indicating the user is logged out
            state.userData = null; // Clears the userData
        }
    }
})

// Exporting the action creators
export const { login, logout } = authSlice.actions;

// Exporting the reducer
export default authSlice.reducer;

