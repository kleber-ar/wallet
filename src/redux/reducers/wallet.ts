import { type ExpenseType } from '../../types.ts'
import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SET_CURRENCIES } from "../actions";

export type WalletActionType =
  | { type: typeof SET_CURRENCIES; payload: string[] }
  | { type: typeof ADD_EXPENSE; payload: ExpenseType }
  | { type: typeof DELETE_EXPENSE; payload: number }
  | { type: typeof EDIT_EXPENSE; payload: ExpenseType };

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
      return { ...state, expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) => expense.id === action.payload.id ? { ...expense, ...action.payload } : expense),
      };
    default:
      return state;
  }
}
