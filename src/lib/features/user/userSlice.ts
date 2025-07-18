import { RootState } from "@/lib/store";
import { User } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
    async (id: string) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
      
    const data: User = await response.json();
    return data;
  },
);

interface UserState {
  user: User | null;
  loaded: boolean;
}

const initialState: UserState = {
  user: null,
  loaded: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loaded = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loaded = false;
        state.user = action.payload;
      });
  },
});

export const selectUserName = (state: RootState) => {
  const { firstName, lastName } = state.user.user || {};
  return { firstName, lastName };
};

export default userSlice.reducer;