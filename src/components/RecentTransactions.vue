<template>
  <q-card class="q-mt-md">
    <q-card-section>
      <div class="text-h6">Последние транзакции</div>
      <q-list separator>
        <q-item v-for="transaction in transactions" :key="transaction.id">
          <q-item-section>
            <q-item-label>{{ transaction.description }}</q-item-label>
            <q-item-label caption>
              {{ formatDate(transaction.date) }} • {{ transaction.category }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label :class="transaction.type === 'income' ? 'text-positive' : 'text-negative'">
              {{ formatCurrency(transaction.amount) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="!transactions.length" class="text-center q-pa-lg">
        Нет транзакций
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { formatCurrency, formatDate } from 'src/utils/formatters'

defineProps({
  transactions: {
    type: Array,
    required: true
  }
})
</script>
