import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  WalletAccount,
} from '@talismn/connect-wallets';


export interface WalletState {
  account?: WalletAccount;

}

const initialState: WalletState = {
  account: undefined,
};

// Then, handle actions in your reducers:
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<WalletAccount>) => {
      state.account = action.payload;
    },
    logout: (state) => {
      state.account = undefined;
    }
  }
})

export const selectAccount = (state: RootState) => state.wallet.account;
export const { login, logout } = walletSlice.actions;

export default walletSlice.reducer;
