import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import kittiesList from "../features/kittiesList";
import kittyDetails from "../features/kittiesDetails";

export const store = configureStore({
  reducer: {
    kitties: kittiesList,
    kitty: kittyDetails,
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
