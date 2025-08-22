<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">История транзакций</div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="store.transactions"
          :columns="columns"
          row-key="id"
          :pagination="pagination"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input
              v-model="filter"
              placeholder="Поиск..."
              dense
              outlined
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-type="props">
            <q-td :props="props">
              <q-badge :color="props.row.type === 'income' ? 'positive' : 'negative'">
                {{ props.row.type === 'income' ? 'Доход' : 'Расход' }}
              </q-badge>
            </q-td>
          </template>

          <template v-slot:body-cell-amount="props">
            <q-td :props="props">
              <span :class="props.row.type === 'income' ? 'text-positive' : 'text-negative'">
                {{ formatCurrency(props.row.amount) }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="delete"
                color="negative"
                flat
                round
                @click="deleteTransaction(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useTransactionStore } from 'stores/transactions'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useTransactionStore()
const filter = ref('')

const columns = [
  {
    name: 'date',
    label: 'Дата',
    field: 'date',
    align: 'left',
    sortable: true
  },
  {
    name: 'type',
    label: 'Тип',
    field: 'type',
    align: 'center'
  },
  {
    name: 'category',
    label: 'Категория',
    field: 'category',
    align: 'left',
    sortable: true
  },
  {
    name: 'description',
    label: 'Описание',
    field: 'description',
    align: 'left'
  },
  {
    name: 'amount',
    label: 'Сумма',
    field: 'amount',
    align: 'right',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Действия',
    align: 'center'
  }
]

const pagination = {
  rowsPerPage: 10
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(amount)
}

const deleteTransaction = (id) => {
  $q.dialog({
    title: 'Подтверждение',
    message: 'Вы уверены, что хотите удалить эту транзакцию?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.deleteTransaction(id)
    $q.notify({
      message: 'Транзакция удалена',
      color: 'positive'
    })
  })
}
</script>
