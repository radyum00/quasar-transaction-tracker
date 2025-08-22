<template>
  <q-table
    :rows="transactions"
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
          @click="confirmDelete(props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, Notify } from 'quasar'
import { formatCurrency } from 'src/utils/formatters'

defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete-transaction'])

const filter = ref('')
const pagination = { rowsPerPage: 10 }

const columns = [
  {
    name: 'date',
    label: 'Дата',
    field: 'date',
    align: 'left',
    sortable: true,
    format: (val) => {
      const [year, month, day] = val.split('-')
      return `${day}.${month}.${year}`
    }
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

const confirmDelete = (id) => {
  Dialog.create({
    title: 'Подтверждение',
    message: 'Вы уверены, что хотите удалить эту транзакцию?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    emit('delete-transaction', id)
    Notify.create({
      message: 'Транзакция удалена',
      color: 'positive',
      icon: 'check',
      timeout: 1000
    })
  })
}
</script>
