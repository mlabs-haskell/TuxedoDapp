import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Kitty } from "../../types";
import { api } from "../../api/client";

export interface DetailsState {
  mom?: Partial<Kitty>;
  dad?: Partial<Kitty>;
  child?: Kitty;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: DetailsState = {
  mom: undefined,
  dad: undefined,
  child: undefined,
  loading: "idle",
};

export const postBreed = createAsyncThunk<
  Kitty,
  { mom: string; dad: string; key: string; name: string }
>(
  "breed/post",
  // @ts-ignore
  async ({ mom, dad, name, key }, { getState }) => {
    const { wallet } = getState() as RootState;
    if (!wallet.accounts)
      return { error: true, data: "Wallet is not connected" };
    return await api["breed-kitty"](mom, dad, name, key, wallet.accounts);
  },
);

// Then, handle actions in your reducers:
const breedingSlice = createSlice({
  name: "breeding",
  initialState,
  reducers: {
    setMom: (state, action: PayloadAction<Partial<Kitty>>) => {
      state.mom = action.payload;
    },
    setDad: (state, action: PayloadAction<Partial<Kitty>>) => {
      state.dad = action.payload;
    },
    setChild: (state, action: PayloadAction<Kitty>) => {
      state.child = action.payload;
    },
    clearMom: (state) => {
      state.mom = undefined;
    },
    clearDad: (state) => {
      state.mom = undefined;
    },
    clearChild: (state) => {
      state.mom = undefined;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(postBreed.fulfilled, (state, action) => {
      state.child = action.payload;
    });
  },
});
export const { setMom, clearMom, clearDad, setDad, clearChild, setChild } =
  breedingSlice.actions;
export const selectMom = (state: RootState) => state.breeding.mom;
export const selectDad = (state: RootState) => state.breeding.dad;
export const selectChild = (state: RootState) => state.breeding.child;

export default breedingSlice.reducer;
