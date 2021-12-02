<template>
  <v-container class="price_offers">
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        عروض الأسعار
      </h1>
      <router-link
        :to="{ path: '/new-offers'}"
        color="blue"
      >
        <v-btn
          class="mx-2"
          color="blue"
        >
          عرض سعر جديد
        </v-btn>
      </router-link>
    </v-row>

    <price-offers-table />
  </v-container>
</template>

<script>
  import { ServiceFactory } from '@/services/ServiceFactory'
  import moment from 'moment'
  const OffersService = ServiceFactory.get('Offers')

  export default {
    components: {
      PriceOffersTable: () => import('../component/offers/PriceOffersTable.vue'),
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
        const items = await OffersService.getAllItems(
          itemsPerPage,
          page,
          pageNumber
        )
        // console.log('offers', items)
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
