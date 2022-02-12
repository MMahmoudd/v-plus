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
          v-if="permissions.add"
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
        <template
          v-if="permissions.update || permissions.read || permissions.remove"
          v-slot:[`item.actions`]="{ item }"
        >
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
                <v-list-item
                  v-if="permissions.update || permissions.read"
                  :to="'/billsForm/' + item.id"
                >
                  <v-icon class="ml-2">
                    mdi-pencil
                  </v-icon>
                  تعديل
                </v-list-item>
                <v-list-item
                  v-if="permissions.remove"
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
                <v-list-item @click="generateReport(item.id)">
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
      <template>
        <div>
          <vue-html2pdf
            ref="html2Pdf"
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="فاتورة"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            @progress="onProgressPdf($event)"
          >
            <pdf-content
              slot="pdf-content"
              :pdf-data="pdfData"
            />
          </vue-html2pdf>
          <custom-progress
            v-show="showProgress"
            :progress="progressNumber"
          />
        </div>
      </template>
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
  import VueHtml2pdf from 'vue-html2pdf'
  import CustomProgress from '../../component/progress.vue'
  import PdfContent from '../PdfContent.vue'
  const BillsService = ServiceFactory.get('Bills')
  const SettingService = ServiceFactory.get('Setting')

  export default {
    name: 'Bills',
    components: {
      VueHtml2pdf,
      PdfContent,
      CustomProgress,
    },
    data: () => ({
      permissions: {},
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
      progressNumber: 0,
      showProgress: false,
      pdfDataLoading: false,
      pdfData: {
        Name: 'فاتورة',
        FacilityData: {},
        tableData: {},
      },
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
    mounted () {
      this.permissions = this.can('الفواتير')
    },

    methods: {
      onProgressPdf: function (data) {
        this.progressNumber = data
        if (data === 100) {
          setTimeout(() => {
            this.showProgress = false
          }, 1000)
        }
      },
      generateReport: async function (id) {
        this.progressNumber = 0
        this.pdfDataLoading = true
        this.showProgress = true
        this.progressNumber = 40
        await this.fetchFacilityData()
        this.progressNumber = 40
        await this.fetchOneItem(id)
        if (Object.keys(this.pdfData.FacilityData).length > 1 || Object.keys(this.pdfData.tableData).length > 1) {
          this.progressNumber = 20
          await this.$refs.html2Pdf.generatePdf()
          this.pdfData.tableData = {}
          this.pdfData.FacilityData = {}
          this.successMessage = 'تمت تحميل الملف بنجاح'
          this.successSnackbar = true
        } else {
          this.errorMessage = 'يوجد مشكلة في تحميل الملف برجاء المحاولة مرة اخري'
          this.errorSnackbar = true
        }
        console.log('this.pdfData.FacilityData.length :>> ', this.pdfData.FacilityData)
      },
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await BillsService.getAllItems(
          itemsPerPage,
          page,
          pageNumber
        )
        items.data.data.map((item) => {
          item.created_at &&= new Date(item.created_at).toLocaleString('ar-eg')
        })
        this.items = items.data.data
        this.total = items.total
        this.dataLoading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const item = await BillsService.fetchOneItem(id)
        if (item.data.created_at) {
          item.data.created_at = new Date(item.data.created_at).toLocaleDateString('ar-eg')
        }
        this.pdfData.tableData = item.data
        console.log('this.pdfData.tableData :>> ', this.pdfData.tableData)
        this.dataLoading = false
      },
      async fetchFacilityData () {
        this.dataLoading = true
        const data = await SettingService.getFacility()
        if (data.data.license_date) {
          data.data.license_date = new Date(data.data.license_date).toLocaleDateString('ar-eg')
        }
        this.pdfData.FacilityData = data.data
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
