<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        الفواتير
        <v-spacer />
        <v-spacer />
        <router-link
          :to="{ path: '/billsForm'}"
          color="blue"
        >
          <v-btn
            class="mx-2"
            color="blue"
          >
            اضافة فاتورة +
          </v-btn>
        </router-link>
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="items"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 40, 50],
        }"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        class="custom_table_class mt-8"
        @fetchAllItems="fetchAllItems"
      >
        <template v-slot:[`item.color_e`]="{ item }">
          <p class="color_primary">
            {{ item.color_e }}
          </p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  medium
                  class="mr-2"
                  v-bind="attrs"
                  color="primary"
                  v-on="on"
                >
                  mdi-dots-vertical
                </v-icon>
              </template>
              <v-list>
                <v-list-item :to="'/billsForm/' + item.id">
                  <v-icon class="ml-2">
                    mdi-pencil
                  </v-icon>
                  تعديل
                </v-list-item>
                <v-list-item
                  color="primary"
                >
                  <v-icon
                    color="danger"
                    class="ml-2"
                  >
                    mdi-trash-can-outline
                  </v-icon>
                  <span class="color_danger"> حذف </span>
                </v-list-item>
                <v-list-item @click="editItem(item)">
                  <v-icon class="ml-2">
                    mdi-printer
                  </v-icon>
                  <span>طباعة </span>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  import moment from 'moment'
  const BillsService = ServiceFactory.get('Bills')

  export default {
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
      headers: [
        {
          text: 'أسم العميل',
          align: 'start',
          sortable: false,
          value: 'customer.cs_name',
        },
        { text: 'المبلغ', value: 'price' },
        { text: 'التاريخ', value: 'created_at' },
        { text: 'الدفعات', value: 'first_batch' },
        { text: 'الحالة', value: 'status' },
        { text: 'الاجراءات', value: 'actions', sortable: false },
      ],
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
        const items = await BillsService.getAllItems(
          itemsPerPage,
          page,
          pageNumber
        )
        console.log('Bills', items)
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
