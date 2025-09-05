import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import wallet from "./wallet";

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
