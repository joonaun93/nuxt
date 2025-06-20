import { mount } from "@vue/test-utils";
import LineChart from "@/components/LineChart.vue";
import { describe, expect, it } from "vitest";
describe("LineChart", () => {
  it("mounts with five points", () => {
    const wrapper = mount(LineChart, {
      props: {
        data: [
          { month: "Jan", value: 1 },
          { month: "Feb", value: 2 },
          { month: "Mar", value: 3 },
          { month: "Apr", value: 4 },
          { month: "May", value: 5 },
        ],
      },
    });
    expect(wrapper.props().data).toHaveLength(5);
  });
});
