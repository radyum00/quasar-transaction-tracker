<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div class="text-h3" :class="positive ? 'text-positive' : 'text-negative'">
        {{ formatCurrency(amount) }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { formatCurrency } from 'src/utils/formatters'

defineProps({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  positive: {
    type: Boolean,
    default: true
  }
})
</script>
