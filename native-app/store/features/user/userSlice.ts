import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  accessToken?: string;
}
const initialState: UserState = {
  accessToken: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveAccessToken: (state, payload) => {
      state.accessToken = payload.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = undefined;
    }
  },
});

export const {
  saveAccessToken,
  clearAccessToken
} = userSlice.actions;

export default userSlice.reducer;
