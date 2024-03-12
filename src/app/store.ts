import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import kittiesList from "../features/kittiesList";
import kittyDetails from "../features/kittyDetails";
import walletSlice from "../features/wallet/walletSlice";
import breedingSlice from "../features/breeding";

export const store = configureStore({
  reducer: {
    kitties: kittiesList,
    kitty: kittyDetails,
    wallet: walletSlice,
    breeding: breedingSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
