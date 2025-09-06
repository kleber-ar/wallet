import { type ExpenseType } from '../../types.ts'
import { ADD_EXPENSE, SET_CURRENCIES } from "../actions";

export type WalletActionType =
  | { type: typeof SET_CURRENCIES; payload: string[] }
  | { type: typeof ADD_EXPENSE; payload: ExpenseType };

const initialState = {
  currencies: [] as string[],
  expenses: [] as ExpenseType[],
};

export default function walletReducer(state = initialState, action: WalletActionType) {
  switch (action.type) {
    case SET_CURRENCIES:
      return { ...state, currencies: action.payload };
    case ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    default:
      return state;
  }
}
