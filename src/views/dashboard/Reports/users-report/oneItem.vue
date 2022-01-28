<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        تقرير المستخدمين
        <v-spacer />
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="items"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :fixed-header="fixedHeader"
        height="500px"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        @fetchAllItems="fetchAllItems"
      >
        <template v-slot:[`item.name`]="{ item }">
          <router-link :to="'/reports/userReportById/' + item.id">
            {{ item.name }}
          </router-link>
        </template>

        <template
          v-slot:no-data
          loading
        >
          <p>لا يوجد بيانات</p>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const Service = ServiceFactory.get('usersReport')
  export default {
    name: 'UsersReports',
    data: (vm) => ({
      permissions: {},
      search: '',
      fixedHeader: true,
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      items: [],
      testTotal: 0,
      loading: false,
      viewMoreDailog: false,
      userDetails: {},
      editedIndex: -1,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
      headers: [
        { text: 'المستخدم', sortable: true, value: 'name' },
        { text: 'يناير', sortable: true, value: 'Jan.total' },
        { text: 'فبراير', sortable: true, value: 'Feb.total' },
        { text: 'مارس', sortable: true, value: 'Mar.total' },
        { text: 'ابريل', sortable: true, value: 'Apr.total' },
        { text: 'مايو', sortable: true, value: 'May.total' },
        { text: 'يونيو', sortable: true, value: 'Jun.total' },
        { text: 'يوليو', sortable: true, value: 'Jul.total' },
        { text: 'اغسطس', sortable: true, value: 'Aug.total' },
        { text: 'سبتمبر', sortable: true, value: 'Sep.total' },
        { text: 'اكتوبر', sortable: true, value: 'Oct.total' },
        { text: 'نوفمبر', sortable: true, value: 'Nov.total' },
        { text: 'ديسمبر', sortable: true, value: 'Dec.total' },
        { text: 'الاجمالي', value: 'totalYear', sortable: true },
      ],
    }),
    mounted () {
      this.permissions = this.can('تقرير المستخدمين')
    },
    created () {
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
    },
    methods: {
      async fetchOneItem (id) {
        this.dataLoading = true
        const items = await Service.fetchOneItem(id)

        console.log('items.data :>> ', items)
        // this.items = items.data
        this.dataLoading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
