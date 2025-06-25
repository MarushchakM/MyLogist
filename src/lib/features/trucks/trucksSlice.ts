import { getNumbersTrucks } from "@/features/trucks/queries/getNumbersTrucks";
import { RootState } from "@/lib/store";
import { Prisma } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchTrucks = createAsyncThunk(
  'trucks/fetchTrucks',
  async () => {
    const data = await getNumbersTrucks();
    console.log('Дані з getNumbersTrucks:', data);
    return data;
  },
);

type TruckNumber = Prisma.TruckGetPayload<{
  select: {
    id: true;
    number: true;
  };
}>;

interface TrucksState {
  trucks: TruckNumber[] | null;
}

const initialState: TrucksState = {
  trucks: null,
};

export const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTrucks.fulfilled, (state, action) => {
      console.log('Payload в Redux Fulfilled (слайс):', action.payload);
      state.trucks = action.payload;
    });
  },
});

export const selectTrucks = (state: RootState) => state.trucks.trucks;
export default trucksSlice.reducer;

