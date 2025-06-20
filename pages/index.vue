<script setup lang="ts">
import KpiCard from "@/components/KpiCardComposition.vue";
import LineChart from "@/components/LineChart.vue";

/* dummy data – you can swap these with Pinia or fetch() later */
const kpis = [
  { label: "Total tCO₂e", value: 12_450, unit: "t" },
  { label: "Projects", value: 37 },
  { label: "Data Quality %", value: 96, unit: "%" },
];
</script>

<template>
  <!-- Page padding + light background -->
  <div class="min-h-screen bg-gray-50 p-8 space-y-8">
    <h1 class="text-2xl font-semibold">ESG Overview</h1>

    <!-- KPI grid -->
    <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <KpiCard v-for="k in kpis" :key="k.label" v-bind="k" />
    </section>

    <!-- Chart slot -->
    <LineChart />
  </div>
</template>
