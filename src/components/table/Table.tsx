import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/reducers";
import { deleteExpense } from "../../redux/actions";
import type { ExpenseType } from "../../types";
import { useState } from "react";
import EditExpenseModal from "../EditModal";
import './Table.css'

export default function Table() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const [editingExpense, setEditingExpense] = useState<ExpenseType | null>(null);
  const dispach = useDispatch();

  const handleDelete = (id: number) => {
    dispach(deleteExpense(id))
  }

  const handleEdit = (expenseToEdit: ExpenseType) => {
    setEditingExpense(expenseToEdit);
  };

  const handleCloseModal = () => {
    setEditingExpense(null);
  };

  if (expenses.length === 0) {
    return <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Sem despesas</h1>;
  }

  if (editingExpense) {
    return <EditExpenseModal expense={editingExpense} onClose={handleCloseModal} />
  }

  return (
    <div className="table-container">
      <table>
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
              <tr key={id} data-testid='expense'>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{currencyName}</td>
                <td>{exchangeRate.toFixed(2)}</td>
                <td>{convertedValue.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button onClick={() => handleEdit(expense)} data-testid='btnEdit'>Editar</button>
                  <button onClick={() => handleDelete(id)} data-testid='btnDelete'>Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table >

    </div>
  );
}
