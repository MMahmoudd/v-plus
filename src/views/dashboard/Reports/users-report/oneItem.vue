<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        تقرير العمولات للمستخدم
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
      >
        <template v-slot:[`item.amount`]="{ item }">
          {{ +item.amount + +item.other_amount }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          {{ statuses[item.status] }}
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
      statuses: {
        1: 'مسودة',
        2: 'تحت التقييم',
        3: 'تحت المراجعة',
        4: 'قيد الاعتماد',
        5: 'معتمدة',
        6: 'مرسلة',
        7: 'معلقة',
        8: 'ملغية',
      },
      headers: [
        { text: 'رقم المعاملة', sortable: true, value: 'transaction.transaction_id' },
        { text: 'العميل', sortable: true, value: 'transaction.customer.cs_name' },
        { text: 'تم التوجية بواسطة', sortable: true, value: 'transaction.addby.name' },
        { text: 'المستخدم', sortable: true, value: 'user.name' },
        { text: 'نوع العقار', sortable: true, value: 'transaction.propertytype.name' },
        { text: 'المدينة', sortable: true, value: 'transaction.city.name' },
        { text: 'الحالة', sortable: true, value: 'status' },
        { text: 'السعر', sortable: true, value: 'transaction.trans_report_price' },
        { text: 'العمولة', sortable: true, value: 'amount' },
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
        this.items = items.data
        this.total = items.total
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
