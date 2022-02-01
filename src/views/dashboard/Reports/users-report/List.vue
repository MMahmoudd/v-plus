<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        فرز
      </v-card-title>
      <v-card-text class="pt-3">
        <label> فرز حسب التاريخ و حالة المعاملة</label>
        <v-row class="pt-3">
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-menu
              v-model="start_date"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="search.start_date"
                  label="تاريخ البدء"
                  prepend-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="search.start_date"
                @input="start_date = false"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-menu
              v-model="end_date"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="search.end_date"
                  label="تاريخ الانتهاء"
                  prepend-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="search.end_date"
                @input="end_date = false"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-select
              v-model="search.status"
              :items="statusList"
              class="mx-2"
              item-text="name"
              item-value="id"
              label="الحالة"
              outlined
              required
              chips
            />
          </v-col>
        </v-row>
        <label>فرز حسب المستخدمين والعملاء</label>
        <v-row class="pt-3">
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="search.users_id"
              :items="usersList"
              class="mx-2"
              item-text="name"
              item-value="id"
              label="المستخدمين"
              outlined
              required
              multiple
              chips
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="search.customers_id"
              :items="customersList"
              class="mx-2"
              item-text="cs_name"
              item-value="id"
              label="العملاء"
              outlined
              required
              multiple
              chips
            />
          </v-col>
        </v-row>
        <label>فرز حسب المناطق والمدن والاحياء</label>
        <v-row class="pt-3">
          <v-col
            cols="12"
            sm="4"
          >
            <v-select
              v-model="search.region_id"
              :items="regionList"
              class="mx-2"
              item-text="name"
              item-value="id"
              label="المنطقة"
              outlined
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-select
              v-model="search.city_id"
              :items="cityList.filter(city => city.regionId === search.region_id)"
              class="mx-2"
              item-text="name"
              item-value="id"
              label="المدينة"
              outlined
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-select
              v-model="search.neighborhood_id"
              :items="neighborhoodList.filter(neighborhood => neighborhood.city_id === search.city_id)"
              class="mx-2"
              item-text="name"
              item-value="id"
              label="الحي"
              outlined
              required
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="green"
          @click="fetchAllItems()"
        >
          فرز
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        تقرير المستخدمين
        <v-spacer />
        <v-btn
          class="mx-1 my-auto"
          color="green"
          :loading="loading"
          :disabled="disabled"
          @click="exportExel()"
        >
          تنزيل اكسيل
        </v-btn>
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
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
  const UsersService = ServiceFactory.get('Users')
  const CustomersService = ServiceFactory.get('Customers')
  const RegionsService = ServiceFactory.get('Regions')
  const CitesService = ServiceFactory.get('Cites')
  const NeighborhoodsService = ServiceFactory.get('Neighborhoods')
  export default {
    name: 'UsersReports',
    data: (vm) => ({
      search: {
        start_date: '',
        end_date: '',
        status: null,
        users_id: [],
        customers_id: [],
        region_id: null,
        city_id: null,
        neighborhood_id: null,
      },
      start_date: false,
      end_date: false,
      usersList: [],
      customersList: [],
      regionList: [],
      cityList: [],
      neighborhoodList: [],
      statusList: [
        { id: 1, name: 'مسودة' },
        { id: 2, name: 'تحت التقييم' },
        { id: 3, name: 'تحت المراجعة' },
        { id: 4, name: 'قيد الاعتماد' },
        { id: 5, name: 'معتمدة' },
        { id: 6, name: 'مرسلة' },
        { id: 7, name: 'معلقة' },
        { id: 8, name: 'ملغية' },
      ],
      permissions: {},
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
      filename: 'تقرير المستخدمين',
      bookType: 'xlsx',
      autoWidth: true,
    }),
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },
    created () {
      this.fetchAllUsers()
      this.fetchAllCustomers()
      this.getRegions()
      this.getCities()
      this.getNeighborhood()
    },
    mounted () {
      this.permissions = this.can('تقرير المستخدمين')
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await Service.getAllItems(itemsPerPage, page, pageNumber, this.search)
        this.items = items.data.data.map(item => {
          const newItem = { name: item.name, id: item.id, totalYear: item.months.reduce((p, i) => p + (+i.total + +i.total_other), 0) }
          item.months.forEach((month) => {
            const monthName = month.month_name.slice(0, 3)
            newItem[monthName] = {}
            newItem[monthName].total = Number(month.total + month.total_other)
          })
          return newItem
        })
        this.total = items.total
        this.dataLoading = false
      },
      async exportExel () {
        this.loading = true
        import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['اسم المستخدم', 'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر', 'الاجمالى']
        const list = this.items.map(item => {
          return {
            name: item.name,
            Jan: item.Jan.total,
            Feb: item.Feb.total,
            Mar: item.Mar.total,
            Apr: item.Apr.total,
            May: item.May.total,
            Jun: item.Jun.total,
            Jul: item.Jul.total,
            Aug: item.Aug.total,
            Sep: item.Sep.total,
            Oct: item.Oct.total,
            Nov: item.Nov.total,
            Dec: item.Dec.total,
            totalYear: item.totalYear,
            }
        })
        const data = this.formatJson(list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
        this.loading = false
      })
      },
      formatJson (jsonData) {
        return jsonData.map(v => {
          return Object.values(v)
        })
      },
      async fetchAllUsers () {
        this.dataLoading = true
        const items = await UsersService.getAllItems()
        this.usersList = items.data.data
        this.total = items.total
        this.dataLoading = false
      },
      async fetchAllCustomers () {
        const items = await CustomersService.getAllItems()
        console.log('customers :>> ', items)
        this.customersList = items.data.data
        this.total = items.total
      },
      async getRegions () {
        const { data } = await RegionsService.getAllItems()
        this.regionList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      async getCities () {
        const { data } = await CitesService.getAllItems()
        console.log('data :>> ', data)
        this.cityList = data.data.map((city) => ({
          name: city.name,
          id: city.id,
          regionId: city.region_id,
        }))
      },
      async getNeighborhood () {
        const items = await NeighborhoodsService.getAllItems()
        this.neighborhoodList = items.data.data
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
.v-picker{
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
  margin-right: unset !important;
}
</style>
