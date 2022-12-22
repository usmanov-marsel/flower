import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFlowers } from "./asyncActions";
import { Flower, FlowerSliceState, Status } from "./types";

const initialState: FlowerSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const FlowerSlice = createSlice({
  name: "Flower",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Flower[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFlowers.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchFlowers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchFlowers.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = FlowerSlice.actions;

export default FlowerSlice.reducer;
