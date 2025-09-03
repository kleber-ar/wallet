import { SET_EMAIL } from "../actions";

export type UserStateType = {
  email: string;
}

const initialState: UserStateType = {
  email: "",
}

export type UserAction = {
  type: typeof SET_EMAIL;
  payload: string;
}

export default function userReducer(state = initialState, action: UserAction): UserStateType {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
}


