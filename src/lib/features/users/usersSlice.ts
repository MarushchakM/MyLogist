import { RootState } from "@/lib/store";
import { Role, User } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  searchTerm: string;
  roleFilter: Role | null;
}

const initialState: UserState = {
  users: null,
  loaded: false,
  searchTerm: '',
  roleFilter: null,
};

const roleTranslations: Record<Role, string> = {
  [Role.ADMIN]: 'Адміністратор',
  [Role.DISPATCHER]: 'Диспетчер',
  [Role.DRIVER]: 'Водій',
};

const getRoleTranslation = (role: Role): string => {
  return roleTranslations[role] || role;
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<Role | null>) => {
      state.roleFilter = action.payload;
    }
  },
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

export const selectFilteredUsers = (state: RootState) => {
  const { users, searchTerm, roleFilter } = state.users;

  if (!users) return null;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return users
  .filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
                          user.lastName.toLowerCase().includes(lowerCaseSearchTerm);

    const matchesRole = roleFilter === null || user.role === roleFilter;

    return matchesSearch && matchesRole;
  })
  .map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: getRoleTranslation(user.role),
    avatarUrl: user.avatarUrl,
  }));
}

export const { setSearchTerm, setRoleFilter } = usersSlice.actions;

export default usersSlice.reducer;

