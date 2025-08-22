<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Добавить транзакцию</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- Тип транзакции -->
          <q-option-group
            v-model="form.type"
            :options="typeOptions"
            label="Тип транзакции"
            inline
          />

          <!-- Сумма -->
          <q-input
            v-model.number="form.amount"
            label="Сумма"
            type="number"
            step="0.01"
            :rules="[val => val > 0 || 'Сумма должна быть больше 0']"
            required
          />

          <!-- Категория -->
          <q-select
            v-model="form.category"
            :options="categoryOptions"
            label="Категория"
            :rules="[val => !!val || 'Выберите категорию']"
            required
          />

          <!-- Дата -->
          <q-input
            v-model="form.date"
            label="Дата"
            type="date"
            :rules="[val => !!val || 'Выберите дату']"
            required
          />

          <!-- Описание -->
          <q-input
            v-model="form.description"
            label="Описание"
            type="textarea"
            :rules="[val => !!val || 'Введите описание']"
            required
          />

          <!-- Кнопка -->
          <div>
            <q-btn label="Добавить" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransactionStore } from 'stores/transactions'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const store = useTransactionStore()

const form = ref({
  type: 'expense',
  amount: 0,
  category: '',
  date: new Date().toISOString().split('T')[0],
  description: ''
})

const typeOptions = [
  { label: 'Доход', value: 'income' },
  { label: 'Расход', value: 'expense' }
]

const categoryOptions = computed(() => {
  return form.value.type === 'income'
    ? ['Зарплата', 'Фриланс', 'Инвестиции', 'Подарок', 'Другое']
    : ['Еда', 'Транспорт', 'Развлечения', 'Здоровье', 'Образование', 'Другое']
})

const onSubmit = () => {
  store.addTransaction(form.value)
  $q.notify({
    message: 'Транзакция добавлена',
    color: 'positive'
  })
  router.push('/')
}
</script>
