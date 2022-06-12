
<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['chartdata'],
    data () {
      return {
      }
    },
    // computed: {
    //   chartData () {
    //     console.log('chartchartchartchartchartchartchartchartchartchartchartchartchartchartchartchartchart1', this.chartdata)
    //     this.renderChart(
    //       {
    //         labels: [
    //           'يناير',
    //           'فبراير',
    //           'مارس',
    //           'ابريل',
    //           'مايو',
    //           'يونيو',
    //           'يوليو',
    //           'اغسطس',
    //           'سبتمبر',
    //           'اكتوبر',
    //           'نوفمبر',
    //           'ديسمبر',
    //         ],
    //         datasets: [
    //           {
    //             label: 'مصروفات متغيرة',
    //             data: this.chartdata.expenses_static,
    //             backgroundColor: 'transparent',
    //             borderColor: '#3772FF',
    //             pointBackgroundColor: '#000066',
    //           },
    //           {
    //             label: 'مصروفات ثابتة',
    //             data: this.chartdata.expenses_fixed,
    //             backgroundColor: 'transparent',
    //             borderColor: '#fdca40',
    //             pointBackgroundColor: '#644900',
    //           },
    //           {
    //             label: 'الإيرادات',
    //             data: this.chartdata.revenues,
    //             backgroundColor: 'transparent',
    //             borderColor: '#e74b4bed',
    //             pointBackgroundColor: '#620000ed',
    //           },
    //           {
    //             label: 'العمولات',
    //             data: this.chartdata.commissions,
    //             backgroundColor: 'transparent',
    //             borderColor: '#11b63a',
    //             pointBackgroundColor: '#004611',
    //           },
    //         ],
    //       },
    //       {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         title: {
    //           display: true,
    //         // text: 'My Data',
    //         },
    //       }
    //     )
    //     return this.chartdata
    //   },
    // },
    watch: {
      chartdata: {
        handler () {
          this.renderChart(
            {
              labels: [
                'يناير',
                'فبراير',
                'مارس',
                'ابريل',
                'مايو',
                'يونيو',
                'يوليو',
                'اغسطس',
                'سبتمبر',
                'اكتوبر',
                'نوفمبر',
                'ديسمبر',
              ],
              datasets: [
                {
                  label: 'مصروفات متغيرة',
                  data: this.chartdata.expenses_static,
                  backgroundColor: 'transparent',
                  borderColor: '#3772FF',
                  pointBackgroundColor: '#000066',
                },
                {
                  label: 'مصروفات ثابتة',
                  data: this.chartdata.expenses_fixed,
                  backgroundColor: 'transparent',
                  borderColor: '#fdca40',
                  pointBackgroundColor: '#644900',
                },
                {
                  label: 'الإيرادات',
                  data: this.chartdata.revenues,
                  backgroundColor: 'transparent',
                  borderColor: '#e74b4bed',
                  pointBackgroundColor: '#620000ed',
                },
                {
                  label: 'العمولات',
                  data: this.chartdata.commissions,
                  backgroundColor: 'transparent',
                  borderColor: '#11b63a',
                  pointBackgroundColor: '#004611',
                },
              ],
            },
            {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                // text: 'My Data',
              },
            }
          )
        },
        deep: true,
      },
    },
  }
</script>
