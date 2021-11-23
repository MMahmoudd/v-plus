<template>
  <v-container class="price_offers">
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        العملاء
      </h1>
      <v-btn
        class="time-chip"
        color="primary"
        label
        text-color="white"
        @click="dialog = !dialog"
      >
        <v-icon left>
          mdi-account-plus
        </v-icon>
        <span>اضافة عميل</span>
      </v-btn>
    </v-row>

    <customers-table />
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import moment from 'moment'
  const CustomersService = ServiceFactory.get('Customers')

  export default {
    components: {
      CustomersTable: () => import('../component/customers/CustomersTable.vue'),
    },
    data: () => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      items: [],
      loading: false,
      deleteDailog: false,
      userDetails: {},
      editedIndex: -1,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
    }),

    computed: {},
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },

    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await CustomersService.getAllItems(
          itemsPerPage,
          page,
          pageNumber
        )
        console.log('Users', items)
        items.data.data.map((item) => {
          item.created_at = moment(item.created_at).format('YYYY-MM-DD hh:mm a')
        })
        this.items = items.data.data
        this.total = items.total
        this.dataLoading = false
      },
    },
  }
</script>

<style>
.price_offers {
  padding: 2rem 3rem;
}
</style>
