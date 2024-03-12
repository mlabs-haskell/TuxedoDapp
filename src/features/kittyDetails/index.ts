import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Kitty } from "../../types";
import { MOCK_module } from "../../MOCK/client.mock";

export interface DetailsState {
  entity?: Partial<Kitty> | Kitty;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: DetailsState = {
  entity: undefined,
  loading: 'idle',
};

export const postKitty = createAsyncThunk<Kitty, Partial<Kitty>>(
  'kitties/get',
  async (kitty) => {
    return await MOCK_module['set-kitty-property'](kitty)
  }
);


// Then, handle actions in your reducers:
const kittySlice = createSlice({
  name: 'kitty',
  initialState,
  reducers: {
    setKitty: (state, action:PayloadAction<Partial<Kitty>>) => {
      state.entity = action.payload;
    },
    clearKitty: (state) => {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(postKitty.fulfilled, (state, action) => {
      state.entity = action.payload;
    })
  }
})
export const {setKitty, clearKitty} = kittySlice.actions;
export const selectKitty = (state: RootState) => state.kitty.entity;


export default kittySlice.reducer;
