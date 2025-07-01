import { RootState } from "@/lib/store";
import { Trailer } from "@prisma/client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTrailers = createAsyncThunk(
  'trailers/fetchTrailers',
  async () => {
    const response = await fetch('/api/trailers');
    const data: Trailer[] = await response.json();
    return data;
  },
);


interface TrailerState {
  trailers: Trailer[] | null;
  isLoading: boolean;
}

const initialState: TrailerState = {
  trailers: null,
  isLoading: false,
};

export const trailersSlice = createSlice({
  name: 'trailer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTrailers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrailers.fulfilled, (state, action) => {
        state.isLoading = false;
      state.trailers = action.payload;
    });
  },
});

export const selectTrailer = (state: RootState) => state.trailers.trailers;
export const selectTrailerLoading = (state: RootState) => state.trailers.isLoading;

export const selectTrailersNumbersAndIds = (state: RootState) => {
  if (!state.trailers.trailers) {
    return null;
  }
  return state.trailers.trailers.map(trailer => ({
    id: trailer.id,
    number: trailer.number,
  }));
};

export default trailersSlice.reducer;

