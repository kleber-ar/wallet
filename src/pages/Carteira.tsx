import { useSelector } from "react-redux";
import type { RootSatet } from "../redux/reducers";

export default function Carteira() {
  const email = useSelector((state: RootSatet) => state.user.email);

  return (
    <div>
      <h1>Carteira</h1>
      <h2>Bem vindo, {email}</h2>
    </div>
  );
}
