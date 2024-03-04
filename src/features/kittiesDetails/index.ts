import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Kitty } from "../../types";

export interface DetailsState {
  entity?: Kitty;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: DetailsState = {
  entity: undefined,
  loading: 'idle',
};

export const getKitty = createAsyncThunk<Kitty | Error, void>(
  'kitty/get',
  async () => {
    //const response = await getKitties();
    return Error('no such kitty')
  }
);

// Then, handle actions in your reducers:
const kittySlice = createSlice({
  name: 'kitty',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getKitty.fulfilled, (state, action) => {
      state.entity = action.payload as Kitty;
    })
  },
})

export const selectKitty = (state: RootState) => state.kitty.entity;


export default kittySlice.reducer;
