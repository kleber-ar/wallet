import type { AnyAction, Dispatch } from "@reduxjs/toolkit";
import type { ExpenseType } from "../../types";

export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = "SET_CURRENCIES";
export const ADD_EXPENSE = "ADD_EXPENSE";

export function setEmail(email: string) {
  return {
    type: SET_EMAIL,
    payload: email,
  };
}

export const setCurrencies = (currencies: string[]) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expense: ExpenseType) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

// Thunk para buscar moedas da API
export const fetchCurrencies = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const res = await fetch("https://economia.awesomeapi.com.br/json/all");
    const data = await res.json();
    const currencies = Object.keys(data).filter((key) => key !== 'USDT');
    dispatch(setCurrencies(currencies));
  };
};
