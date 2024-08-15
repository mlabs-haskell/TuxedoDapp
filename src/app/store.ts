import { Action, configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import kittiesList from "../features/kittiesList";
import kittyDetails from "../features/kittyDetails";
import walletSlice from "../features/wallet/walletSlice";
import breedingSlice from "../features/breeding";
import tradingSlice from "../features/trade";

const rootReducer = combineReducers({
  kitties: kittiesList,
  kitty: kittyDetails,
  wallet: walletSlice,
  breeding: breedingSlice,
  trading: tradingSlice,
})

// State is mostly transient and persisting was only leading to stale data
// after loading/refreshing the page. For this reason, the whitelist is
// currently empty. Add to it only after careful consideration.
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // Customize the built-in serializability dev check
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  },
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
