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

// 1. Register Chart.js modules
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

// 2. Props
const props = defineProps<{
  data: { month: string; value: number }[];
}>();

// 3. Chart instance ref
const chartRef = ref<InstanceType<typeof Line> | null>(null);

// 4. Reactive data & options
const chartData = computed(() => ({
  labels: props.data.map((d) => d.month),
  datasets: [
    {
      label: "Emissions (tCO₂e)",
      data: props.data.map((d) => d.value),
      fill: true,
      tension: 0.3,
      backgroundColor: (ctx) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
        g.addColorStop(0, "rgba(59,130,246,0.4)"); // tailwind blue-500 @ 40%
        g.addColorStop(1, "rgba(59,130,246,0)");
        return g;
      },
    },
  ],
}));

const options = {
  responsive: true,
  maintainAspectRatio: true,
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
