import {
  Chart,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import type { App } from "vue";

Chart.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default {
  install: (app: App) => {
    app.config.globalProperties.$chart = Chart;
  },
};
