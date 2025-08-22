<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Карточка общего баланса -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Общий баланс</div>
            <div class="text-h3" :class="totalBalance >= 0 ? 'text-positive' : 'text-negative'">
              {{ formatCurrency(totalBalance) }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Карточка доходов -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Доходы</div>
            <div class="text-h3 text-positive">{{ formatCurrency(totalIncome) }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Карточка расходов -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Расходы</div>
            <div class="text-h3 text-negative">{{ formatCurrency(totalExpense) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- График расходов по категориям -->
    <div class="row q-mt-md">
      <div class="col-12 col-md-6">
        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h6">Расходы по категориям</div>
            <apexchart
              v-if="Object.keys(expensesByCategory).length"
              type="pie"
              :options="chartOptions"
              :series="chartSeries"
            ></apexchart>
            <div v-else class="text-center q-pa-lg">
              Нет данных о расходах
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Последние транзакции -->
      <div class="col-12 col-md-6">
        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h6">Последние транзакции</div>
            <q-list separator>
              <q-item v-for="transaction in recentTransactions" :key="transaction.id">
                <q-item-section>
                  <q-item-label>{{ transaction.description }}</q-item-label>
                  <q-item-label caption>{{ formatDate(transaction.date) }} • {{ transaction.category }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label :class="transaction.type === 'income' ? 'text-positive' : 'text-negative'">
                    {{ formatCurrency(transaction.amount) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <div v-if="!recentTransactions.length" class="text-center q-pa-lg">
              Нет транзакций
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useTransactionStore } from 'stores/transactions'

const store = useTransactionStore()

const totalBalance = computed(() => store.totalBalance)
const totalIncome = computed(() => store.totalIncome)
const totalExpense = computed(() => store.totalExpense)
const recentTransactions = computed(() => store.recentTransactions)
const expensesByCategory = computed(() => store.expensesByCategory)

const chartSeries = computed(() => Object.values(expensesByCategory.value))
const chartOptions = computed(() => ({
  labels: Object.keys(expensesByCategory.value),
  legend: {
    position: 'bottom'
  }
}))

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(amount)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>
