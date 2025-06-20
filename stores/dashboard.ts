import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboard = defineStore("dashboard", () => {
  /* KPI dummy data */
  const kpis = ref([
    { label: "Total tCO₂e", value: 12450, unit: "t" },
    { label: "Projects", value: 37 },
    { label: "Data Quality %", value: 96, unit: "%" },
  ]);

  /* Chart dummy data (month, value) */
  const chartData = ref([
    { month: "Jan", value: 1020 },
    { month: "Feb", value: 980 },
    { month: "Mar", value: 890 },
    { month: "Apr", value: 860 },
    { month: "May", value: 830 },
  ]);

  return { kpis, chartData };
});
