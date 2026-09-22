// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistorOptions } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../slices/rootReduces';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// manualPersist: rehydration from localStorage does not start until _app calls
// persistor.persist() after mount. That guarantees the first client render uses
// the same initial state as the server HTML, so public pages rendered outside
// PersistGate (see SSR_BODY_ROUTES in _app.tsx) hydrate without a mismatch.
// `manualPersist` is implemented in redux-persist 6 (lib/persistStore.js) but
// missing from its bundled typings, hence the cast.
export const persistor = persistStore(store, { manualPersist: true } as unknown as PersistorOptions);

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
