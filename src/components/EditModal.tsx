import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editExpense } from '../redux/actions';
import { type ExpenseType } from '../types';
import type { AppDispatch } from '../redux';
import './EditModal.css';

interface EditModalProps {
  expense: ExpenseType;
  onClose: () => void;
}

export default function EditExpenseModal({ expense, onClose }: EditModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [updatedExpense, setUpdatedExpense] = useState<ExpenseType>(expense);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedExpense({
      ...updatedExpense,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editExpense(updatedExpense));
    onClose(); // Fecha o modal após a edição
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Despesa</h2>
        <form onSubmit={handleSubmit}>
          <p>Valor: </p>
          <input
            data-testid="editValueInput"
            type="text"
            name="value"
            value={updatedExpense.value}
            onChange={handleChange}
          />
          <p>Descrição: </p>
          <input
            data-testid="editDescInput"
            type="text"
            name="description"
            value={updatedExpense.description}
            onChange={handleChange}
          />
          <button type="submit" data-testid="editSaveBtn">Salvar Alterações</button>
          <button type="button" onClick={onClose} data-testid="editCancelBtn">Cancelar</button>
        </form>
      </div>
    </div>
  );
}
