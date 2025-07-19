import { RootState } from "@/lib/store";
import { Truck } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrucks = createAsyncThunk("trucks/fetchTrucks", async () => {
  const response = await fetch("/api/trucks");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Response is not JSON");
  }

  const data: Truck[] = await response.json();
  return data;
});

interface TrucksState {
  trucks: Truck[] | null;
  isLoading: boolean;
}

const initialState: TrucksState = {
  trucks: null,
  isLoading: false,
};

export const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrucks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trucks = action.payload;
      })
      .addCase(fetchTrucks.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Failed to fetch trucks:", action.error.message);
      });
  },
});

export const selectTrucks = (state: RootState) => state.trucks.trucks;
export const selectTrucksLoading = (state: RootState) => state.trucks.isLoading;

export const selectTruckNumbersAndIds = (state: RootState) => {
  if (!state.trucks.trucks) {
    return null;
  }
  return state.trucks.trucks.map((truck) => ({
    id: truck.id,
    number: truck.number,
  }));
};

export default trucksSlice.reducer;
