# Xpense Tracker

A modern, responsive personal finance application for tracking expenses, managing budgets, and monitoring financial activity.

## Features

### 1. Financial Dashboard
- **Key Financial Metrics:** View net balance, total income, total expenses, and budget utilization.
- **Savings Rate:** Track your savings rate based on income and expenses.
- **Timeframe Filters:** View financial data for this month, last month, the last three months, this year, or all time.
- **Multi-Currency Support:** Choose from USD, EUR, GBP, INR, JPY, CAD, and AUD.

### 2. Transaction Management
- **Transaction Operations:** Add, edit, and delete transactions through validated forms.
- **Income and Expense Tracking:** Easily distinguish between income and expenses.
- **Transaction Details:** Record descriptions, amounts, categories, dates, payment methods, and additional notes.
- **Search and Filtering:** Search by keyword, filter by transaction type or category, and sort by date or amount.
- **Delete Confirmation:** Review transaction details before confirming deletion.

### 3. Categories and Budget Management
- **Predefined Categories:** Separate categories for common expenses, including housing, food, groceries, transportation, utilities, entertainment, shopping, health, and travel, as well as income sources such as salary, freelance work, and investments.
- **Monthly Category Budgets:** Set individual spending limits for each expense category.
- **Budget Progress Tracking:** Monitor spending through progress bars and status indicators:
  - On Track: Less than 80% of the budget used.
  - Near Cap: Between 80% and 99% of the budget used.
  - Over Budget: 100% or more of the budget used, with the excess amount displayed.
- **Budget Management:** Adjust category spending limits whenever needed.

### 4. Financial Analytics and Visualizations
- **Spending Breakdown:** Interactive donut chart showing spending distribution by category, including percentages and total amounts.
- **Monthly Cash Flow:** Bar chart comparing income and expenses across recent months.
- **Financial Trends:** Six-month overview of income, expenses, and net savings.
- **Budget Comparison:** Visual comparison of planned budgets against actual spending.
- **Payment Method Analysis:** Pie chart showing spending distribution across payment methods.

Charts and visualizations are powered by Chart.js.

### 5. Additional Features
- **Automatic Data Persistence:** Transaction and budget data are saved locally using browser localStorage.
- **Sample Data:** Includes sample transactions for exploring the application's features.
- **Data Reset:** Reset the application to its initial state.
- **CSV Export:** Export transaction records for external use.
- **Theme Switching:** Toggle between dark and light themes.
- **Responsive Interface:** Optimized for desktops, laptops, tablets, and mobile devices.

## Getting Started

Xpense Tracker is built using HTML, CSS, and vanilla JavaScript. No dependency installation or build process is required.

### Option 1: Open Directly in a Browser

Open `index.html` in any modern web browser, such as Chrome, Edge, Firefox, or Safari.

### Option 2: Run Using a Local Server

Alternatively, you can start a local HTTP server.

**Using Python:**

```bash
python -m http.server 8080
```

**Using Node.js:**

```bash
npx serve .
```

Once the server is running, open the following address in your browser:

`http://localhost:8080`

## Project Structure

```text
xpense-tracker/
index.html    # Application structure and layout
styles.css    # Styling, themes, and responsive design
app.js        # Application logic, state management, and charts
README.md     # Project documentation
```

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Chart.js
- Browser localStorage