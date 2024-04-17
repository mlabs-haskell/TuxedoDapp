import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Coin } from "../../types";
import { MOCK_module } from "../../MOCK/client.mock";
import { api } from "../../api/client";

export interface DetailsState {
  coins: Coin[];
  seller?: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: DetailsState = {
  coins: [],
  loading: "idle",
};

export const getCoins = createAsyncThunk<Coin[], string>(
  "coins/get",
  async (key) => {
    const coins = await api["get-coins"](key);
    return coins.map((coin: any) => ({
      hash: coin[1],
      value: coin[2],
    }));
  },
);

// Then, handle actions in your reducers:
const tradingSlice = createSlice({
  name: "breeding",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
    },
    clearCoins: (state) => {
      state.coins = [];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
    });
  },
});
export const { clearCoins, setCoins } = tradingSlice.actions;
export const selectCoins = (state: RootState) => state.trading.coins;
export const selectSeller = (state: RootState) => state.trading.seller;

export default tradingSlice.reducer;
