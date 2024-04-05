import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Kitty } from "../../types";
import { api } from "../../api/client";
import { transformKittyForUi } from "../../api/utils";


export interface ListState {
  list: Kitty[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string
}

const initialState: ListState = {
  list: [],
  loading: 'idle',
};

type Payload = {
  message: string,
  kitty_list: any[]
};

export const getKitties = createAsyncThunk<Payload, string | undefined>(
  'kitties/get',
  async (user) => {
    if (user) {
      return await api["show-owned-kitties"](user);
    } else {
      return await api["show-all-kitties"]();
    }
  }
);

// Then, handle actions in your reducers:
const kittiesSlice = createSlice({
  name: 'kitties',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(getKitties.fulfilled, (state, action) => {
      if (action.payload?.message?.toLowerCase().includes('error')) {
        state.error = action.payload.message
      }
      if (!action.payload?.kitty_list) {
        state.loading = 'failed';
        return;
      }
      state.list = action.payload?.kitty_list.map(transformKittyForUi);
      state.loading = 'succeeded'
      state.error = undefined;
    })
  }
})

export const selectKitties = (state: RootState) => state.kitties.list;
export const selectStatus = (state: RootState) => state.kitties.loading;
export const selectError = (state: RootState) => state.kitties.error;


export default kittiesSlice.reducer;
