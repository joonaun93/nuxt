<script setup lang="ts">
import KpiCard from "@/components/KpiCardComposition.vue";
import LineChart from "@/components/LineChart.vue";
import { useDashboard } from "@/stores/dashboard";
import { storeToRefs } from "pinia";

const dashboard = useDashboard();
const { kpis, chartData } = storeToRefs(dashboard);
</script>

<template>
  <!-- Page padding + light background -->
  <div class="min-h-screen bg-gray-50 p-3 sm:p-8 space-y-8">
    <h1 class="text-2xl font-semibold">GHG Emissions (Scopes 1 • 2 • 3)</h1>

    <!-- KPI grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard v-for="k in kpis" :key="k.label" v-bind="k" />
    </div>

    <!-- <section>
      <KpiCardOptions label="Total tCO₂e" value="12,450" unit="t" />
    </section> -->

    <!-- Chart slot -->
    <LineChart :data="chartData" />
  </div>
</template>
