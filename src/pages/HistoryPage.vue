<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">История транзакций</div>
      </q-card-section>

      <q-card-section>
        <TransactionsTable
          :transactions="transactions"
          @delete-transaction="deleteTransaction"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useTransactionStore } from 'stores/transactions'
import TransactionsTable from 'components/TransactionsTable.vue'

const transactionStore = useTransactionStore()
const transactions = computed(() => transactionStore.transactions)

const deleteTransaction = (id) => {
  transactionStore.deleteTransaction(id)
}
</script>
