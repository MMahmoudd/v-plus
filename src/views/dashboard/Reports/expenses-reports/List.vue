<template>
  <div />
</template>
<script>
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const expensesReportService = ServiceFactory.get('expensesReport')

  export default {
    name: 'ExpensesReports',
    data: () => ({

    }),
    mounted: {

    },
    methods: {
      async fetchAll () {
        const { data } = await expensesReportService.getAllItems()
        console.log(data)
      },
    },
  }
</script>
