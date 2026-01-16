import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getSavedData = () => {
    try {
        const localSaved = localStorage.getItem("registredUser");
        if (localSaved) return JSON.parse(localSaved);
        
        const cookieSaved = Cookies.get("user_data");
        if (cookieSaved) return JSON.parse(cookieSaved);
    } catch (e) { console.error("Error reading storage", e); }
    return null;
};

export const registerUser = createAsyncThunk("register/registerUser", async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // محاكاة Loader [cite: 68]
    return formData;
});

const registerSlice = createSlice({
    name: "register",
    initialState: {
        loading: false,
        data: getSavedData(), 
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                localStorage.setItem("registredUser", JSON.stringify(action.payload));
                Cookies.set("user_data", JSON.stringify(action.payload), { expires: 3 });
            })
            .addCase(registerUser.rejected, (state) => { state.loading = false; });
    }
});

export default registerSlice.reducer;