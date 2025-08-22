<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Карты баланса -->
      <div class="col-12 col-md-4">
        <BalanceCard title="Общий баланс" :amount="totalBalance" :positive="totalBalance >= 0" />
      </div>
      <div class="col-12 col-md-4">
        <BalanceCard title="Доходы" :amount="totalIncome" positive />
      </div>
      <div class="col-12 col-md-4">
        <BalanceCard title="Расходы" :amount="totalExpense" :positive="false" />
      </div>
    </div>

    <!-- Диаграмма и недавние транзакции -->
    <div class="row q-mt-md">
      <div class="col-12 col-md-6">
        <ExpensesChart :expensesByCategory="expensesByCategory" />
      </div>
      <div class="col-12 col-md-6">
        <RecentTransactions :transactions="recentTransactions" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useTransactionStore } from 'stores/transactions'
import BalanceCard from 'components/BalanceCard.vue'
import ExpensesChart from 'components/ExpensesChart.vue'
import RecentTransactions from 'components/RecentTransactions.vue'

const store = useTransactionStore()

const totalBalance = computed(() => store.totalBalance)
const totalIncome = computed(() => store.totalIncome)
const totalExpense = computed(() => store.totalExpense)
const recentTransactions = computed(() => store.recentTransactions)
const expensesByCategory = computed(() => store.expensesByCategory)
</script>
