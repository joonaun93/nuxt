// tests/unit/EmissionChart.spec.ts
import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import LineChart from "@/components/LineChart.vue";

/* --- stub vue-chartjs Line to avoid Canvas dependency --- */
vi.mock("vue-chartjs", () => ({
  Line: {
    name: "Line",
    props: ["data", "options"],
    template: '<canvas class="chart-mock"></canvas>',
  },
}));

describe("LineChart", () => {
  it("accepts an array of 3 data points", () => {
    const sample = [
      { month: "2025-04", s1: 1020, s2: 780, s3: 5100 },
      { month: "2025-05", s1: 1100, s2: 760, s3: 5000 },
      { month: "2025-06", s1: 1050, s2: 795, s3: 5200 },
    ];

    const wrapper = shallowMount(LineChart, { props: { data: sample } });
    expect(wrapper.props().data).toHaveLength(3);
  });
});
