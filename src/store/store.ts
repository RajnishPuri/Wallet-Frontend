import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
    Name: string;
    Email: string;
    AccountNumber: string;
    Balance: number;
}

interface UserState {
    userDetails: UserDetails | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userDetails: null,
    loading: true,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserDetails>) => {
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setUserDetails, setLoading, setError } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
