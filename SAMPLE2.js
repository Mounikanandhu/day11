const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const addBtn = document.getElementById("add-btn");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${expense.name} - ₹${expense.amount}</span>
      <button class="remove-btn" onclick="removeExpense(${index})">X</button>
    `;
    expenseList.appendChild(li);
  });
  updateTotal();
}

function removeExpense(index) {
  expenses.splice(index, 1);
  saveToLocalStorage();
  renderExpenses();
}

addBtn.addEventListener("click", () => {
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense name and amount!");
    return;
  }

  expenses.push({ name, amount });
  saveToLocalStorage();
  renderExpenses();

  expenseName.value = "";
  expenseAmount.value = "";
});

// Initial render
renderExpenses();
