// Variables
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Functions
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount.toFixed(2)}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name !== '' && !isNaN(amount)) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    } else {
        alert('Please enter valid data.');
    }
}

function editExpense(index) {
    const expense = expenses[index];
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    
    deleteExpense(index);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Event Listeners
addExpenseButton.addEventListener('click', addExpense);

// Initialize
renderExpenses();
