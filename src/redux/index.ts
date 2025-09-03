import { legacy_createStore as createStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default store;
