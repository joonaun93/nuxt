<script setup lang="ts">
import { ref, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/* ---------- types ---------- */
type EmissionMonth = {
  month: string;
  s1: number;
  s2: number;
  s3: number;
};

const scopeKeys = ["s1", "s2", "s3"] as const;
type ScopeKey = (typeof scopeKeys)[number]; // "s1" | "s2" | "s3"

/* ─── props ─────────────────────────────────────── */
const props = defineProps<{
  data: EmissionMonth[];
}>();

/* ─── chart instance ref ─────────────────────────── */
const chartRef = ref<InstanceType<typeof Line> | null>(null);

/* ─── palette helper ─────────────────────────────── */
const scopeColors = [
  { stroke: "rgb(34, 197, 94)", fill: "rgba(34, 197, 94,0.15)" }, // s1  green-500
  { stroke: "rgb(59, 130, 246)", fill: "rgba(59, 130, 246,0.15)" }, // s2  blue-500
  { stroke: "rgb(244, 114, 182)", fill: "rgba(244, 114, 182,0.15)" }, // s3  pink-400
];

/* ─── reactive data ──────────────────────────────── */
const chartData = computed(() => {
  const labels = props.data.map((d) => d.month);

  const datasets = scopeKeys.map((key: ScopeKey, idx: number) => ({
    label: `Scope ${idx + 1}`,
    data: props.data.map((d) => d[key]),
    borderColor: scopeColors[idx].stroke,
    backgroundColor: scopeColors[idx].fill,
    borderWidth: 2,
    tension: 0.3,
    fill: true,
    pointRadius: 3,
  }));

  return { labels, datasets };
});

const options = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: { position: "bottom" },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue} tCO₂e`,
      },
    },
  },
  scales: {
    y: { ticks: { callback: (v) => v + " tCO₂e" } },
  },
};

// 5. Expose resize() to parent
// defineExpose({
//   resize: () => chartRef.value?.chart?.resize(),
// });
</script>

<template>
  <div
    class="w-full sm:w-3/4 mx-auto aspect-w-16 aspect-h-9 rounded-xl bg-white shadow p-4"
  >
    <Line
      ref="chartRef"
      class="w-full h-full"
      :data="chartData"
      :options="options"
    />
  </div>
</template>
