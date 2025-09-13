import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/reducers";
import { deleteExpense } from "../redux/actions";

export default function Table() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const dispach = useDispatch();

  const handleDelete = (id: number) => {
    dispach(deleteExpense(id))
  }

  return (
    <table border={1} cellSpacing={0} cellPadding={5}>

      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilazado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => {
          const { id, value, description, currency, method, tag, exchangeRates } = expense;

          const exchangeRate = Number(exchangeRates[currency].ask);
          const currencyName = exchangeRates[currency].name;
          const convertedValue = Number(value) * exchangeRate;

          return (
            <tr key={id}>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{currencyName}</td>
              <td>{exchangeRate.toFixed(2)}</td>
              <td>{convertedValue.toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button>Editar</button>
                <button onClick={() => handleDelete(id)}>Excluir</button>
              </td>
            </tr>
          );
        })}
      </tbody>

    </table >
  );
}
