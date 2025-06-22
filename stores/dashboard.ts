import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import { ref } from "vue";

type KPI = { label: string; value: number; unit?: string };

export const useDashboard = defineStore("dashboard", () => {
  const kpis = ref<KPI[]>([]);
  const chartData = ref<{ month: string; value: number }[]>([]);

  async function load() {
    const {
      public: { apiBase },
    } = useRuntimeConfig();

    try {
      const r: {
        total_tCO2e: number;
        projects: number;
        data_quality_pct: number;
      } = await $fetch("/api/emissions/report/", {
        baseURL: apiBase as string,
      });

      kpis.value = [
        { label: "Total tCO₂e", value: r.total_tCO2e, unit: "t" },
        { label: "Projects", value: r.projects },
        { label: "Data Quality %", value: r.data_quality_pct, unit: "%" },
      ];

      // stub trend – duplicate total 5× just for the chart
      chartData.value = ["Jan", "Feb", "Mar", "Apr", "May"].map((m, i) => ({
        month: m,
        value: r.total_tCO2e - i * 200,
      }));
    } catch (e) {
      console.error("API fetch failed ⇒ falling back to dummy numbers", e);
      // optional: keep previous hard-coded defaults here
    }
  }

  // hydrate immediately on client+server render
  load();

  return { kpis, chartData };
});
