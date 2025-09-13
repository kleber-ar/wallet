import { type ExpenseType } from '../../types.ts'
import { ADD_EXPENSE, DELETE_EXPENSE, SET_CURRENCIES } from "../actions";

export type WalletActionType =
  | { type: typeof SET_CURRENCIES; payload: string[] }
  | { type: typeof ADD_EXPENSE; payload: ExpenseType }
  | { type: typeof DELETE_EXPENSE; payload: number };

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
    case DELETE_EXPENSE:
      return { ...state, expenses: state.expenses.filter((expense) => expense.id !== action.payload) }
    default:
      return state;
  }
}
