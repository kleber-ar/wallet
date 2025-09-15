import { useSelector } from "react-redux";
import type { RootState } from "../redux/reducers";

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  const total = expenses.reduce((acc, expense) => {
    const value = Number(expense.value);
    const currency = expense.currency;
    const exchangeRate = Number(expense.exchangeRates[currency].ask);
    return acc + value * exchangeRate;
  }, 0);


  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">{total.toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
