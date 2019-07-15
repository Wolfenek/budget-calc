import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const Item = ({
  expense: { id, charge, amount },
  handleEdit,
  handleDelete
}) => {
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">PLN {amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          onClick={() => handleEdit(id)}
          aria-label="edit-button"
        >
          <MdEdit className="btn-icon" />
        </button>
        <button
          className="clear-btn"
          onClick={() => handleDelete(id)}
          aria-label="edit-button"
        >
          <MdDelete className="clearn-icon" aria-label="edit-button" />
        </button>
      </div>
    </li>
  );
};

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
