import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const userLogin = createAsyncThunk(
    "login/userLogin",
    async (userData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (
                userData.email === "test@test.com" &&
                userData.password === "123456"
            ) {
                return {
                    id: 1,
                    email: userData.email,
                    token: "mock-token-abc-123",
                };
            } else {
                return rejectWithValue("Invalid email or password!");
            }
        } catch (error) {
            return rejectWithValue("Something went wrong!");
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                Cookies.set('userToken', action.payload.token, { expires: 7 });
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = [];
            });
    },
});

export const { resetError } = loginSlice.actions;
export default loginSlice.reducer;
