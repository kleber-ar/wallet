import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/reducers";
import { fetchCurrencies, fetchAndAddExpense } from "../redux/actions";
import type { AppDispatch } from "../redux";


export default function WalletForm() {
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector((state: RootState) => state.wallet.currencies);

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expenseData = {
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(fetchAndAddExpense(expenseData));
    setValue('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="value-input"
        required
        placeholder="Valor"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        required
        data-testid="description-input"
        placeholder="Descrição"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={currency} onChange={(e) => setCurrency(e.target.value)} data-testid="currency-input">
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
      <select value={method} onChange={(e) => setMethod(e.target.value)} data-testid="method-input">
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
      <select value={tag} onChange={(e) => setTag(e.target.value)} data-testid="tag-input">
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>

      <button type="submit">Adicionar despesas</button>
    </form>
  );
}
