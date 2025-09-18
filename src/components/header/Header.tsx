import { useSelector } from "react-redux";
import type { RootState } from "../../redux/reducers";
import Logo from "../Logo";
import userIcon from "../../assets/user.svg";
import coinIcon from "../../assets/Moedas.svg";
import './Header.css';

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
    <div className="header-container">
      <header>
        <Logo />
        <div>
          <img src={userIcon} alt="user" />
          <p data-testid="email-field">{email}</p>
        </div>
        <div>
          <img src={coinIcon} alt="Moedas" />
          <p data-testid="total-field">Total: R${total.toFixed(2)}</p>
          <p data-testid="header-currency-field">(BRL)</p>
        </div>
      </header>
    </div>
  );
}

export default Header;
