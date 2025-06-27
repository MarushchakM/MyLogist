import { RootState } from "@/lib/store";
import { Truck } from "@prisma/client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTrucks = createAsyncThunk(
  'trucks/fetchTrucks',
  async () => {
    const response = await fetch('/api/trucks');
    const data: Truck[] = await response.json();
    return data;
  },
);

interface TrucksState {
  trucks: Truck[] | null;
  loaded: boolean;
}

const initialState: TrucksState = {
  trucks: null,
  loaded: false,
};

export const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    
    builder
    .addCase(fetchTrucks.pending, (state) => {
      state.loaded = true;
    })
    .addCase(fetchTrucks.fulfilled, (state, action) => {
      state.loaded = false;
      state.trucks = action.payload;
    });
  },
});

export const selectTrucks = (state: RootState) => state.trucks.trucks;
export const selectTrucksLoading = (state: RootState) => state.trucks.loaded;

export const selectTruckNumbersAndIds = (state: RootState) => {
  if (!state.trucks.trucks) {
    return null;
  }
  return state.trucks.trucks.map(truck => ({
    id: truck.id,
    number: truck.number,
  }));
};

export default trucksSlice.reducer;

