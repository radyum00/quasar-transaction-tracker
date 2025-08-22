import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTransactionStore = defineStore('transactions', () => {
  // Состояние
  const transactions = ref([])

  // Загрузка из localStorage при инициализации
  const loadFromStorage = () => {
    const stored = localStorage.getItem('transactions')
    if (stored) {
      transactions.value = JSON.parse(stored)
    }
  }

  // Автоматическое сохранение в localStorage при изменении
  watch(transactions, (newVal) => {
    localStorage.setItem('transactions', JSON.stringify(newVal))
  }, { deep: true })

  // Действия
  const addTransaction = (transaction) => {
    transactions.value.push({
      id: Date.now(),
      ...transaction
    })
  }

  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  // Геттеры
  const totalBalance = computed(() => {
    return transactions.value.reduce((total, transaction) => {
      return transaction.type === 'income'
        ? total + transaction.amount
        : total - transaction.amount
    }, 0)
  })

  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0)
  })

  const totalExpense = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0)
  })

  const recentTransactions = computed(() => {
    return [...transactions.value]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
  })

  const expensesByCategory = computed(() => {
    const categories = {}
    transactions.value
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + t.amount
      })
    return categories
  })

  // Инициализация
  loadFromStorage()

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totalBalance,
    totalIncome,
    totalExpense,
    recentTransactions,
    expensesByCategory
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot))
}
