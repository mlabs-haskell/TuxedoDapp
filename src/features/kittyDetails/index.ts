import { createSlice } from '@reduxjs/toolkit';
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


// Then, handle actions in your reducers:
const kittySlice = createSlice({
  name: 'kitty',
  initialState,
  reducers: {
    setKitty: (state, action) => {
      state.entity = action.payload;
    },
    clearKitty: (state) => {
      state.entity = undefined;
    }
  }

})
export const {setKitty, clearKitty} = kittySlice.actions;
export const selectKitty = (state: RootState) => state.kitty.entity;


export default kittySlice.reducer;
