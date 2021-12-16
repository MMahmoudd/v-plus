<script>
  import { Pie } from 'vue-chartjs'

  export default {
    extends: Pie,
    mounted () {
      this.renderChart(
        {
          labels: ['المعاملات المدخلة', 'تحت التقييم', 'قيد الاعتماد'],
          datasets: [
            {
              backgroundColor: ['#37A8FF', '#3772FF', '#0000AF'],
              data: [90, 20, 100],
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false },
      )
    },
  }
</script>
