
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
          <select-sample v-if="permissons.create_transaction.add" />
          <!-- <v-dialog
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
          </v-dialog> -->
        </div>
      </v-card-title>
      <!--pdf content-->
      <template>
        <div>
          <vue-html2pdf
            ref="html2Pdf"
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="نموذج التقرير"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            @progress="onProgressPdf($event)"
            @beforeDownload="beforeDownload($event)"
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
      <!--pdf content another-->
      <template>
        <div>
          <vue-html2pdf
            ref="html2PdfAnother"
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="نموذج التقرير"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            @progress="onProgressPdf($event)"
            @beforeDownload="beforeDownload($event)"
          >
            <pdf-content-another
              slot="pdf-content"
              :data="pdfData"
            />
          </vue-html2pdf>
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
            <router-link
              :to="'/Evaluate-Treatment/' + item.id + '?edit=' + item.id"
              class="number_link"
            >
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
                    <v-list-item v-if="permissons.edit_price.read || permissons.edit_price.update ||permissons.edit_price.add ">
                      <v-list-item-title>
                        <router-link :to="'/Accountant-Treatment/'+ item.id ">
                          <v-icon>
                            fas fa-money-bill
                          </v-icon>
                          تعديل السعر
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <a @click="deleteTransaction(item.id)">
                          <v-icon>
                            far fa-trash
                          </v-icon>
                          حذف
                        </a>
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
    <v-snackbar
      v-model="successSnackbar"
      color="green"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  // import mergeImages from 'merge-images'
  /**
   * ? static data
   */
  import defaultValuesForPdf from './defaultValuesForPdf'
  /**
   * ? services
   */
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
  const UserSettingServices = ServiceFactory.get('UserSetting')
  const constructionConditionsService = ServiceFactory.get('constructionConditions')
  const WorkingStatusesServices = ServiceFactory.get('WorkingStatuses')
  /**
   * * third library
   */
  const mergeImages = () => import('merge-images')
  export default {
    name: 'NewTreatment',
    components: {
      VueHtml2pdf: () => import('vue-html2pdf'),
      PdfContent: () => import('./PdfContent.vue'),
      CustomProgress: () => import('../component/progress.vue'),
      SelectSample: () => import('./SelectSample.vue'),
      PdfContentAnother: () => import('./PdfContentAnother.vue'),
    },
    props: {
      type: { type: Number, required: false, default: 0 },
      status: { type: Number, required: false, default: 0 },
    },
    data: () => ({
      errorSnackbar: false,
      successSnackbar: false,
      successMessage: '',
      timeout: 3000,
      errorMessage: '',
      progressNumber: 0,
      showProgress: false,
      permissons: {
        edit_price: {},
        create_transaction: {},
      },
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
        1: 'مسودة',
        2: 'تحت التقييم',
        3: 'تحت المراجعة',
        4: 'قيد الاعتماد',
        5: 'معتمدة',
        6: 'مرسلة',
        7: 'معلقة',
        8: 'ملغية',
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
    },
    created () {
      console.log(this.$route)
    },
    mounted () {
      this.permissons.edit_price = this.can('تعديل السعر')
      this.permissons.create_transaction = this.can('مرحلة الادخال')
      this.fetchAllItems({ type: this.type, status: this.status })
      this.getConstructionCondition()
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
      beforeDownload: async function ({ html2pdf, options, pdfContent }) {
        await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages()
          // * Get Current Font Size
          const fontSize = 10

          // * Get page width
          const pageWidth = pdf.internal.pageSize.getWidth()
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)
            pdf.setFontSize(fontSize)
            pdf.setTextColor(150)
            // * Get the actual text's width
            const textWidth = pdf.getStringUnitWidth('Page ' + i + ' of ' + totalPages) * fontSize / pdf.internal.scaleFactor
            const x = (pageWidth - textWidth) / 2
            pdf.text('Page ' + i + ' of ' + totalPages, x, (pdf.internal.pageSize.getHeight() - 0.3))
          }
        }).save()
      },
      // pdf
      generateReport: async function (id) {
        function split (string) {
          if (!string) {
            return []
          } else {
            return string.split(';')
          }
        }
        try {
          this.progressNumber = 0
          this.pdfDataLoading = true
          this.showProgress = true
          const pdfData = this.itemsTr.find(item => item.id === id)
          console.log(pdfData)
          this.progressNumber = 10
          const facility = await this.getFacility()
          this.progressNumber = 20
          const transReportTypeName = await this.getReportType(pdfData.trans_Report_type)
          const reportName = await this.getReportType(pdfData.customer.report_id)
          this.progressNumber = 30
          await this.getPropertyTypes()
          this.progressNumber = 40
          if (
            pdfData.trans_occupancy_status
          ) {
            const { data: { name } } = await WorkingStatusesServices.fetchOneItem(pdfData.trans_occupancy_status)
            pdfData.transOccupancyName = name
          }

          pdfData.trans_Report_type = transReportTypeName
          pdfData.imageBase = 'https://taqeeem.millennium.sa/'
          pdfData.facility = facility
          pdfData.propTypeList = []
          pdfData.transConstructionList = []
          pdfData.customer.reportName = reportName

          const { data: oneTransactionData } = await TransactionsServices.fetchOneItem(id)
          pdfData.conditioners = oneTransactionData.transactions_conditioners
          const buildings = [
            { building_type: 'الأرض', space: 0, price: 0, total: 0 },
            { building_type: 'القبو', space: 0, price: 0, total: 0 },
            { building_type: 'دور أرضي', space: 0, price: 0, total: 0 },
            { building_type: 'دور أول', space: 0, price: 0, total: 0 },
            { building_type: 'الملاحق العلوية', space: 0, price: 0, total: 0 },
            { building_type: 'الملاحق السفلية', space: 0, price: 0, total: 0 },
            { building_type: 'الأسوار', space: 0, price: 0, total: 0 },
            { building_type: 'أخرى', space: 0, price: 0, total: 0 },
          ]
          pdfData.attached_file = oneTransactionData.media.find(i => i.collection_name === 'attached_file')
          pdfData.instrument_files = oneTransactionData.media.filter(i => i.collection_name === 'instrument_file')
          pdfData.assignment_letter_files = oneTransactionData.media.filter(i => i.collection_name === 'assignment_letter_file')
          pdfData.transactions_buildings = oneTransactionData.transactions_buildings || buildings
          /**
           * ?
           */
          let images = []

          images = oneTransactionData
        ?.images
        ?.filter(img => img.status === '1')
        ?.map(img => ({ image: img.image_url })) || []

          images = pdfData.customer.image_per_page === '6' ? images.slice(0, 6) : images.slice(0, 8)

          const defaultImage = facility?.logo

          const defaultImageAfterResize = await this.resizeImg(defaultImage, 100, 50)
          pdfData.images = await this.margeImg(images, defaultImageAfterResize)
          /**
           * ? formating the water_meter_number & electric_meter_number to be an array
           */

          pdfData.water_meter_number = split(pdfData.water_meter_number)
          pdfData.electric_meter_number = split(pdfData.electric_meter_number)
          /**
           * ? format members
           */
          const members = []
          // fetch transaction
          const { data: roles } = await UserSettingServices.getAllItems()

          if (oneTransactionData.participatingmembers) {
            for (let index = 0; index < oneTransactionData.participatingmembers.length; index++) {
              const userId = oneTransactionData.participatingmembers[index].user_id
              const { data: { name, id_number: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
              members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
            }
          }

          if (oneTransactionData.customer.input_stage_sign_show === 1) {
            const userId = +oneTransactionData.customer.input_stage_name_show
            const { data: { name, id_number: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
            members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
          }
          if (oneTransactionData.customer.evaluation_stage_sign_show === 1) {
            const userId = +oneTransactionData.customer.evaluation_stage_name_show
            const { data: { name, id_number: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
            members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
          }

          if (oneTransactionData.customer.review_stage_sign_show === 1) {
            const userId = +oneTransactionData.customer.review_stage_name_show
            const { data: { name, id_number: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
            members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
          }

          if (oneTransactionData.customer.adoption_stage_sign_show === 1) {
            const userId = +oneTransactionData.customer.adoption_stage_name_show
            const { data: { name, id_number: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
            members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
          }
          pdfData.members = members
          /**
           * ? this is done to only get 4 items including the selected one
           */
          let propertyTypeSelected = 0
          let selectedPropertyTypeFound = false
          let counter = 0
          this.transConstructionList.forEach(value => {
            if (propertyTypeSelected >= 4 && selectedPropertyTypeFound) {
              return
            }
            if (value.id === pdfData.property_type_id) {
              pdfData.transConstructionList[counter] = value
              selectedPropertyTypeFound = true
            } else {
              pdfData.transConstructionList[counter] = value
              propertyTypeSelected++
            }
            counter++
            if (counter > 3) counter = 0
          })

          let constructionConditionSelected = 0
          let constructionConditionFound = false
          let counterC = 0
          this.propTypeList.forEach(value => {
            if (constructionConditionSelected >= 4 && constructionConditionFound) {
              return
            }
            if (value.id === pdfData.property_type_id) {
              pdfData.propTypeList[counterC] = value
              constructionConditionFound = true
            } else {
              pdfData.propTypeList[counterC] = value
              constructionConditionSelected++
            }
            counterC++
            if (counterC > 3) counterC = 0
          })

          // pdfData.transactions_buildings = [
          //   { building_type: 'الأرض', space: 321, price: 12, total: 1234 },
          //   { building_type: 'القبو', space: 321, price: 321, total: 321 },
          //   { building_type: 'دور أرضي', space: 321, price: 321, total: 321 },
          //   { building_type: 'دور أول', space: 3210, price: 321, total: 321 },
          //   { building_type: 'الملاحق العلوية', space: 321, price: 321, total: 321 },
          //   { building_type: 'الملاحق السفلية', space: 321, price: 321, total: 321 },
          //   { building_type: 'الأسوار', space: 321, price: 321, total: 321 },
          //   { building_type: 'أخرى', space: 321, price: 321, total: 321 },
          // ]
          this.pdfData = pdfData
          if (pdfData.sample.name.includes('بناء ذاتي') || pdfData.sample.name.includes('البناء الذاتي')) {
            this.pdfData.achievement = oneTransactionData.achievement
            this.pdfData.prop_floor = oneTransactionData.prop_floor
            this.$refs.html2PdfAnother.generatePdf()
          } else {
            this.$refs.html2Pdf.generatePdf()
          }
        } catch (err) {
          console.log(err)
          this.errorMessage = 'يوجد مشكلة في تحميل الملف برجاء المحاولة مرة اخري'
          this.errorSnackbar = true
          this.progressNumber = 0
          this.showProgress = false
        }
        // this.pdfData = defaultValuesForPdf
      },
      resizeImg: function (datas, wantedWidth, wantedHeight) {
        return new Promise((resolve, reject) => {
          // We create an image to receive the Data URI
          const img = document.createElement('img')

          // When the event "onload" is triggered we can resize the image.
          img.onload = function () {
            // We create a canvas and get its context.
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth
            canvas.height = wantedHeight

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight)

            const dataURI = canvas.toDataURL()

            resolve(dataURI)
          }

          // We put the Data URI in the image's src attribute
          img.src = datas
          img.crossOrigin = 'Anonymous'
        })
      },
      margeImg: async function (images, defaultImage) {
        // const defaultOptionsDefaultImage =
        // { src: defaultImage, x: 452, y: 370, opacity: 0.7 }
        const defaultOptionsDefaultImage = { src: defaultImage, x: 352 - 100, y: 240 - 50, opacity: 0.3 }
        const resultImages = []
        for (let index = 0; index < images.length; index++) {
          resultImages.push({
            image:
              await mergeImages([await this.resizeImg(images[index].image, 352, 240), defaultOptionsDefaultImage]
                                , { crossOrigin: 'Anonymous' }),
          })
        }
        // console.log(images, images.length)
        // console.log(resultImages, resultImages.length)
        return resultImages
      },
      getFacility: async function () {
        const { data } = await SettingService.getFacility()
        return data
      },
      getReportType: async function (id) {
        const { data: { name } } = await ReportTypesServices.fetchOneItem(id)
        return name
      },
      fetchAllItems: async function (options) {
        this.isLoading = true
        // const { page, itemsPerPage } = this.options
        // const pageNumber = page - 1
        const items = await TransactionsServices.getAllItems(options)
        // console.clear()
        const { type } = options
        switch (type) {
          case 1 :
            this.$store.dispatch('setTotal', { type: 'underEvaluation', total: items.total })
            break
          case 2 :
            this.$store.dispatch('setTotal', { type: 'underReview', total: items.total })
            break
          case 3 :
            this.$store.dispatch('setTotal', { type: 'underApproval', total: items.total })
            break
          case 4:
            this.$store.dispatch('setTotal', { type: 'added', total: items.total })
            break
          default:
            break
        }
        items.data.map(item => {
          item.status = this.statuses[item.status]
        })
        this.itemsTr = items.data
        this.total = items.total
        this.isLoading = false
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
      getConstructionCondition: async function () {
        const { data } = await constructionConditionsService.getAllItems()
        this.transConstructionList = data.data.map(({ id, name }) => ({
          id: String(id), name,
        }))
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

      deleteTransaction: async function (id) {
        try {
          const { success } = await TransactionsServices.deleteOneItem(id)
          if (success === true) {
            this.itemsTr = this.itemsTr.filter(item => item.id !== +id)
            this.successSnackbar = true
            this.successMessage = 'تم حذف المعاملة بنجاح'
          }
        } catch {
          this.errorSnackbar = true
          this.errorMessage = 'حدثت مشكلة أثناء الحذف برجاء المحاولة وقت لاحق'
        }
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

.number_link {
  color:#3772ff !important;
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
