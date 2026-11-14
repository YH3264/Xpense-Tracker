/**
 * xpense Tracker - Interactive Personal Finance & Budgeting Application
 * Pure Vanilla JavaScript (No React / Frameworks)
 */

// =================================================================
// 1. CONSTANTS & DEFAULT DATA
// =================================================================

const STORAGE_KEYS = {
  TRANSACTIONS: 'xpense_tracker_transactions',
  BUDGETS: 'xpense_tracker_budgets',
  THEME: 'xpense_tracker_theme',
  CURRENCY: 'xpense_tracker_currency'
};

const DEFAULT_CATEGORIES = [
  // Expense Categories
  { id: 'housing', name: 'Housing & Rent', icon: 'fa-house', color: '#6366f1', type: 'expense' },
  { id: 'food', name: 'Food & Dining', icon: 'fa-utensils', color: '#f59e0b', type: 'expense' },
  { id: 'groceries', name: 'Groceries', icon: 'fa-basket-shopping', color: '#10b981', type: 'expense' },
  { id: 'transport', name: 'Transportation', icon: 'fa-car', color: '#06b6d4', type: 'expense' },
  { id: 'utilities', name: 'Bills & Utilities', icon: 'fa-bolt', color: '#eab308', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', icon: 'fa-film', color: '#ec4899', type: 'expense' },
  { id: 'shopping', name: 'Shopping', icon: 'fa-bag-shopping', color: '#8b5cf6', type: 'expense' },
  { id: 'health', name: 'Health & Fitness', icon: 'fa-heart-pulse', color: '#14b8a6', type: 'expense' },
  { id: 'travel', name: 'Travel & Vacations', icon: 'fa-plane', color: '#3b82f6', type: 'expense' },
  { id: 'other-expense', name: 'Miscellaneous', icon: 'fa-circle-question', color: '#64748b', type: 'expense' },

  // Income Categories
  { id: 'salary', name: 'Salary & Wages', icon: 'fa-money-bill-wave', color: '#10b981', type: 'income' },
  { id: 'freelance', name: 'Freelance & Side Hustle', icon: 'fa-laptop-code', color: '#06b6d4', type: 'income' },
  { id: 'investments', name: 'Investments & Dividends', icon: 'fa-chart-line', color: '#8b5cf6', type: 'income' },
  { id: 'gifts', name: 'Gifts & Grants', icon: 'fa-gift', color: '#ec4899', type: 'income' },
  { id: 'other-income', name: 'Other Income', icon: 'fa-circle-dollar-to-slot', color: '#14b8a6', type: 'income' }
];

const DEFAULT_BUDGETS = {
  housing: 1200,
  food: 450,
  groceries: 350,
  transport: 180,
  utilities: 200,
  entertainment: 150,
  shopping: 250,
  health: 100,
  travel: 300,
  'other-expense': 100
};

// Generate realistic date strings relative to today
function getRelativeDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function getInitialDemoTransactions() {
  return [
    {
      id: 'tx-1',
      title: 'Monthly Salary Deposit',
      amount: 4200.00,
      type: 'income',
      categoryId: 'salary',
      date: getRelativeDate(1),
      paymentMethod: 'Bank Transfer',
      notes: 'Direct employer payroll deposit',
      createdAt: Date.now() - 86400000
    },
    {
      id: 'tx-2',
      title: 'Apartment Rent',
      amount: 1150.00,
      type: 'expense',
      categoryId: 'housing',
      date: getRelativeDate(2),
      paymentMethod: 'Bank Transfer',
      notes: 'November lease payment',
      createdAt: Date.now() - 172800000
    },
    {
      id: 'tx-3',
      title: 'Organic Food Market',
      amount: 142.50,
      type: 'expense',
      categoryId: 'groceries',
      date: getRelativeDate(3),
      paymentMethod: 'Credit Card',
      notes: 'Weekly pantry & fresh veggies',
      createdAt: Date.now() - 259200000
    },
    {
      id: 'tx-4',
      title: 'Freelance Web Design Project',
      amount: 750.00,
      type: 'income',
      categoryId: 'freelance',
      date: getRelativeDate(4),
      paymentMethod: 'UPI / Digital',
      notes: 'Landing page client milestone',
      createdAt: Date.now() - 345600000
    },
    {
      id: 'tx-5',
      title: 'Electric & High-Speed Internet',
      amount: 135.20,
      type: 'expense',
      categoryId: 'utilities',
      date: getRelativeDate(5),
      paymentMethod: 'Credit Card',
      notes: 'Fiber net + power grid bill',
      createdAt: Date.now() - 432000000
    },
    {
      id: 'tx-6',
      title: 'Dinner at Italian Bistro',
      amount: 88.00,
      type: 'expense',
      categoryId: 'food',
      date: getRelativeDate(6),
      paymentMethod: 'Debit Card',
      notes: 'Dinner with coworkers',
      createdAt: Date.now() - 518400000
    },
    {
      id: 'tx-7',
      title: 'Gasoline & Fuel',
      amount: 54.00,
      type: 'expense',
      categoryId: 'transport',
      date: getRelativeDate(8),
      paymentMethod: 'Credit Card',
      notes: 'Shell station refuel',
      createdAt: Date.now() - 691200000
    },
    {
      id: 'tx-8',
      title: 'Streaming & Cinema Pass',
      amount: 45.99,
      type: 'expense',
      categoryId: 'entertainment',
      date: getRelativeDate(10),
      paymentMethod: 'Credit Card',
      notes: 'Netflix & IMAX weekend tickets',
      createdAt: Date.now() - 864000000
    },
    {
      id: 'tx-9',
      title: 'Sneakers & Winter Jacket',
      amount: 195.00,
      type: 'expense',
      categoryId: 'shopping',
      date: getRelativeDate(12),
      paymentMethod: 'Credit Card',
      notes: 'Seasonal wardrobe refresh',
      createdAt: Date.now() - 1036800000
    },
    {
      id: 'tx-10',
      title: 'Dividend Payout',
      amount: 125.40,
      type: 'income',
      categoryId: 'investments',
      date: getRelativeDate(14),
      paymentMethod: 'Bank Transfer',
      notes: 'S&P Index fund quarterly dividend',
      createdAt: Date.now() - 1209600000
    },
    {
      id: 'tx-11',
      title: 'Gym Membership & Supplements',
      amount: 72.00,
      type: 'expense',
      categoryId: 'health',
      date: getRelativeDate(16),
      paymentMethod: 'Debit Card',
      notes: 'Monthly gym sub + Whey protein',
      createdAt: Date.now() - 1382400000
    },
    {
      id: 'tx-12',
      title: 'Flight Ticket Reservation',
      amount: 240.00,
      type: 'expense',
      categoryId: 'travel',
      date: getRelativeDate(20),
      paymentMethod: 'Credit Card',
      notes: 'Weekend getaway flight ticket',
      createdAt: Date.now() - 1728000000
    },
    // Older transactions from prior month to give rich multi-month trends
    {
      id: 'tx-13',
      title: 'Prior Month Salary',
      amount: 4200.00,
      type: 'income',
      categoryId: 'salary',
      date: getRelativeDate(35),
      paymentMethod: 'Bank Transfer',
      notes: 'October payroll',
      createdAt: Date.now() - 3024000000
    },
    {
      id: 'tx-14',
      title: 'Prior Month Rent',
      amount: 1150.00,
      type: 'expense',
      categoryId: 'housing',
      date: getRelativeDate(36),
      paymentMethod: 'Bank Transfer',
      notes: 'October rent',
      createdAt: Date.now() - 3110400000
    },
    {
      id: 'tx-15',
      title: 'Grocery Warehouse Haul',
      amount: 310.00,
      type: 'expense',
      categoryId: 'groceries',
      date: getRelativeDate(40),
      paymentMethod: 'Credit Card',
      notes: 'Costco bulk food supply',
      createdAt: Date.now() - 3456000000
    },
    {
      id: 'tx-16',
      title: 'Freelance Mobile App',
      amount: 600.00,
      type: 'income',
      categoryId: 'freelance',
      date: getRelativeDate(45),
      paymentMethod: 'UPI / Digital',
      notes: 'UI bug fix contract',
      createdAt: Date.now() - 3888000000
    }
  ];
}

// =================================================================
// 2. APPLICATION STATE
// =================================================================

const state = {
  transactions: [],
  budgets: { ...DEFAULT_BUDGETS },
  currency: '$',
  theme: 'dark',
  currentView: 'dashboard',
  timeRange: 'this-month',
  
  // Transactions View Filtering State
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date-desc'
  },

  // Modal and deletion states
  editingTransactionId: null,
  pendingDeleteId: null,

  // Chart instances
  charts: {
    donut: null,
    trend: null,
    analytics: null,
    budgetVsActual: null,
    paymentMethods: null
  }
};

// =================================================================
// 3. STORAGE & INITIALIZATION
// =================================================================

function loadState() {
  try {
    const savedTx = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (savedTx) {
      state.transactions = JSON.parse(savedTx);
    } else {
      state.transactions = getInitialDemoTransactions();
      saveTransactions();
    }

    const savedBudgets = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    if (savedBudgets) {
      state.budgets = JSON.parse(savedBudgets);
    } else {
      state.budgets = { ...DEFAULT_BUDGETS };
      saveBudgets();
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
      state.theme = savedTheme;
    }

    const savedCurrency = localStorage.getItem(STORAGE_KEYS.CURRENCY);
    if (savedCurrency) {
      state.currency = savedCurrency;
    }
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
    state.transactions = getInitialDemoTransactions();
    state.budgets = { ...DEFAULT_BUDGETS };
  }
}

function saveTransactions() {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(state.transactions));
  } catch (e) {
    console.error('Storage write error', e);
  }
}

function saveBudgets() {
  try {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(state.budgets));
  } catch (e) {
    console.error('Storage write error', e);
  }
}

// =================================================================
// 4. UTILITIES & FORMATTING
// =================================================================

function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return `${state.currency}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return dateStr;
}

function getCategoryById(id) {
  return DEFAULT_CATEGORIES.find(c => c.id === id) || {
    id: 'unknown',
    name: 'General',
    icon: 'fa-tags',
    color: '#94a3b8',
    type: 'expense'
  };
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'fa-circle-info';
  if (type === 'success') iconClass = 'fa-circle-check';
  if (type === 'danger') iconClass = 'fa-circle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Filter transactions by the selected timeframe
function getFilteredByTimeRange(transactions, range) {
  if (range === 'all') return transactions;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  return transactions.filter(t => {
    if (!t.date) return false;
    const [year, month, day] = t.date.split('-').map(Number);
    const txDate = new Date(year, month - 1, day);

    if (range === 'this-month') {
      return year === currentYear && (month - 1) === currentMonth;
    }

    if (range === 'last-month') {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return year === prevYear && (month - 1) === prevMonth;
    }

    if (range === 'last-3-months') {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return txDate >= threeMonthsAgo && txDate <= now;
    }

    if (range === 'this-year') {
      return year === currentYear;
    }

    return true;
  });
}

// =================================================================
// 5. STATS & COMPUTATIONS
// =================================================================

function computeSummary(transactions) {
  let income = 0;
  let expense = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  transactions.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'income') {
      income += amt;
      incomeCount++;
    } else {
      expense += amt;
      expenseCount++;
    }
  });

  const balance = income - expense;
  const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;

  // Compute category totals
  const categoryExpenses = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categoryExpenses[t.categoryId] = (categoryExpenses[t.categoryId] || 0) + parseFloat(t.amount || 0);
  });

  // Total allocated budget
  const totalAllocatedBudget = Object.values(state.budgets).reduce((acc, b) => acc + (parseFloat(b) || 0), 0);
  const budgetUsedPct = totalAllocatedBudget > 0 ? Math.round((expense / totalAllocatedBudget) * 100) : 0;
  const budgetRemaining = Math.max(0, totalAllocatedBudget - expense);

  return {
    income,
    expense,
    balance,
    savingsRate,
    incomeCount,
    expenseCount,
    categoryExpenses,
    totalAllocatedBudget,
    budgetUsedPct,
    budgetRemaining
  };
}

// =================================================================
// 6. RENDERERS
// =================================================================

// Main Dashboard KPIs & Sub-widgets
function renderDashboard() {
  const currentPeriodTx = getFilteredByTimeRange(state.transactions, state.timeRange);
  const stats = computeSummary(currentPeriodTx);

  // 1. KPI Cards
  const netBalanceEl = document.getElementById('kpiNetBalance');
  const totalIncomeEl = document.getElementById('kpiTotalIncome');
  const totalExpensesEl = document.getElementById('kpiTotalExpenses');
  const savingsRateBadge = document.getElementById('kpiSavingsRateBadge');
  const incomeCountEl = document.getElementById('kpiIncomeCount');
  const expenseCountEl = document.getElementById('kpiExpenseCount');
  const budgetUsedEl = document.getElementById('kpiBudgetUsed');
  const budgetRemainingEl = document.getElementById('kpiBudgetRemaining');

  if (netBalanceEl) {
    netBalanceEl.textContent = formatCurrency(stats.balance);
    if (stats.balance >= 0) {
      netBalanceEl.classList.remove('text-danger');
    } else {
      netBalanceEl.classList.add('text-danger');
    }
  }

  if (totalIncomeEl) totalIncomeEl.textContent = formatCurrency(stats.income);
  if (totalExpensesEl) totalExpensesEl.textContent = formatCurrency(stats.expense);
  if (incomeCountEl) incomeCountEl.textContent = `${stats.incomeCount} transaction${stats.incomeCount !== 1 ? 's' : ''}`;
  if (expenseCountEl) expenseCountEl.textContent = `${stats.expenseCount} transaction${stats.expenseCount !== 1 ? 's' : ''}`;

  if (savingsRateBadge) {
    savingsRateBadge.innerHTML = `<i class="fa-solid fa-arrow-trend-${stats.savingsRate >= 20 ? 'up' : 'down'}"></i> ${stats.savingsRate}%`;
    savingsRateBadge.className = `kpi-trend ${stats.savingsRate >= 20 ? 'positive' : 'negative'}`;
  }

  if (budgetUsedEl) {
    budgetUsedEl.textContent = `${stats.budgetUsedPct}%`;
    if (stats.budgetUsedPct > 100) {
      budgetUsedEl.className = 'kpi-value text-danger';
    } else if (stats.budgetUsedPct > 80) {
      budgetUsedEl.className = 'kpi-value text-warning';
    } else {
      budgetUsedEl.className = 'kpi-value text-success';
    }
  }

  if (budgetRemainingEl) {
    budgetRemainingEl.textContent = `${formatCurrency(stats.budgetRemaining)} remaining`;
  }

  // Sidebar health badge
  const sidebarBudgetProg = document.getElementById('sidebarBudgetProgress');
  const sidebarBudgetSummary = document.getElementById('budgetHealthSummary');
  if (sidebarBudgetProg && sidebarBudgetSummary) {
    const clampedPct = Math.min(100, stats.budgetUsedPct);
    sidebarBudgetProg.style.width = `${clampedPct}%`;
    if (stats.budgetUsedPct > 100) {
      sidebarBudgetProg.style.background = 'var(--danger)';
      sidebarBudgetSummary.textContent = `${stats.budgetUsedPct - 100}% over monthly budget`;
    } else {
      sidebarBudgetProg.style.background = 'linear-gradient(90deg, var(--success), #34d399)';
      sidebarBudgetSummary.textContent = `${100 - stats.budgetUsedPct}% budget remaining`;
    }
  }

  // 2. Dashboard Recent Transactions Table (Latest 5)
  renderRecentTransactions(currentPeriodTx);

  // 3. Dashboard Category Budgets Preview (Top 4)
  renderDashboardBudgetsPreview(stats.categoryExpenses);

  // 4. Update Charts
  updateDashboardCharts(currentPeriodTx, stats);
}

// Render Recent Transactions snippet on Dashboard
function renderRecentTransactions(transactions) {
  const tbody = document.getElementById('recentTransactionsTableBody');
  if (!tbody) return;

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  if (sorted.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="table-empty">
          <i class="fa-solid fa-receipt"></i>
          <p>No transactions found for this period.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = sorted.map(t => {
    const category = getCategoryById(t.categoryId);
    const isIncome = t.type === 'income';
    const sign = isIncome ? '+' : '-';
    const amountClass = isIncome ? 'text-success' : 'text-danger';

    return `
      <tr>
        <td>
          <div class="tx-title-cell">
            <div class="tx-icon-badge" style="background-color: ${category.color}20; color: ${category.color};">
              <i class="fa-solid ${category.icon}"></i>
            </div>
            <div class="tx-title-meta">
              <span class="tx-title-text">${escapeHtml(t.title)}</span>
              ${t.notes ? `<span class="tx-note-text">${escapeHtml(t.notes)}</span>` : ''}
            </div>
          </div>
        </td>
        <td>
          <span class="tx-category-badge" style="border-color: ${category.color}40;">
            <i class="fa-solid ${category.icon}" style="color: ${category.color};"></i>
            ${category.name}
          </span>
        </td>
        <td>${formatDate(t.date)}</td>
        <td class="text-right">
          <span class="tx-amount ${amountClass}">${sign}${formatCurrency(t.amount)}</span>
        </td>
        <td class="text-center">
          <div class="tx-actions-cell">
            <button class="action-icon-btn" onclick="openEditModal('${t.id}')" title="Edit">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="action-icon-btn delete-btn" onclick="openDeleteModal('${t.id}')" title="Delete">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Render Category Budgets Preview in Dashboard
function renderDashboardBudgetsPreview(categoryExpenses) {
  const container = document.getElementById('dashboardBudgetsList');
  if (!container) return;

  const expenseCategories = DEFAULT_CATEGORIES.filter(c => c.type === 'expense');
  // Sort categories by highest spent
  const sortedCategories = [...expenseCategories].sort((a, b) => {
    const spentA = categoryExpenses[a.id] || 0;
    const spentB = categoryExpenses[b.id] || 0;
    return spentB - spentA;
  }).slice(0, 4);

  container.innerHTML = sortedCategories.map(cat => {
    const budget = state.budgets[cat.id] || 0;
    const spent = categoryExpenses[cat.id] || 0;
    const pct = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : (spent > 0 ? 100 : 0);
    const isOver = spent > budget && budget > 0;
    const remaining = Math.max(0, budget - spent);

    let barColor = 'var(--success)';
    let statusClass = 'pill-safe';
    let statusText = 'On Track';

    if (isOver) {
      barColor = 'var(--danger)';
      statusClass = 'pill-danger';
      statusText = 'Over Budget';
    } else if (pct >= 80) {
      barColor = 'var(--warning)';
      statusClass = 'pill-warn';
      statusText = 'Near Limit';
    }

    return `
      <div class="budget-item">
        <div class="budget-item-header">
          <div class="budget-item-name" style="color: ${cat.color}">
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.name}</span>
          </div>
          <div class="budget-item-amounts">
            <strong>${formatCurrency(spent)}</strong> <span>/ ${formatCurrency(budget)}</span>
          </div>
        </div>
        <div class="budget-item-bar">
          <div class="budget-bar-fill" style="width: ${pct}%; background-color: ${barColor};"></div>
        </div>
        <div class="budget-item-footer">
          <span>${isOver ? `Exceeded by ${formatCurrency(spent - budget)}` : `${formatCurrency(remaining)} left`}</span>
          <span class="budget-status-pill ${statusClass}">${statusText} (${Math.round((spent / (budget || 1)) * 100)}%)</span>
        </div>
      </div>
    `;
  }).join('');
}

// Full Transactions View Table with search, sorting, filtering
function renderFullTransactionsView() {
  const tbody = document.getElementById('fullTransactionsTableBody');
  const countLabel = document.getElementById('transactionsCountLabel');
  const tallyIncome = document.getElementById('tallyIncome');
  const tallyExpense = document.getElementById('tallyExpense');
  const tallyNet = document.getElementById('tallyNet');
  if (!tbody) return;

  // 1. Filter by current timeframe
  let list = getFilteredByTimeRange(state.transactions, state.timeRange);

  // 2. Filter by search text
  const searchVal = state.filters.search.trim().toLowerCase();
  if (searchVal) {
    list = list.filter(t => {
      const cat = getCategoryById(t.categoryId);
      return (
        t.title.toLowerCase().includes(searchVal) ||
        (t.notes && t.notes.toLowerCase().includes(searchVal)) ||
        cat.name.toLowerCase().includes(searchVal) ||
        (t.paymentMethod && t.paymentMethod.toLowerCase().includes(searchVal))
      );
    });
  }

  // 3. Filter by type (expense / income)
  if (state.filters.type !== 'all') {
    list = list.filter(t => t.type === state.filters.type);
  }

  // 4. Filter by category
  if (state.filters.category !== 'all') {
    list = list.filter(t => t.categoryId === state.filters.category);
  }

  // 5. Sorting
  list.sort((a, b) => {
    switch (state.filters.sortBy) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'amount-desc':
        return parseFloat(b.amount) - parseFloat(a.amount);
      case 'amount-asc':
        return parseFloat(a.amount) - parseFloat(b.amount);
      case 'date-desc':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Calculate totals for currently shown filtered set
  let sumInc = 0;
  let sumExp = 0;
  list.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'income') sumInc += amt;
    else sumExp += amt;
  });

  if (countLabel) countLabel.textContent = `Showing ${list.length} transaction${list.length !== 1 ? 's' : ''}`;
  if (tallyIncome) tallyIncome.textContent = formatCurrency(sumInc);
  if (tallyExpense) tallyExpense.textContent = formatCurrency(sumExp);
  if (tallyNet) tallyNet.textContent = formatCurrency(sumInc - sumExp);

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="table-empty">
          <i class="fa-solid fa-filter-circle-xmark"></i>
          <p>No transactions match your search or filter criteria.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(t => {
    const category = getCategoryById(t.categoryId);
    const isIncome = t.type === 'income';
    const sign = isIncome ? '+' : '-';
    const amountClass = isIncome ? 'text-success' : 'text-danger';

    return `
      <tr>
        <td>
          <div class="tx-title-cell">
            <div class="tx-icon-badge" style="background-color: ${category.color}20; color: ${category.color};">
              <i class="fa-solid ${category.icon}"></i>
            </div>
            <div class="tx-title-meta">
              <span class="tx-title-text">${escapeHtml(t.title)}</span>
              ${t.notes ? `<span class="tx-note-text">${escapeHtml(t.notes)}</span>` : ''}
            </div>
          </div>
        </td>
        <td>
          <span class="tx-category-badge" style="border-color: ${category.color}40;">
            <i class="fa-solid ${category.icon}" style="color: ${category.color};"></i>
            ${category.name}
          </span>
        </td>
        <td>
          <span style="font-size: 0.8rem; color: var(--text-secondary);"><i class="fa-regular fa-credit-card"></i> ${escapeHtml(t.paymentMethod || 'Default')}</span>
        </td>
        <td>${formatDate(t.date)}</td>
        <td class="text-right">
          <span class="tx-amount ${amountClass}">${sign}${formatCurrency(t.amount)}</span>
        </td>
        <td class="text-center">
          <div class="tx-actions-cell">
            <button class="action-icon-btn" onclick="openEditModal('${t.id}')" title="Edit">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="action-icon-btn delete-btn" onclick="openDeleteModal('${t.id}')" title="Delete">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Full Budgets View
function renderBudgetsView() {
  const currentMonthTx = getFilteredByTimeRange(state.transactions, 'this-month');
  const stats = computeSummary(currentMonthTx);

  const totalAllocEl = document.getElementById('totalAllocatedBudget');
  const totalSpentEl = document.getElementById('totalBudgetSpent');
  const totalLeftEl = document.getElementById('totalBudgetLeft');
  const overBudgetCntEl = document.getElementById('overBudgetCnt');
  const grid = document.getElementById('allBudgetsGrid');

  let overCount = 0;
  const expenseCategories = DEFAULT_CATEGORIES.filter(c => c.type === 'expense');

  expenseCategories.forEach(c => {
    const budget = state.budgets[c.id] || 0;
    const spent = stats.categoryExpenses[c.id] || 0;
    if (spent > budget && budget > 0) {
      overCount++;
    }
  });

  if (totalAllocEl) totalAllocEl.textContent = formatCurrency(stats.totalAllocatedBudget);
  if (totalSpentEl) totalSpentEl.textContent = formatCurrency(stats.expense);
  if (totalLeftEl) totalLeftEl.textContent = formatCurrency(stats.budgetRemaining);
  if (overBudgetCntEl) {
    overBudgetCntEl.textContent = overCount;
    overBudgetCntEl.className = overCount > 0 ? 'stat-num text-danger' : 'stat-num text-success';
  }

  if (!grid) return;

  grid.innerHTML = expenseCategories.map(cat => {
    const budget = state.budgets[cat.id] || 0;
    const spent = stats.categoryExpenses[cat.id] || 0;
    const pct = budget > 0 ? Math.round((spent / budget) * 100) : (spent > 0 ? 100 : 0);
    const isOver = spent > budget && budget > 0;
    const remaining = Math.max(0, budget - spent);

    let barColor = 'var(--success)';
    let statusPill = `<span class="budget-status-pill pill-safe">On Track</span>`;

    if (isOver) {
      barColor = 'var(--danger)';
      statusPill = `<span class="budget-status-pill pill-danger">Over by ${formatCurrency(spent - budget)}</span>`;
    } else if (pct >= 85) {
      barColor = 'var(--warning)';
      statusPill = `<span class="budget-status-pill pill-warn">Near Cap</span>`;
    }

    return `
      <div class="budget-full-card">
        <div class="budget-card-top">
          <div class="budget-card-title">
            <div class="budget-card-icon" style="background-color: ${cat.color}20; color: ${cat.color};">
              <i class="fa-solid ${cat.icon}"></i>
            </div>
            <div>
              <h4>${cat.name}</h4>
              <span>Monthly Target</span>
            </div>
          </div>
          ${statusPill}
        </div>

        <div class="budget-card-numbers">
          <div>
            <span class="budget-spent-num">${formatCurrency(spent)}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);"> spent</span>
          </div>
          <div class="budget-limit-num">
            Limit: <strong>${formatCurrency(budget)}</strong>
          </div>
        </div>

        <div class="budget-item-bar" style="height: 10px;">
          <div class="budget-bar-fill" style="width: ${Math.min(100, pct)}%; background-color: ${barColor};"></div>
        </div>

        <div class="budget-item-footer">
          <span>${isOver ? 'Exceeded Budget' : `${formatCurrency(remaining)} remaining`}</span>
          <span style="font-weight: 700; font-family: var(--font-mono);">${pct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

// Populate the Manage Budgets Modal form with inputs
function populateBudgetModalInputs() {
  const container = document.getElementById('budgetInputsContainer');
  if (!container) return;

  const expenseCategories = DEFAULT_CATEGORIES.filter(c => c.type === 'expense');

  container.innerHTML = expenseCategories.map(cat => {
    const currentVal = state.budgets[cat.id] || 0;
    return `
      <div class="budget-input-row">
        <div class="budget-input-cat-info">
          <div class="tx-icon-badge" style="background-color: ${cat.color}20; color: ${cat.color};">
            <i class="fa-solid ${cat.icon}"></i>
          </div>
          <div>
            <strong>${cat.name}</strong>
          </div>
        </div>
        <div class="input-prefix-wrapper budget-input-field">
          <span class="input-prefix">${state.currency}</span>
          <input type="number" step="10" min="0" name="budget_${cat.id}" value="${currentVal}" class="form-input" required />
        </div>
      </div>
    `;
  }).join('');
}

// Populate Category Dropdown inside Add/Edit Transaction Form
function populateTransactionCategorySelect(selectedType, selectedCatId = null) {
  const select = document.getElementById('txCategory');
  if (!select) return;

  const categories = DEFAULT_CATEGORIES.filter(c => c.type === selectedType);
  select.innerHTML = categories.map(cat => `
    <option value="${cat.id}" ${cat.id === selectedCatId ? 'selected' : ''}>
      ${cat.name}
    </option>
  `).join('');
}

// Populate Filter Category Dropdown in Toolbar
function populateFilterCategorySelect() {
  const select = document.getElementById('categoryFilterSelect');
  if (!select) return;

  select.innerHTML = `
    <option value="all">All Categories</option>
    <optgroup label="Expenses">
      ${DEFAULT_CATEGORIES.filter(c => c.type === 'expense').map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
    </optgroup>
    <optgroup label="Income">
      ${DEFAULT_CATEGORIES.filter(c => c.type === 'income').map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
    </optgroup>
  `;
}

// =================================================================
// 7. CHART.JS VISUALIZATIONS
// =================================================================

function getChartColors() {
  const isDark = state.theme === 'dark';
  return {
    textColor: isDark ? '#9ca3af' : '#475569',
    gridColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
    cardBg: isDark ? '#111827' : '#ffffff'
  };
}

function updateDashboardCharts(transactions, stats) {
  const { textColor, gridColor } = getChartColors();

  // -------------------------------------------------------------
  // Chart 1: Donut Chart - Spending Breakdown by Category
  // -------------------------------------------------------------
  const donutCanvas = document.getElementById('categoryDonutChart');
  const emptyState = document.getElementById('categoryEmptyState');
  const legendContainer = document.getElementById('topCategoriesLegend');
  const countBadge = document.getElementById('categoryCountBadge');

  if (donutCanvas) {
    const expenseData = stats.categoryExpenses;
    const categoryIds = Object.keys(expenseData).filter(id => expenseData[id] > 0);

    if (categoryIds.length === 0) {
      if (state.charts.donut) state.charts.donut.destroy();
      donutCanvas.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      if (legendContainer) legendContainer.innerHTML = '';
      if (countBadge) countBadge.textContent = '0 Categories';
    } else {
      donutCanvas.style.display = 'block';
      if (emptyState) emptyState.style.display = 'none';

      // Sort categories descending by amount
      categoryIds.sort((a, b) => expenseData[b] - expenseData[a]);

      const labels = categoryIds.map(id => getCategoryById(id).name);
      const dataVals = categoryIds.map(id => expenseData[id]);
      const bgColors = categoryIds.map(id => getCategoryById(id).color);

      if (countBadge) countBadge.textContent = `${categoryIds.length} Categories`;

      // Legend underneath
      if (legendContainer) {
        const totalExp = stats.expense || 1;
        legendContainer.innerHTML = categoryIds.slice(0, 5).map(id => {
          const cat = getCategoryById(id);
          const amt = expenseData[id];
          const pct = Math.round((amt / totalExp) * 100);
          return `
            <div class="top-cat-item">
              <div class="top-cat-left">
                <span class="top-cat-dot" style="background-color: ${cat.color};"></span>
                <span>${cat.name}</span>
              </div>
              <div class="top-cat-right">
                <span>${formatCurrency(amt)}</span>
                <span class="top-cat-pct">${pct}%</span>
              </div>
            </div>
          `;
        }).join('');
      }

      if (state.charts.donut) {
        state.charts.donut.data.labels = labels;
        state.charts.donut.data.datasets[0].data = dataVals;
        state.charts.donut.data.datasets[0].backgroundColor = bgColors;
        state.charts.donut.options.plugins.tooltip.callbacks.label = function(ctx) {
          const val = ctx.raw || 0;
          const pct = stats.expense > 0 ? ((val / stats.expense) * 100).toFixed(1) : 0;
          return ` ${ctx.label}: ${formatCurrency(val)} (${pct}%)`;
        };
        state.charts.donut.update();
      } else {
        state.charts.donut = new Chart(donutCanvas, {
          type: 'doughnut',
          data: {
            labels,
            datasets: [{
              data: dataVals,
              backgroundColor: bgColors,
              borderColor: 'transparent',
              hoverOffset: 6,
              cutout: '72%'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function(ctx) {
                    const val = ctx.raw || 0;
                    const pct = stats.expense > 0 ? ((val / stats.expense) * 100).toFixed(1) : 0;
                    return ` ${ctx.label}: ${formatCurrency(val)} (${pct}%)`;
                  }
                }
              }
            }
          }
        });
      }
    }
  }

  // -------------------------------------------------------------
  // Chart 2: Monthly Trends Bar Chart (Monthly Cash Flow)
  // Group past 6 months income and expense
  // -------------------------------------------------------------
  const trendCanvas = document.getElementById('monthlyTrendChart');
  if (trendCanvas) {
    const monthlyData = computeLastNMonthsData(state.transactions, 6);

    if (state.charts.trend) {
      state.charts.trend.data.labels = monthlyData.labels;
      state.charts.trend.data.datasets[0].data = monthlyData.income;
      state.charts.trend.data.datasets[1].data = monthlyData.expense;
      state.charts.trend.options.scales.x.ticks.color = textColor;
      state.charts.trend.options.scales.y.ticks.color = textColor;
      state.charts.trend.options.scales.y.grid.color = gridColor;
      state.charts.trend.update();
    } else {
      state.charts.trend = new Chart(trendCanvas, {
        type: 'bar',
        data: {
          labels: monthlyData.labels,
          datasets: [
            {
              label: 'Income',
              data: monthlyData.income,
              backgroundColor: '#10b981',
              borderRadius: 6,
              barThickness: 16
            },
            {
              label: 'Expense',
              data: monthlyData.expense,
              backgroundColor: '#f43f5e',
              borderRadius: 6,
              barThickness: 16
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor }
            },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: textColor,
                callback: (val) => `${state.currency}${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`
              }
            }
          }
        }
      });
    }
  }
}

// Compute aggregate amounts for the last N calendar months
function computeLastNMonthsData(transactions, n = 6) {
  const labels = [];
  const income = [];
  const expense = [];

  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = d.toLocaleDateString('en-US', { month: 'short' });
    labels.push(monthLabel);

    const targetYear = d.getFullYear();
    const targetMonth = d.getMonth();

    let incSum = 0;
    let expSum = 0;

    transactions.forEach(t => {
      if (!t.date) return;
      const [y, m] = t.date.split('-').map(Number);
      if (y === targetYear && (m - 1) === targetMonth) {
        const amt = parseFloat(t.amount) || 0;
        if (t.type === 'income') incSum += amt;
        else expSum += amt;
      }
    });

    income.push(incSum);
    expense.push(expSum);
  }

  return { labels, income, expense };
}

// Analytics View Charts Initializer
function renderAnalyticsCharts() {
  const { textColor, gridColor } = getChartColors();
  const currentMonthTx = getFilteredByTimeRange(state.transactions, 'this-month');
  const stats = computeSummary(currentMonthTx);

  // 1. Line / Area Chart for 6-month trends
  const analyticsCanvas = document.getElementById('analyticsTrendChart');
  if (analyticsCanvas) {
    const data6m = computeLastNMonthsData(state.transactions, 6);
    const netSavings = data6m.income.map((inc, i) => inc - data6m.expense[i]);

    if (state.charts.analytics) {
      state.charts.analytics.data.labels = data6m.labels;
      state.charts.analytics.data.datasets[0].data = data6m.income;
      state.charts.analytics.data.datasets[1].data = data6m.expense;
      state.charts.analytics.data.datasets[2].data = netSavings;
      state.charts.analytics.options.scales.x.ticks.color = textColor;
      state.charts.analytics.options.scales.y.ticks.color = textColor;
      state.charts.analytics.options.scales.y.grid.color = gridColor;
      state.charts.analytics.update();
    } else {
      state.charts.analytics = new Chart(analyticsCanvas, {
        type: 'line',
        data: {
          labels: data6m.labels,
          datasets: [
            {
              label: 'Income',
              data: data6m.income,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.35,
              fill: true,
              borderWidth: 2,
              pointRadius: 4
            },
            {
              label: 'Expenses',
              data: data6m.expense,
              borderColor: '#f43f5e',
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              tension: 0.35,
              fill: true,
              borderWidth: 2,
              pointRadius: 4
            },
            {
              label: 'Net Savings',
              data: netSavings,
              borderColor: '#6366f1',
              borderDash: [5, 5],
              tension: 0.35,
              fill: false,
              borderWidth: 2,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: textColor, font: { weight: 'bold' } }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: textColor } },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: textColor,
                callback: (val) => `${state.currency}${val}`
              }
            }
          }
        }
      });
    }
  }

  // 2. Budget vs Actual Horizontal Bar Chart
  const budgetVsActualCanvas = document.getElementById('budgetVsActualChart');
  if (budgetVsActualCanvas) {
    const expenseCategories = DEFAULT_CATEGORIES.filter(c => c.type === 'expense');
    const labels = expenseCategories.map(c => c.name);
    const budgets = expenseCategories.map(c => state.budgets[c.id] || 0);
    const actuals = expenseCategories.map(c => stats.categoryExpenses[c.id] || 0);

    if (state.charts.budgetVsActual) {
      state.charts.budgetVsActual.data.labels = labels;
      state.charts.budgetVsActual.data.datasets[0].data = budgets;
      state.charts.budgetVsActual.data.datasets[1].data = actuals;
      state.charts.budgetVsActual.update();
    } else {
      state.charts.budgetVsActual = new Chart(budgetVsActualCanvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Budget Limit',
              data: budgets,
              backgroundColor: 'rgba(99, 102, 241, 0.45)',
              borderColor: '#6366f1',
              borderWidth: 1,
              borderRadius: 4
            },
            {
              label: 'Actual Spent',
              data: actuals,
              backgroundColor: '#f43f5e',
              borderRadius: 4
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: textColor } },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`
              }
            }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, callback: (v) => `${state.currency}${v}` }
            },
            y: { grid: { display: false }, ticks: { color: textColor } }
          }
        }
      });
    }
  }

  // 3. Payment Method Breakdown Chart
  const paymentMethodsCanvas = document.getElementById('paymentMethodsChart');
  if (paymentMethodsCanvas) {
    const methodCounts = {};
    currentMonthTx.forEach(t => {
      const m = t.paymentMethod || 'Other';
      methodCounts[m] = (methodCounts[m] || 0) + (parseFloat(t.amount) || 0);
    });

    const labels = Object.keys(methodCounts);
    const dataVals = Object.values(methodCounts);
    const palette = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6'];

    if (state.charts.paymentMethods) {
      state.charts.paymentMethods.data.labels = labels;
      state.charts.paymentMethods.data.datasets[0].data = dataVals;
      state.charts.paymentMethods.update();
    } else {
      state.charts.paymentMethods = new Chart(paymentMethodsCanvas, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: dataVals,
            backgroundColor: palette.slice(0, labels.length)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { color: textColor } },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.raw)}`
              }
            }
          }
        }
      });
    }
  }
}

// =================================================================
// 8. MODAL HANDLERS & CRUD OPERATIONS
// =================================================================

function openAddModal() {
  state.editingTransactionId = null;
  const modal = document.getElementById('transactionModal');
  const title = document.getElementById('transactionModalTitle');
  const form = document.getElementById('transactionForm');
  if (!modal || !form) return;

  title.textContent = 'Add New Transaction';
  form.reset();

  document.getElementById('transactionId').value = '';
  document.getElementById('txDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('formCurrencyPrefix').textContent = state.currency;

  // Default to expense
  setFormType('expense');

  // Clear errors
  document.getElementById('titleError').style.display = 'none';
  document.getElementById('amountError').style.display = 'none';

  modal.classList.add('open');
  document.getElementById('txTitle').focus();
}

function openEditModal(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;

  state.editingTransactionId = id;
  const modal = document.getElementById('transactionModal');
  const title = document.getElementById('transactionModalTitle');
  if (!modal) return;

  title.textContent = 'Edit Transaction';
  document.getElementById('transactionId').value = tx.id;
  document.getElementById('txTitle').value = tx.title;
  document.getElementById('txAmount').value = tx.amount;
  document.getElementById('txDate').value = tx.date;
  document.getElementById('txPaymentMethod').value = tx.paymentMethod || 'Credit Card';
  document.getElementById('txNotes').value = tx.notes || '';
  document.getElementById('formCurrencyPrefix').textContent = state.currency;

  setFormType(tx.type, tx.categoryId);

  // Clear errors
  document.getElementById('titleError').style.display = 'none';
  document.getElementById('amountError').style.display = 'none';

  modal.classList.add('open');
}

function closeTransactionModal() {
  const modal = document.getElementById('transactionModal');
  if (modal) modal.classList.remove('open');
  state.editingTransactionId = null;
}

function setFormType(type, selectedCategoryId = null) {
  const expenseRadio = document.querySelector('input[name="txType"][value="expense"]');
  const incomeRadio = document.querySelector('input[name="txType"][value="income"]');
  const expenseLabel = document.getElementById('typeExpenseLabel');
  const incomeLabel = document.getElementById('typeIncomeLabel');

  if (type === 'income') {
    incomeRadio.checked = true;
    incomeLabel.classList.add('active');
    expenseLabel.classList.remove('active');
  } else {
    expenseRadio.checked = true;
    expenseLabel.classList.add('active');
    incomeLabel.classList.remove('active');
  }

  populateTransactionCategorySelect(type, selectedCategoryId);
}

function handleTransactionFormSubmit(e) {
  e.preventDefault();

  const titleInput = document.getElementById('txTitle');
  const amountInput = document.getElementById('txAmount');
  const titleError = document.getElementById('titleError');
  const amountError = document.getElementById('amountError');

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = document.querySelector('input[name="txType"]:checked').value;
  const categoryId = document.getElementById('txCategory').value;
  const date = document.getElementById('txDate').value;
  const paymentMethod = document.getElementById('txPaymentMethod').value;
  const notes = document.getElementById('txNotes').value.trim();

  let hasError = false;

  if (!title) {
    titleError.style.display = 'block';
    hasError = true;
  } else {
    titleError.style.display = 'none';
  }

  if (isNaN(amount) || amount <= 0) {
    amountError.style.display = 'block';
    hasError = true;
  } else {
    amountError.style.display = 'none';
  }

  if (hasError) return;

  if (state.editingTransactionId) {
    // Update existing
    const idx = state.transactions.findIndex(t => t.id === state.editingTransactionId);
    if (idx !== -1) {
      state.transactions[idx] = {
        ...state.transactions[idx],
        title,
        amount: Math.round(amount * 100) / 100,
        type,
        categoryId,
        date,
        paymentMethod,
        notes
      };
      showToast('Transaction updated successfully', 'success');
    }
  } else {
    // Create new
    const newTx = {
      id: 'tx-' + Date.now(),
      title,
      amount: Math.round(amount * 100) / 100,
      type,
      categoryId,
      date,
      paymentMethod,
      notes,
      createdAt: Date.now()
    };
    state.transactions.unshift(newTx);
    showToast(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`, 'success');
  }

  saveTransactions();
  closeTransactionModal();
  refreshCurrentView();
}

// Delete Confirmation Modal
function openDeleteModal(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;

  state.pendingDeleteId = id;
  const preview = document.getElementById('deleteTargetPreview');
  const modal = document.getElementById('deleteModal');

  if (preview) {
    const cat = getCategoryById(tx.categoryId);
    preview.innerHTML = `
      <strong>${escapeHtml(tx.title)}</strong><br>
      <span style="color: var(--text-secondary); font-size: 0.8rem;">
        ${cat.name} • ${formatDate(tx.date)} • <strong>${formatCurrency(tx.amount)}</strong>
      </span>
    `;
  }

  if (modal) modal.classList.add('open');
}

function closeDeleteModal() {
  const modal = document.getElementById('deleteModal');
  if (modal) modal.classList.remove('open');
  state.pendingDeleteId = null;
}

function handleConfirmDelete() {
  if (!state.pendingDeleteId) return;

  state.transactions = state.transactions.filter(t => t.id !== state.pendingDeleteId);
  saveTransactions();
  closeDeleteModal();
  showToast('Transaction deleted', 'danger');
  refreshCurrentView();
}

// Manage Budgets Modal
function openBudgetModal() {
  populateBudgetModalInputs();
  const modal = document.getElementById('budgetModal');
  if (modal) modal.classList.add('open');
}

function closeBudgetModal() {
  const modal = document.getElementById('budgetModal');
  if (modal) modal.classList.remove('open');
}

function handleBudgetFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('budgetForm');
  const formData = new FormData(form);

  for (const [key, val] of formData.entries()) {
    if (key.startsWith('budget_')) {
      const catId = key.replace('budget_', '');
      state.budgets[catId] = Math.max(0, parseFloat(val) || 0);
    }
  }

  saveBudgets();
  closeBudgetModal();
  showToast('Category budgets updated successfully', 'success');
  refreshCurrentView();
}

// =================================================================
// 9. EXPORT & DATA HELPERS
// =================================================================

function exportToCSV() {
  if (state.transactions.length === 0) {
    showToast('No transactions to export', 'info');
    return;
  }

  const headers = ['ID', 'Date', 'Type', 'Category', 'Description', 'Amount', 'Currency', 'Payment Method', 'Notes'];
  const rows = state.transactions.map(t => {
    const cat = getCategoryById(t.categoryId);
    return [
      `"${t.id}"`,
      `"${t.date}"`,
      `"${t.type}"`,
      `"${cat.name}"`,
      `"${(t.title || '').replace(/"/g, '""')}"`,
      t.amount,
      `"${state.currency}"`,
      `"${t.paymentMethod || ''}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `xpense_tracker_export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Exported CSV file successfully!', 'success');
}

function resetToDemoData() {
  if (confirm('Reset all transactions and budgets back to sample demo data? Your current entries will be replaced.')) {
    state.transactions = getInitialDemoTransactions();
    state.budgets = { ...DEFAULT_BUDGETS };
    saveTransactions();
    saveBudgets();
    showToast('Demo data restored!', 'success');
    refreshCurrentView();
  }
}

// Safe string escape for HTML
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =================================================================
// 10. ROUTING & VIEW SWITCHING
// =================================================================

function switchView(viewName) {
  state.currentView = viewName;

  // Update sidebar active link
  document.querySelectorAll('.sidebar-nav li').forEach(li => {
    if (li.dataset.view === viewName) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });

  // Toggle view section visibility
  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });

  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) targetSection.classList.add('active');

  // Update Page Header Title
  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');
  switch (viewName) {
    case 'transactions':
      if (pageTitle) pageTitle.textContent = 'All Transactions';
      if (pageSubtitle) pageSubtitle.textContent = 'Search, filter, and manage your full ledger';
      break;
    case 'budgets':
      if (pageTitle) pageTitle.textContent = 'Budgets & Limits';
      if (pageSubtitle) pageSubtitle.textContent = 'Monitor monthly category limits and prevent overspending';
      break;
    case 'analytics':
      if (pageTitle) pageTitle.textContent = 'Analytics & Trends';
      if (pageSubtitle) pageSubtitle.textContent = 'In-depth cash flow trends and visual payment breakdowns';
      break;
    case 'dashboard':
    default:
      if (pageTitle) pageTitle.textContent = 'Financial Dashboard';
      if (pageSubtitle) pageSubtitle.textContent = 'Track your financial health and daily spending';
      break;
  }

  // Close mobile sidebar if open
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');

  refreshCurrentView();
}

function refreshCurrentView() {
  renderDashboard();
  if (state.currentView === 'transactions') {
    renderFullTransactionsView();
  } else if (state.currentView === 'budgets') {
    renderBudgetsView();
  } else if (state.currentView === 'analytics') {
    renderAnalyticsCharts();
  }
}

// =================================================================
// 11. THEME & SETTINGS
// =================================================================

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);

  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
    }
  }

  // Redraw charts with theme-adjusted colors
  if (state.charts.donut) {
    state.charts.donut.destroy();
    state.charts.donut = null;
  }
  if (state.charts.trend) {
    state.charts.trend.destroy();
    state.charts.trend = null;
  }
  if (state.charts.analytics) {
    state.charts.analytics.destroy();
    state.charts.analytics = null;
  }
  if (state.charts.budgetVsActual) {
    state.charts.budgetVsActual.destroy();
    state.charts.budgetVsActual = null;
  }
  if (state.charts.paymentMethods) {
    state.charts.paymentMethods.destroy();
    state.charts.paymentMethods = null;
  }

  refreshCurrentView();
}

function toggleTheme() {
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}

// =================================================================
// 12. EVENT LISTENERS SETUP
// =================================================================

function setupEventListeners() {
  // Navigation tabs
  document.querySelectorAll('.sidebar-nav li').forEach(li => {
    li.addEventListener('click', (e) => {
      e.preventDefault();
      const view = li.dataset.view;
      if (view) switchView(view);
    });
  });

  // Shortcut view buttons on dashboard
  const viewAllTxBtn = document.getElementById('viewAllTransactionsBtn');
  if (viewAllTxBtn) viewAllTxBtn.addEventListener('click', () => switchView('transactions'));

  const viewAllBudgetsBtn = document.getElementById('viewAllBudgetsBtn');
  if (viewAllBudgetsBtn) viewAllBudgetsBtn.addEventListener('click', () => switchView('budgets'));

  // Mobile menu buttons
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseSidebar = document.getElementById('mobileCloseSidebar');
  const sidebar = document.getElementById('sidebar');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (mobileCloseSidebar && sidebar) {
    mobileCloseSidebar.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // Time range selector
  const timeRangeSelect = document.getElementById('timeRangeSelect');
  if (timeRangeSelect) {
    timeRangeSelect.value = state.timeRange;
    timeRangeSelect.addEventListener('change', (e) => {
      state.timeRange = e.target.value;
      refreshCurrentView();
    });
  }

  // Currency selector
  const currencySelect = document.getElementById('currencySelect');
  if (currencySelect) {
    currencySelect.value = state.currency;
    currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      localStorage.setItem(STORAGE_KEYS.CURRENCY, state.currency);
      document.getElementById('formCurrencyPrefix').textContent = state.currency;
      showToast(`Currency changed to ${state.currency}`, 'info');
      refreshCurrentView();
    });
  }

  // Theme toggle button
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Open Add Transaction modal buttons
  const openAddBtn = document.getElementById('openAddTransactionModalBtn');
  const toolbarAddBtn = document.getElementById('toolbarAddBtn');
  if (openAddBtn) openAddBtn.addEventListener('click', openAddModal);
  if (toolbarAddBtn) toolbarAddBtn.addEventListener('click', openAddModal);

  // Close transaction modal
  const closeTxBtn = document.getElementById('closeTransactionModalBtn');
  const cancelTxBtn = document.getElementById('cancelTransactionModalBtn');
  if (closeTxBtn) closeTxBtn.addEventListener('click', closeTransactionModal);
  if (cancelTxBtn) cancelTxBtn.addEventListener('click', closeTransactionModal);

  // Transaction form submit
  const txForm = document.getElementById('transactionForm');
  if (txForm) txForm.addEventListener('submit', handleTransactionFormSubmit);

  // Transaction type toggle radios (Expense / Income)
  const expenseRadio = document.querySelector('input[name="txType"][value="expense"]');
  const incomeRadio = document.querySelector('input[name="txType"][value="income"]');
  if (expenseRadio) {
    expenseRadio.addEventListener('change', () => setFormType('expense'));
  }
  if (incomeRadio) {
    incomeRadio.addEventListener('change', () => setFormType('income'));
  }

  // Delete modal buttons
  const closeDeleteBtn = document.getElementById('closeDeleteModalBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteModalBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  if (closeDeleteBtn) closeDeleteBtn.addEventListener('click', closeDeleteModal);
  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

  // Manage budgets modal
  const openBudgetBtn = document.getElementById('openManageBudgetsModalBtn');
  const closeBudgetBtn = document.getElementById('closeBudgetModalBtn');
  const cancelBudgetBtn = document.getElementById('cancelBudgetModalBtn');
  const budgetForm = document.getElementById('budgetForm');

  if (openBudgetBtn) openBudgetBtn.addEventListener('click', openBudgetModal);
  if (closeBudgetBtn) closeBudgetBtn.addEventListener('click', closeBudgetModal);
  if (cancelBudgetBtn) cancelBudgetBtn.addEventListener('click', closeBudgetModal);
  if (budgetForm) budgetForm.addEventListener('submit', handleBudgetFormSubmit);

  // Export to CSV & Demo Data Reset
  const exportBtn = document.getElementById('exportDataBtn');
  const seedBtn = document.getElementById('seedDemoDataBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportToCSV);
  if (seedBtn) seedBtn.addEventListener('click', resetToDemoData);

  // Transactions view search and filters
  const searchInput = document.getElementById('transactionSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const typeFilterSelect = document.getElementById('typeFilterSelect');
  const categoryFilterSelect = document.getElementById('categoryFilterSelect');
  const sortFilterSelect = document.getElementById('sortFilterSelect');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = e.target.value ? 'block' : 'none';
      renderFullTransactionsView();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        state.filters.search = '';
        clearSearchBtn.style.display = 'none';
        renderFullTransactionsView();
      }
    });
  }

  if (typeFilterSelect) {
    typeFilterSelect.addEventListener('change', (e) => {
      state.filters.type = e.target.value;
      renderFullTransactionsView();
    });
  }

  if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      renderFullTransactionsView();
    });
  }

  if (sortFilterSelect) {
    sortFilterSelect.addEventListener('change', (e) => {
      state.filters.sortBy = e.target.value;
      renderFullTransactionsView();
    });
  }

  // Click outside backdrop to close modals
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeTransactionModal();
      closeDeleteModal();
      closeBudgetModal();
    }
  });

  // ESC key to close open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTransactionModal();
      closeDeleteModal();
      closeBudgetModal();
    }
  });
}

// =================================================================
// 13. BOOTSTRAP APP ON LOAD
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme(state.theme);
  populateFilterCategorySelect();
  setupEventListeners();
  switchView('dashboard');
});

// Expose handlers needed by inline table action buttons
window.openEditModal = openEditModal;
window.openDeleteModal = openDeleteModal;
