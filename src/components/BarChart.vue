<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    mounted () {
      this.renderChart(
        {
          labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#2d2924',
              data: [40, 20, 12, 39, 50, 40, 39],
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false },
      )
    },
  }
</script>
