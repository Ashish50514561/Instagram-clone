import { combineReducers } from "redux";
import {
  userReducer,
  adminReducer,
  postReducer,
  commentReducer,
  menuReducer,
  drawerReducer,
  likeReducer,
} from "./reducers";

const rootReducer = combineReducers({
  userReducer,
  adminReducer,
  postReducer,
  commentReducer,
  menuReducer,
  drawerReducer,
  likeReducer,
});

export default rootReducer;
