import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { wallet } from "../../types";

export interface WalletState {
  accounts?:wallet[];
}

const initialState: WalletState = {
  accounts: undefined,
};

// Then, handle actions in your reducers:
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<wallet[]>) => {
      state.accounts = action.payload;
    },
    logout: (state) => {
      state.accounts = undefined;
    },
  }
})

export const selectAccount = (state: RootState) => state.wallet.accounts?.[0];
export const selectAccounts = (state: RootState) => state.wallet.accounts;
export const { login, logout } = walletSlice.actions;

export default walletSlice.reducer;
