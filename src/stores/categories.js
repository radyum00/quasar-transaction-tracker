import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('categories', () => {
  const incomeCategories = ref(['Зарплата', 'Фриланс', 'Инвестиции', 'Подарок', 'Другое'])
  const expenseCategories = ref(['Еда', 'Транспорт', 'Развлечения', 'Здоровье', 'Образование', 'Другое'])

  const addCategory = (type, category) => {
    const categories = type === 'income' ? incomeCategories : expenseCategories
    if (!categories.value.includes(category)) {
      categories.value.push(category)
    }
  }

  return {
    incomeCategories,
    expenseCategories,
    addIncomeCategory: (category) => addCategory('income', category),
    addExpenseCategory: (category) => addCategory('expense', category)
  }
})
