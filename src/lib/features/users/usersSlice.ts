import { RootState } from "@/lib/store";
import { User } from "@prisma/client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('/api/users');
    const data: User[] = await response.json();
    return data;
  },
);

interface UserState {
  users: User[] | null;
  loaded: boolean;
}

const initialState: UserState = {
  users: null,
  loaded: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    
    builder
    .addCase(fetchUsers.pending, (state) => {
      state.loaded = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loaded = false;
      state.users = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loaded;

export const selectUsersPrev = (state: RootState) => {
  if (!state.users.users) {
    return null;
  }
  return state.users.users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    avatarUrl: user.avatarUrl,
  }));
};

export default usersSlice.reducer;

