import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceProps {
  accessToken: string | null;
  isRestoring: boolean;
}

const initialState: AuthSliceProps = {
  accessToken: null,
  isRestoring: true,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setIsRestoring: (state, action: PayloadAction<boolean>) => {
      state.isRestoring = action.payload;
    },
  },
});

export const { setAccessToken, setIsRestoring } = authSlice.actions;
export default authSlice.reducer;
