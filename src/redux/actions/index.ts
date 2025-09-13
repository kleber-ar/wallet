import type { Dispatch } from "@reduxjs/toolkit";
import type { ExpenseType } from "../../types";
import type { RootState } from "../reducers";

export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = "SET_CURRENCIES";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";

type SetEmailAction = {
  type: typeof SET_EMAIL;
  payload: string;
};

type SetCurrenciesAction = {
  type: typeof SET_CURRENCIES;
  payload: string[];
};

type AddExpenseAction = {
  type: typeof ADD_EXPENSE;
  payload: ExpenseType;
};

type DeleteExpenseAction = {
  type: typeof DELETE_EXPENSE;
  payload: number,
}

// union type para todas as actions
export type AppAction = SetEmailAction | SetCurrenciesAction | AddExpenseAction | DeleteExpenseAction;

export function setEmail(email: string) {
  return {
    type: SET_EMAIL,
    payload: email,
  } as SetEmailAction;
}

export const setCurrencies = (currencies: string[]) => ({
  type: SET_CURRENCIES,
  payload: currencies,
} as SetCurrenciesAction);

export const addExpense = (expense: ExpenseType) => ({
  type: ADD_EXPENSE,
  payload: expense,
} as AddExpenseAction);

export const deleteExpense = (id: number) => ({
  type: DELETE_EXPENSE,
  payload: id,
} as DeleteExpenseAction)

// Thunk do fetch currencies vindo da API
export const fetchCurrencies = () => {
  return async (dispatch: Dispatch<AppAction>) => {
    const res = await fetch("https://economia.awesomeapi.com.br/json/all");
    const data = await res.json();
    const currencies = Object.keys(data).filter((key) => key !== 'USDT');
    dispatch(setCurrencies(currencies));
  };
};

// Thunk para add expense com exchange rates atualizado
export const fetchAndAddExpense = (expenseData: Omit<ExpenseType, 'id' | 'exchangeRates'>) => {
  return async (dispatch: Dispatch<AppAction>, getState: () => RootState) => {
    const res = await fetch("https://economia.awesomeapi.com.br/json/all");
    const exchangeRates = await res.json();
    const state = getState();
    const nextId = state.wallet.expenses.length;
    const expense: ExpenseType = {
      ...expenseData,
      id: nextId,
      exchangeRates,
    };
    dispatch(addExpense(expense));
  };
};
