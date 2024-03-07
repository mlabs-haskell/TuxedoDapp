import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Kitty } from "../../types";
import { MOCK_module} from "../../MOCK/client.mock";

export interface ListState {
  list: Kitty[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ListState = {
  list: [],
  loading: 'idle',
};

export const getKitties = createAsyncThunk<Kitty[], string | undefined>(
  'kitties/get',
  async (user) => {
    if (user) {
      return await MOCK_module["show-owned-kitties"](user);
    } else {
      return await MOCK_module["show-all-kitties"]();
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
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getKitties.fulfilled, (state, action) => {
      state.list = action.payload;
    })
  }
})
//TODO: optimistic search update

export const selectKitties = (state: RootState) => state.kitties.list;


export default kittiesSlice.reducer;
