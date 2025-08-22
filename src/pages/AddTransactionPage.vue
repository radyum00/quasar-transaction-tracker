<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Добавить транзакцию</div>
      </q-card-section>

      <q-card-section>
        <TransactionForm @submit="onSubmit" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useTransactionStore } from 'stores/transactions'
import { useCategoryStore } from 'stores/categories'
import TransactionForm from 'components/TransactionForm.vue'

const $q = useQuasar()
const router = useRouter()
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()

const onSubmit = (formData) => {
  transactionStore.addTransaction(formData)

  $q.notify({
    message: 'Транзакция добавлена',
    color: 'positive'
  })

  if (formData.type === 'income' && !categoryStore.incomeCategories.includes(formData.category)) {
    categoryStore.addIncomeCategory(formData.category)
  } else if (formData.type === 'expense' && !categoryStore.expenseCategories.includes(formData.category)) {
    categoryStore.addExpenseCategory(formData.category)
  }

  setTimeout(() => router.push('/'), 500)
}
</script>
