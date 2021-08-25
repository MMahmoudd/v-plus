<script>
  import { Pie } from 'vue-chartjs'

  export default {
    extends: Pie,
    mounted () {
      this.renderChart(
        {
          labels: ['Assets', 'Companies', 'Branches'],
          datasets: [
            {
              backgroundColor: ['#2d2924', '#563500', '#E9BB70'],
              data: [90, 20, 100],
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false },
      )
    },
  }
</script>
