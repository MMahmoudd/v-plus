
<template>
  <v-container>
    <v-card class="form-container">
      <v-card-title
        justify="space-between"
        align="center"
      >
        {{ this.$route.name === 'Treatments' ? 'المعاملات' : 'معاملاتي' }}
        <v-spacer />
        <v-spacer />
        <div v-if="this.$route.name === 'Treatments'">
          <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                class="ma-2 filter-bg"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  fas fa-filter
                </v-icon>
                فرز
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <label class="d-block mb-3 font-weight-bold">العميل</label>
                      <v-select
                        v-model="data.customer_id"
                        :items="customersList"
                        label="العميل"
                        item-text="name"
                        item-value="id"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="5"
                    >
                      <label class="d-block mb-3 font-weight-bold">من</label>
                      <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="data.dateFrom"
                            readonly
                            v-bind="attrs"
                            single-line
                            outlined
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="data.dateFrom"
                          @input="menu1 = false"
                        />
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="2"
                      class="d-flex align-center justify-center"
                    >
                      <v-icon>mdi-less-than</v-icon>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="5"
                    >
                      <label class="d-block mb-3 font-weight-bold">إلى</label>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="data.dateTo"
                            readonly
                            v-bind="attrs"
                            single-line
                            outlined
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="data.dateTo"
                          @input="menu2 = false"
                        />
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      lg="3"
                      md="4"
                    >
                      <label class="d-block font-weight-bold">فرز حسب</label>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.filterBy['1']"
                        class="check-label"
                        label="تاريخ الإرسال"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.filterBy['2']"
                        class="check-label"
                        label="تاريخ التكليف"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.filterBy['3']"
                        class="check-label"
                        label="تاريخ التسليم"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                  </v-row>
                  <v-row>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.filterBy['4']"
                        class="check-label"
                        label="تاريخ الإدخال"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.filterBy['5']"
                        class="check-label"
                        label="طريقة الاستثمار رسملة الدخل"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.filterBy['6']"
                        class="check-label"
                        label="ناريخ الاعتماد"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                  </v-row>
                  <v-row class="mt-10">
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المقيم</label>
                      <v-select
                        v-model="data.resident_id"
                        :items="ResidentesList"
                        item-text="name"
                        item-value="id"
                        label="المقيم"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المراجع</label>
                      <v-select
                        v-model="data.reviewer_id"
                        :items="ReviewersList"
                        item-text="name"
                        item-value="id"
                        label="المراجع"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">الغرض من التقييم</label>
                      <v-select
                        v-model="data.evaluation_purpose_id"
                        :items="evaluationPurposeList"
                        label="الغرض من التقييم"
                        item-text="name"
                        item-value="id"
                        single-line
                        outlined
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">نوع العقار</label>
                      <v-select
                        v-model="data.property_type_id"
                        :items="propTypeList"
                        item-text="name"
                        item-value="id"
                        label="نوع العقار"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">تصنيف العقار</label>
                      <v-select
                        v-model="data.property_rating_id"
                        :items="propRatingsList"
                        item-text="name"
                        item-value="id"
                        label="تصنيف العقار"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      lg="4"
                    >
                      <label class="d-block mb-3 font-weight-bold">المنطقة</label>
                      <v-select
                        v-model="data.region_id"
                        :items="regionsList"
                        label="المنطقة"
                        single-line
                        outlined
                        item-text="name"
                        item-value="id"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      lg="4"
                    >
                      <label class="d-block mb-3 font-weight-bold">اسم المدينة</label>
                      <v-select
                        v-model="data.city_id"
                        :items="updateCitesList"
                        label="اسم المدينة"
                        single-line
                        outlined
                        item-text="name"
                        item-value="id"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      lg="4"
                    >
                      <label class="d-block mb-3 font-weight-bold">اسم الحى</label>
                      <v-select
                        v-model="data.neighborhood_id"
                        :items="updateNeighborhoodsList"
                        label="اسم الحى"
                        single-line
                        outlined
                        item-text="name"
                        item-value="id"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      lg="3"
                      md="4"
                    >
                      <label class="d-block font-weight-bold">حالة المعاملة</label>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.statuses['2']"
                        class="check-label"
                        label="تحت التثمين"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.statuses['3']"
                        class="check-label"
                        label="للتدقيق"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.statuses['4']"
                        class="check-label"
                        label="للاعتماد"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.statuses['5']"
                        class="check-label"
                        label="معتمدة"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  x-large
                  class="ma-2"
                  color="blue"
                  @click="dialog = false"
                >
                  <v-icon left>
                    mdi-file
                  </v-icon>
                  قائمة المعاملات
                </v-btn>
                <v-btn
                  x-large
                  class="ma-2 filter-bg"
                  @click="filterTransctions"
                >
                  <v-icon left>
                    fas fa-filter
                  </v-icon>
                  فرز
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="newTratment"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                class="ma-2"
                color="blue"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  mdi-file-plus-outline
                </v-icon>
                معاملة جديدة
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-right">
                <h3 class="card-title">
                  اختيار نوع النموذج
                </h3>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            single-line
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          >
                            اختر النموذج
                          </v-btn>
                        </template>
                        <v-list>
                          <template v-for="sample in samplesList">
                            <v-list-item
                              v-show="sample.status === '1'"
                              :key="sample.id"
                            >
                              <v-list-item-title>
                                <router-link :to="sample.path">
                                  {{ sample.name }}
                                </router-link>
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </v-card-title>
      <template>
        <div>
          <vue-html2pdf
            ref="html2Pdf"
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="hee hee"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            @progress="onProgressPdf($event)"
          >
            <pdf-content
              slot="pdf-content"
              :data="pdfData"
            />
          </vue-html2pdf>
          <custom-progress
            v-show="showProgress"
            :progress="progressNumber"
          />
        </div>
      </template>
      <template>
        <v-data-table
          :loading="isLoading"
          :headers="headers"
          :items="itemsTr"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:[`item.transaction_id`]="{ item }">
            <router-link :to="'/Evaluate-Treatment/' + item.id + '?edit=' + item.id">
              {{ item.transaction_id }}
            </router-link>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip
              class="pa-2"
              color="yellow"
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:[`item.action`]="{item}">
            <template>
              <div class="text-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      fas fa-ellipsis-v
                    </v-icon>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <a @click="generateReport(item.id)">
                          <v-icon>
                            far fa-file-pdf
                          </v-icon>
                          تنزيل PDF
                        </a>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- <v-list-item>
                      <v-list-item-title>
                        <router-link :to="'/New-Treatment/7?edit=' + item.id">
                          <v-icon>
                            far fa-edit
                          </v-icon>
                          تعديل
                        </router-link>
                      </v-list-item-title>
                    </v-list-item> -->
                    <!-- <v-list-item>
                      <v-list-item-title>
                        <router-link to="/">
                          <v-icon>
                            far fa-eye
                          </v-icon>
                          معاينة
                        </router-link>
                      </v-list-item-title>
                    </v-list-item> -->
                    <!-- <v-list-item>
                      <v-list-item-title>
                        <router-link to="/">
                          <v-icon>
                            fas fa-user-clock
                          </v-icon>
                          حجز موعد
                        </router-link>
                      </v-list-item-title>
                    </v-list-item> -->
                    <v-list-item>
                      <v-list-item-title>
                        <router-link to="/">
                          <v-icon>
                            far fa-file-alt
                          </v-icon>
                          الفاتورة
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- <v-list-item>
                      <v-list-item-title>
                        <router-link to="/">
                          <v-icon>
                            fas fa-location-arrow
                          </v-icon>
                          مراسلة العميل
                        </router-link>
                      </v-list-item-title>
                    </v-list-item> -->
                    <v-list-item>
                      <v-list-item-title>
                        <router-link to="/Accountant-Treatment">
                          <v-icon>
                            fas fa-money-bill
                          </v-icon>
                          تعديل السعر
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <router-link to="/">
                          <v-icon>
                            far fa-trash
                          </v-icon>
                          حذف
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </template>
          </template>
        </v-data-table>
      </template>
    </v-card>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  // import pdf from './Pdf.vue'
  import VueHtml2pdf from 'vue-html2pdf'
  import PdfContent from './PdfContent.vue'
  import CustomProgress from '../component/progress.vue'
  import defaultValuesForPdf from './defaultValuesForPdf'

  const SamplesService = ServiceFactory.get('Samples')
  const TransactionsServices = ServiceFactory.get('Transactions')
  const CustomersService = ServiceFactory.get('Customers')
  const RegionsServices = ServiceFactory.get('Regions')
  const CitesServices = ServiceFactory.get('Cites')
  const NeighborhoodsServices = ServiceFactory.get('Neighborhoods')
  const PropertyRatingsServices = ServiceFactory.get('PropertyRatings')
  const PropertyTypesServices = ServiceFactory.get('PropertyTypes')
  const EvaluationPurposeService = ServiceFactory.get('EvaluationPurpose')
  const UsersServices = ServiceFactory.get('Users')
  const SettingService = ServiceFactory.get('Setting')
  const ReportTypesServices = ServiceFactory.get('ReportTypes')

  export default {
    name: 'NewTreatment',
    components: {
      VueHtml2pdf,
      PdfContent,
      CustomProgress,
    },
    data: () => ({
      progressNumber: 0,
      showProgress: false,
      pdfData: {
        ...defaultValuesForPdf,
      },
      data: {
        region_id: '',
        customer_id: '',
        neighborhood_id: '',
        property_type_id: '',
        property_rating_id: '',
        evaluation_purpose_id: '',
        reviewer_id: '',
        resident_id: '',
        statuses: {},
        filterBy: {},
        dateFrom: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateTo: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
      // lists for dialot
      evaluationPurposeList: [],
      customersList: [],
      regionsList: [],
      citesList: [],
      neighborhoodsList: [],
      propRatingsList: [],
      propTypeList: [],
      ResidentesList: [],
      ReviewersList: [],
      statuses: {
        1: 'جديد',
        2: 'تحت التقييم',
        3: 'تحت المراجعة',
        4: 'قيد الاعتماد',
        5: 'معتمدة',
        6: 'مرسلة',
        7: 'معلقة',
      },
      samplesList: [],
      search: '',
      isLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      loading: false,
      deleteDailog: false,
      userDetails: {},
      // Checkboxes
      ex1: false,
      ex2: false,
      ex3: false,
      ex4: false,
      ex5: false,
      ex6: false,
      ex7: false,
      ex8: false,
      ex9: false,
      ex10: false,

      // Dialogs
      dialog: false,
      dialogOpen: false,
      newTratment: false,

      // Selectboxes
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      // Date Inputs
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,

      // Table
      headers: [
        { text: 'رقم المعاملة', value: 'transaction_id' },
        { text: 'اسم العميل', value: 'customer.cs_name' },
        { text: 'تم التوجيه بواسطة', value: 'addby.name' },
        { text: 'المقيم', value: 'resident.name' },
        { text: 'نوع العقار', value: 'propertytype.name' },
        { text: 'المدينة', value: 'city.name' },
        { text: 'الحالة', value: 'status' },
        { text: 'خيارات', value: 'action' },
      ],
      itemsTr: [
      ],
    }),
    computed: {
      updateCitesList: function () {
        // const citesList = [];
        const data = this.citesList.filter((city) => {
          if (city.regionId === this.data.region_id) {
            return city
          }
        })
        return data
      },
      updateNeighborhoodsList: function () {
        const data = this.neighborhoodsList.filter((neighborhood) => {
          if (neighborhood.cityId === this.data.city_id) {
            return neighborhood
          }
        })
        return data
      },
    },
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
      dialog: {
        handler () {
          // only fetch the data one time
          if (!this.dialogOpen) {
            this.getCustomers()
            this.getRegions()
            this.getCites()
            this.getNeighborhoods()
            this.getPropertyTypes()
            this.getPropertyRatings()
            this.getEvaluationPurpose()
            this.getResidentes()
            this.getReviwers()
            this.dialogOpen = true
          }
        },
      },
      // 'data.region_id': function (val, oldVal) {
      //   console.log(val)
      //   console.log(oldVal)
      //   // this.getCites()
      // },
    },
    created () {
      console.log(this.$route)
    },
    mounted () {
      this.getSamples()
      this.fetchAllItems()
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
      onHasPaginated: async function () {
        this.showProgress = false
      },
      // pdf
      generateReport: async function (id) {
        this.progressNumber = 0
        this.pdfDataLoading = true
        this.showProgress = true
        const pdfData = this.itemsTr.find(item => item.id === id)
        this.progressNumber = 10
        const facility = await this.getFacility()
        this.progressNumber = 20
        const transReportTypeName = await this.getReportType(pdfData.trans_Report_type)
        this.progressNumber = 30
        await this.getPropertyTypes()
        this.progressNumber = 40

        pdfData.trans_Report_type = transReportTypeName
        pdfData.imageBase = 'https://taqeeem.millennium.sa/'
        pdfData.facility = facility
        pdfData.propTypeList = []
        /**
         * ? this is done to only get 4 items including the selected one
         */
        let propertyTypeSelected = 0
        let selectedPropertyTypeFound = false
        let counter = 0
        this.propTypeList.forEach(value => {
          if (propertyTypeSelected >= 4 && selectedPropertyTypeFound) {
            return
          }
          if (value.id === pdfData.property_type_id) {
            pdfData.propTypeList[counter] = value
            selectedPropertyTypeFound = true
          } else {
            pdfData.propTypeList[counter] = value
            propertyTypeSelected++
          }
          counter++
          if (counter > 3) counter = 0
        })
        // const propertyTypeIdIndex = this.propTypeList.findIndex(pt => pt.id === pdfData.property_type_id)
        // pdfData.propTypeList = this.propTypeList.slice(propertyTypeIdIndex, propertyTypeIdIndex + 4)
        this.pdfData = pdfData
        this.$refs.html2Pdf.generatePdf()
      },
      getFacility: async function () {
        const { data } = await SettingService.getFacility()
        return data
      },
      getReportType: async function (id) {
        const { data: { name } } = await ReportTypesServices.fetchOneItem(id)
        return name
      },
      fetchAllItems: async function () {
        this.isLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await TransactionsServices.getAllItems(itemsPerPage, page, pageNumber)
        items.data.map(item => {
          item.status = this.statuses[item.status]
        })
        this.itemsTr = items.data
        this.total = items.total
        this.isLoading = false
      },
      getSamples: async function () {
        const { data } = await SamplesService.getAllItems()
        this.samplesList = data.map(sample => {
          return {
            name: sample.name,
            id: sample.id,
            path: `/New-Treatment/${sample.id}`,
            status: sample.status,
          }
        })
        // console.log(this.samplesList)
      },
      // dialog methods
      filterTransctions: async function () {
        await TransactionsServices.filterItems(this.data)
      },
      getCustomers: async function () {
        const { data } = await CustomersService.getAllItems()
        this.customersList = data.data.map((customer) => {
          return ({
            id: customer.id,
            name: customer.cs_name,
          })
        })
      },
      // Placess
      getRegions: async function () {
        const { data } = await RegionsServices.getAllItems()
        this.regionsList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      getCites: async function () {
        const { data } = await CitesServices.getAllItems()
        this.citesList = data.data.map((city) => ({
          id: city.id,
          name: city.name,
          regionId: city.region_id,
        }))
      },
      getNeighborhoods: async function () {
        const { data } = await NeighborhoodsServices.getAllItems()
        this.neighborhoodsList = data.data.map((neighborhood) => ({
          id: neighborhood.id,
          name: neighborhood.name,
          cityId: neighborhood.city_id,
        }))
      },
      // property ratings
      getPropertyRatings: async function () {
        const { data } = await PropertyRatingsServices.getAllItems()
        this.propRatingsList = data.data.map((pr) => {
          return {
            id: pr.id,
            name: pr.name,
          }
        })
      },
      // property types
      getPropertyTypes: async function () {
        const { data } = await PropertyTypesServices.getAllItems()
        this.propTypeList = data.data.map((pt) => {
          return {
            id: pt.id,
            name: pt.name,
          }
        })
      },
      getEvaluationPurpose: async function () {
        const { data } = await EvaluationPurposeService.getAllItems()
        this.evaluationPurposeList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      getResidentes: async function () {
        const { data } = await UsersServices.getByType(3)
        this.ResidentesList = data.map(({ id, name }) => ({
          id, name,
        }))
      },
      getReviwers: async function () {
        const { data } = await UsersServices.getByType(4)
        this.ReviewersList = data.map(({ id, name }) => ({
          id, name,
        }))
      },
    },
  }
</script>

<style lang="scss" scoped>
.filter-bg{
    background-color: #5FCA21 !important;
}
label{
    font-size: 13px;
}
.card-title{
  color: #37A8FF
}
a{
  text-decoration: none;
  color: #000
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
  color: #000;
  font-size: 15px;
  white-space: nowrap;
  font-weight: 500;
}
.elevation-1 th,
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
  color: #000 !important
}
.elevation-1 th span{
  font-size: 25px !important;
}
</style>
