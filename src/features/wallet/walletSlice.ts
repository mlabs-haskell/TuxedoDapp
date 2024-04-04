import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  WalletAccount,
} from '@talismn/connect-wallets';


export interface WalletState {
  accounts?: WalletAccount[];
  isConnected: boolean;
}

const initialState: WalletState = {
  accounts: undefined,
  isConnected: false,
};

// Then, handle actions in your reducers:
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<WalletAccount[]>) => {
      state.accounts = action.payload;
    },
    logout: (state) => {
      state.accounts = undefined;
    },
    connect: (state) => {
      state.isConnected = true;
    },
    disConnect: (state)=> {
      state.isConnected = false;
    }
  }
})

export const selectAccount = (state: RootState) => state.wallet.accounts?.[0];
export const selectAccounts = (state: RootState) => state.wallet.accounts;
export const selectIsConnected = (state: RootState) => state.wallet.isConnected;
export const { login, logout, connect, disConnect } = walletSlice.actions;

export default walletSlice.reducer;
