<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["dataProp", "labelsProp", "colorsProp", "showLegendProp"],
  mounted() {
    this.renderChart(
      {
        labels: this.labelsProp,
        datasets: [
          {
            backgroundColor: this.colorsProp,
            data: this.dataProp,
          },
        ],
      },
      {
        responsive: true,
        legend: {
          display: this.showLegendProp,
        },
      }
    );
  },
};
</script>
