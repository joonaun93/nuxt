import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import { ref } from "vue";

type KPI = { label: string; value: number; unit?: string };

interface EmissionMonth {
  month: string; // e.g. “2025-06”
  s1: number; // Scope 1  tCO₂e
  s2: number; // Scope 2  tCO₂e
  s3: number; // Scope 3  tCO₂e
}

export const useDashboard = defineStore("dashboard", () => {
  /* ---------- state ---------- */
  const series = ref<EmissionMonth[]>([]);
  const kpis = ref<KPI[]>([]);
  const chartData = ref<
    { month: string; s1: number; s2: number; s3: number }[]
  >([]);

  /* ---------- actions ---------- */
  async function load() {
    const {
      public: { apiBase },
    } = useRuntimeConfig();

    try {
      const res = await $fetch<{
        data: EmissionMonth[];
        total_tCO2e: number;
        projects: number;
        data_quality_pct: number;
      }>("/api/emissions/report", { baseURL: apiBase });

      series.value = res.data;

      const latest = series.value.at(-1);
      const total3Mo = series.value.reduce(
        (sum, m) => sum + m.s1 + m.s2 + m.s3,
        0
      );

      kpis.value = latest
        ? [
            { label: "Scope 1", value: latest.s1, unit: "t" },
            { label: "Scope 2", value: latest.s2, unit: "t" },
            { label: "Scope 3", value: latest.s3, unit: "t" },
            { label: "3-mo Total", value: total3Mo, unit: "t" },
          ]
        : [];

      chartData.value = series.value.map((m) => ({
        month: m.month,
        s1: m.s1,
        s2: m.s2,
        s3: m.s3,
      }));
    } catch (e) {
      console.error("API fetch failed ⇒ falling back to dummy numbers", e);
      // optional: keep previous hard-coded defaults here
    }
  }

  // hydrate immediately on client+server render
  load();

  return { series, kpis, chartData };
});
