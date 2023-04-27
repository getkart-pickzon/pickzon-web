import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import { testReducers } from "./../reducer/test/testReducer";
import { userDetailsReducers } from "../reducer/userDetails/userDetailsReducer";
import { userAddressReducers } from "../reducer/userAddress/userAddressReducer";
import { createPageFormReducers } from "../reducer/createPageForm/createPageFormReducer";
import { walletReducers } from "../reducer/wallet/walletReducer";
import { createFeedPostReducers } from "../reducer/createFeedPost/createFeedPostReducer";

// BLACKLIST
const persistblacklistConfig = {
  key: 'Blacklist-Root',
  storage: storage,
  blacklist: ["userAddress", "testUser"], // navigation will not be persisted
};

// WHITELIST
const persistwhitelistConfig = {
  key: 'Whitlist-Root',
  storage: storage,
  whitelist: ["userDetials", 'walletReducers', 'createFeedPostReducers'], // only navigation will be persisted
};

const rootReducer = combineReducers({
  /* *** BLACKLIST **** */
  userAddress: userAddressReducers,
  createPageForm: createPageFormReducers,
  testUser: testReducers,

  /* *** WHITELIST **** */
  createFeedPostReducers: persistReducer(persistwhitelistConfig, createFeedPostReducers),
  walletReducers: persistReducer(persistwhitelistConfig, walletReducers),
  userDetials: persistReducer(persistwhitelistConfig, userDetailsReducers),
});

const persistedReducer = persistReducer(persistblacklistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk)),
  window.__redux_devtools_extension__ && window.__redux_devtools_extension__()
);

export const persistor = persistStore(store);
export default store;
