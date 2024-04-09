import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Kitty } from "../../types";
import { api } from "../../api/client";


export interface DetailsState {
  entity?: Partial<Kitty> | Kitty;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: DetailsState = {
  entity: undefined,
  loading: 'idle',
};

type Result = {
  value: {
    kitty: Kitty,
    message: string,
  }
  error?: boolean,
};


export const updateKittyName = createAsyncThunk<Kitty & {error: boolean, data: string}, { kitty: Kitty, key: string }>(
  'kitty/update/name',
  // @ts-ignore
  async ({kitty, key}, { getState }) => {
    const {wallet} = getState() as RootState;
    if (!wallet.accounts) return { error: true, data: 'Wallet is not connected'};
    return await api['set-name'](kitty, key, wallet.accounts)
  }
);

export const getKitty = createAsyncThunk<Result, NonNullable<Kitty['dna']>>(
  'kitty/get',
  // @ts-ignore
  async (dna) => {
    return await api["get-kitty"](dna);
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
    builder.addCase(updateKittyName.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.loading = 'failed';
        return;
      }
      state.entity = action.payload;
    })
    builder.addCase(getKitty.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.loading = 'failed';
        return;
      }
      if (action.payload.value.message.toLowerCase().includes('error')){
        state.loading = 'failed';
        return;
      }
      state.loading = 'succeeded';
      state.entity = action.payload.value.kitty;
    })
  }
})
export const {setKitty, clearKitty} = kittySlice.actions;
export const selectKitty = (state: RootState) => state.kitty.entity;


export default kittySlice.reducer;
