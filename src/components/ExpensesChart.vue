<template>
  <q-card class="q-mt-md">
    <q-card-section>
      <div class="text-h6">Расходы по категориям</div>
      <div class="chart-container">
        <apexchart
          v-if="chartSeries.length > 0"
          type="pie"
          :options="chartOptions"
          :series="chartSeries"
          height="350"
        ></apexchart>
        <div v-else class="text-center q-pa-lg">
          Нет данных о расходах
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const Apexchart = VueApexCharts

const props = defineProps({
  expensesByCategory: {
    type: Object,
    required: true
  }
})

const chartKey = ref(0)
const chartOptions = ref({
  labels: Object.keys(props.expensesByCategory),
  legend: { position: 'bottom' }
})
const chartSeries = ref(Object.values(props.expensesByCategory))

const updateChartData = () => {
  const categories = props.expensesByCategory

  if (Object.keys(categories).length === 0) {
    chartSeries.value = []
    chartOptions.value.labels = []
  } else {
    chartSeries.value = Object.values(categories)
    chartOptions.value = {
      ...chartOptions.value,
      labels: Object.keys(categories)
    }
  }

  chartKey.value++
}

watch(() => props.expensesByCategory, () => {
  updateChartData()
}, { deep: true })

onMounted(() => {
  updateChartData()
})
</script>
