import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import uuid from "uuid";
import "./App.css";

const alertTime = 3000;
//

const initialExpenses = localStorage.getItem("storage")
  ? JSON.parse(localStorage.getItem("storage"))
  : [];

function App() {
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // id of edited item
  const [idOfItem, setIdOfItem] = useState(0);
  // Effect
  useEffect(() => {
    localStorage.setItem("storage", JSON.stringify(expenses));
  }, [expenses]);

  // *** Functions ***
  const handleCharge = e => {
    setCharge(e.target.value);
  };

  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, alertTime);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.table([charge, amount]);
    if (charge !== "" && amount > 0) {
      if (edit) {
        const tempExpenses = expenses.map(item => {
          return item.id === idOfItem ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        handleAlert({
          type: "info",
          text: "item updated"
        });
        setEdit(false);
      } else {
        const newExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, newExpense]);
        handleAlert({ type: "success", text: "Item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // handle error alert
      handleAlert({
        type: "danger",
        text: `Please add your item. Also, amout has to be bigger than 0`
      });
    }
  };

  // clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "info", text: "all items deleted" });
  };

  // handle delete
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "info", text: "item deleted" });
  };

  // handle edit
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setIdOfItem(id);
  };

  return (
    <>
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total spending:{" "}
        <span className="total">
          PLN{" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
    </>
  );
}

export default App;
