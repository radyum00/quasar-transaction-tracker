<template>
  <q-form @submit="$emit('submit', form)" class="q-gutter-md">
    <q-option-group
      v-model="form.type"
      :options="typeOptions"
      label="Тип транзакции"
      inline
    />

    <q-input
      v-model.number="form.amount"
      label="Сумма"
      type="number"
      step="0.01"
      :rules="[val => val > 0 || 'Сумма должна быть больше 0']"
      required
    />

    <q-select
      v-model="form.category"
      :options="categoryOptions"
      label="Категория"
      :rules="[val => !!val || 'Выберите категорию']"
      required
    />

    <q-input
      v-model="form.date"
      label="Дата"
      type="date"
      :rules="[val => !!val || 'Выберите дату']"
      required
    />

    <q-input
      v-model="form.description"
      label="Описание"
      type="textarea"
      :rules="[val => !!val || 'Введите описание']"
      required
    />

    <q-btn label="Добавить" type="submit" color="primary" />
  </q-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCategoryStore } from 'stores/categories'

defineEmits(['submit'])

const categoryStore = useCategoryStore()

const form = ref({
  type: 'expense',
  amount: null,
  category: null,
  date: new Date().toISOString().slice(0, 10),
  description: ''
})

const typeOptions = [
  { label: 'Доход', value: 'income' },
  { label: 'Расход', value: 'expense' }
]

const categoryOptions = computed(() => {
  return form.value.type === 'income'
    ? categoryStore.incomeCategories
    : categoryStore.expenseCategories
})
</script>
