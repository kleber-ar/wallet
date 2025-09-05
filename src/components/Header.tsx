import { useSelector } from "react-redux";
import type { RootState } from "../redux/reducers";

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const total = 0;

  return (
    <header>
      <p>{email}</p>
      <p>{total}</p>
      <p>BRL</p>
    </header>
  );
}

export default Header;
