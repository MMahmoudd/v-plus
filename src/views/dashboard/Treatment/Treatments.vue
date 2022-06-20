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
              <div style="text-align:left">
                <v-btn
                  id="cancel-filter"
                  icon
                  text
                  style="margin-left:20px"
                  large
                  @click="dialog=false"
                >
                  <i class="v-icon notranslate v-icon--right mdi mdi-close theme--dark" />
                </v-btn>
              </div>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <label class="d-block mb-3 font-weight-bold">العميل</label>
                      <v-autocomplete
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
                            clearable
                            placeholder="YYYY-MM-DD Format"
                            hint="YYYY-MM-DD Format"
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
                            clearable
                            placeholder="YYYY-MM-DD Format"
                            hint="YYYY-MM-DD Format"
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
                    <!-- <div class="mr-3">
                      <v-checkbox
                        v-model="data.filterBy['1']"
                        class="check-label"
                        label="تاريخ الإرسال"
                        color="success"
                        value=""
                        hide-details
                      />
                    </div> -->
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.order_by"
                        class="check-label"
                        label="تاريخ الإدخال"
                        color="success"
                        value="created_at"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.order_by"
                        class="check-label"
                        label="تاريخ التكليف"
                        color="success"
                        value="trans_assignment_date"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.order_by"
                        class="check-label"
                        label="تاريخ التقييم"
                        color="success"
                        value="trans_evaluation_date"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.order_by"
                        class="check-label"
                        label="تاريخ المعاينة"
                        color="success"
                        value="trans_inspection_date"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.order_by"
                        class="check-label"
                        label="ناريخ الاعتماد"
                        color="success"
                        value="trans_approvition_date"
                        hide-details
                      />
                    </div>
                  </v-row>
                  <v-row class="mt-10">
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المدخل</label>
                      <v-autocomplete
                        v-model="data.add_by"
                        :items="usersList"
                        item-text="name"
                        item-value="id"
                        label="المدخل"
                        single-line
                        outlined
                        clearable
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المقيم</label>
                      <v-autocomplete
                        v-model="data.resident_id"
                        :items="usersList"
                        item-text="name"
                        item-value="id"
                        label="المقيم"
                        single-line
                        outlined
                        clearable
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المراجع</label>
                      <v-autocomplete
                        v-model="data.reviewer_id"
                        :items="usersList"
                        item-text="name"
                        item-value="id"
                        label="المراجع"
                        single-line
                        outlined
                        clearable
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المعمد</label>
                      <v-autocomplete
                        v-model="data.approved_id"
                        :items="usersList"
                        item-text="name"
                        item-value="id"
                        label="المعمد"
                        single-line
                        outlined
                        clearable
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">الغرض من التقييم</label>
                      <v-autocomplete
                        v-model="data.evaluation_purpose_id"
                        :items="evaluationPurposeList"
                        label="الغرض من التقييم"
                        item-text="name"
                        item-value="id"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">نوع العقار</label>
                      <v-autocomplete
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
                      <v-autocomplete
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
                      lg="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المنطقة</label>
                      <v-autocomplete
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
                      lg="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">اسم المدينة</label>
                      <v-autocomplete
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
                      lg="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">اسم الحى</label>
                      <v-autocomplete
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
                        v-model="data.status"
                        class="check-label"
                        label="مسودة"
                        color="success"
                        :value="1"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.status"
                        class="check-label"
                        label="تحت التقييم"
                        color="success"
                        :value="2"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.status"
                        class="check-label"
                        label="تحت المراجعة"
                        color="success"
                        :value="3"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.status"
                        class="check-label"
                        label="قيد الإعتماد"
                        color="success"
                        :value="4"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.status"
                        class="check-label"
                        label="معتمدة"
                        color="success"
                        :value="5"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.status"
                        class="check-label"
                        label="معلقة"
                        color="success"
                        :value="7"
                        hide-details
                      />
                    </div>
                    <div class="mr-3">
                      <v-checkbox
                        v-model="data.status"
                        class="check-label"
                        label="ملغية"
                        color="success"
                        :value="8"
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
                  @click="filterTransctions();fetchAllItems(data);dialog=false"
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
            @beforeDownload="beforeDownload($event)"
          >
            <pdf-content
              slot="pdf-content"
              :data="pdfData"
              :style-data="styleData"
              :style-sub-data="styleSubData"
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
            @beforeDownload="beforeDownload($event)"
          >
            <pdf-content-another
              slot="pdf-content"
              :data="pdfData"
              :style-data="styleData"
              :style-sub-data="styleSubData"
            />
          </vue-html2pdf>
        </div>
      </template>
      <!--pdf content fernch-->
      <template>
        <div>
          <vue-html2pdf
            ref="html2PdfFrench"
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="true"
            :paginate-elements-by-height="1400"
            filename="نموذج التقرير"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            @beforeDownload="beforeDownload($event)"
          >
            <pdf-french
              slot="pdf-content"
              :data="pdfData"
              :style-data="styleData"
              :style-sub-data="styleSubData"
            />
          </vue-html2pdf>
        </div>
      </template>
      <template>
        <v-data-table
          :loading="isLoading"
          :headers="headers"
          :items="itemsTr"
          :items-per-page="20"
          :options.sync="options"
          :server-items-length="total"
          class="elevation-1"
        >
          <template v-slot:[`item.transaction_id`]="{ item }">
            <router-link
              :to="{
                name: item.status !== 1 && item.statusWhenSuspended !== 1 ? 'EvaluateTreatment' : 'NewTreatment',
                params: {id: item.id},
                query: item.status !== 1 && item.statusWhenSuspended !== 1 ? {} : {sample_id: item.sample_id}
              }"
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
              {{ statuses[item.status] }}
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
                        <a
                          target="_blank"
                          :href="'https://development.millennium.sa/api/v1/generate-PDF-sample-file?transaction_id='+item.id"
                        >
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
                    <v-list-item v-if="permissons.create_transaction.remove">
                      <v-list-item-title>
                        <a @click="handleDeleteTransactionDialog(item.id, item.transaction_id, )">
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
    <v-dialog v-model="deleteTransactionDialog.show">
      <v-card>
        <v-card-title class="text-h5">
          {{ deleteTransactionDialog.title }}
        </v-card-title>

        <v-card-text>
          {{ deleteTransactionDialog.body }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="red darken-1"
            text
            @click="deleteTransactionDialog.show = false"
          >
            إلغاء
          </v-btn>

          <v-btn
            :color="deleteTransactionDialog.saveButton.color"
            :class="deleteTransactionDialog.saveButton.class"
            text
            @click="deleteTransactionDialog.saveButton.action"
          >
            <v-icon v-if="deleteTransactionDialog.saveButton.icon !== ''">
              {{ deleteTransactionDialog.saveButton.icon }}
            </v-icon>
            {{ deleteTransactionDialog.saveButton.text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      bottom
      left
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="successSnackbar"
      color="green"
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
  import { reportNameList } from '../../../staticLists/customers'
  import { getFieldByKey, getKey } from '../../../Utils/transactionPdf'
  // import mergeImages from 'merge-images'
  /**
   * ? static data
   */
  import defaultValuesForPdf from './defaultValuesForPdf'
  /**
   * * third library
   */
  import mergeImages from 'merge-images'
  import qs from 'qs'
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

  export default {
    name: 'NewTreatment',
    components: {
      VueHtml2pdf: () => import('vue-html2pdf'),
      PdfContent: () => import('./Pdf/PdfContent.vue'),
      CustomProgress: () => import('../component/progress.vue'),
      SelectSample: () => import('./SelectSample.vue'),
      PdfContentAnother: () => import('./Pdf/PdfContentAnother.vue'),
      PdfFrench: () => import('./Pdf/pdfFrench.vue'),
    },
    props: {
      type: { type: Number, required: false, default: 0 },
      status: { type: Array, required: false, default: () => ([]) },
    },
    data: () => ({
      errorSnackbar: false,
      successSnackbar: false,
      successMessage: '',
      timeout: 3000,
      errorMessage: '',
      progressNumber: 0,
      showProgress: false,
      deleteTransactionDialog: {
        show: false,
        title: '',
        extraData: { transactionId: '' },
        body: '',
        saveButton: {
          text: 'تأكيد',
          color: '',
          class: 'ma-2 light-green-btn',
          icon: '',
          action: '',
        },
      },
      permissons: {
        edit_price: {},
        create_transaction: {},
      },
      /**
       * ? pdf data
       */
      pdfData: {
        ...defaultValuesForPdf,
      },
      styleData: {
        'background-color': '#187F7B',
        'border-color': '#ccc',
        color: '#fff',
      },
      styleSubData: {
        'background-color': '#F3F5F5',
        'border-color': '#ccc',
        color: '#000',
      },
      /**
       * ? component data
      */
      data: {
        region_id: '',
        customer_id: '',
        neighborhood_id: '',
        property_type_id: '',
        property_rating_id: '',
        evaluation_purpose_id: '',
        reviewer_id: '',
        resident_id: '',
        status: [],
        order_by: [],
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
      usersList: [],
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
      page: 1,
      total: 0,
      numberOfPages: 0,
      options: { itemsPerPage: 20 },
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
        handler ({ page: oldPage }, { page: newPage }) {
          // console.log(oldPage)
          // console.log(newPage)
          if (oldPage !== newPage) {
            this.fetchAllItems({ page: oldPage, type: this.type, status: this.status })
          }
        },
        deep: true,
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
            this.getAllUsers()
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
      this.options = { page: 1, itemsPerPage: 20 }
      // this.fetchAllItems({ type: this.type, status: this.status })
      this.getConstructionCondition()
    },
    methods: {
      onProgressPdf: function (data) {
        // console.log('progress ==>', data)
        this.progressNumber = data
        if (data === 100) {
          setTimeout(() => {
            this.showProgress = false
          }, 2000)
        }
      },
      onHasPaginated: async function () {
        this.showProgress = false
      },
      beforeDownload: async function ({ html2pdf, options, pdfContent }) {
        this.progressNumber = 80
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
        this.progressNumber = 100

        setTimeout(() => {
          this.showProgress = false
          this.progressNumber = 0
        }, 1000)
      },
      // pdf
      generateReport: async function (selectedTransactionId) {
        // ?
        function split (string) {
          if (!string) {
            return []
          } else {
            return string.split(';')
          }
        }

        function getRoleName (roles, type) {
          return roles.find(role => +role.id === +type)?.role_name || ''
        }
        try {
          this.progressNumber = 0
          this.pdfDataLoading = true
          this.showProgress = true
          const pdfData = this.itemsTr.find(transaction => transaction.id === selectedTransactionId)
          // console.log(pdfData)
          this.progressNumber = 10
          const facility = await this.getFacility()
          this.progressNumber = 20
          const transReportTypeName = await this.getReportType(pdfData.trans_Report_type)
          // const reportName = await this.getReportType(pdfData.customer.report_id)
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

          const { data: oneTransactionData } = await TransactionsServices.fetchOneItem(selectedTransactionId)
          const resportNameKey = getKey(reportNameList, (item) => item.id === (pdfData.customer.report_id || 1), 'key')
          const reportName = getFieldByKey(oneTransactionData, resportNameKey, pdfData)
          pdfData.customer.reportName = reportName
          /**
           * ? adding colors
           */
          // * styles for table's header
          this.styleData['background-color'] = pdfData.customer.cs_data_background_color
          this.styleData.color = pdfData.customer.cs_data_fount_color
          this.styleData['border-color'] = pdfData.customer.cs_data_frame_color
          // * styles for columns header
          this.styleSubData['background-color'] = pdfData.customer.cs_subdata_background_color
          this.styleSubData.color = pdfData.customer.cs_subdata_fount_color
          this.styleSubData['border-color'] = pdfData.customer.cs_subdata_frame_color
          //
          // const { data: oneTransactionData } = await TransactionsServices.fetchOneItem(id)
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
           * ? images
           */
          // * customer logo
          const customerLogo = pdfData.customer.cs_logo
          pdfData.customer.cs_logo = customerLogo?.startsWith('http') ? customerLogo : `https://devproject.millennium.sa/${customerLogo}`

          // * transaction images'
          let images = []

          images = oneTransactionData
        ?.images
        ?.filter(img => img.status === '1')
        ?.map(img => ({
           image: img.image_url,
          sort_number: img.sort_number,
          date: new Date(img.created_at).toLocaleString(),
           })) || []
          // console.log(images)
          images.sort((a, b) => {
            if (a.sort_number > b.sort_number) {
              return 1
            } else if (a.sort_number < b.sort_number) {
              return -1
            }
            return 0
          })

          images = pdfData.customer.image_per_page === '6' ? images.slice(0, 6) : images.slice(0, 8)
          this.progressNumber = 50
          const defaultImage = facility?.logo

          // ! REPLACE IT WITH POSITION ABSOLUTE
          let defaultImageAfterResize

          if (defaultImage) {
            defaultImageAfterResize = await this.resizeImg(defaultImage, 100, 50)
          }
          pdfData.images = await this.margeImg(images, defaultImageAfterResize)
          // console.log(pdfData.images)
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
          // ! TODO
          if (oneTransactionData.participatingmembers) {
            const participatingMembersLength = oneTransactionData.participatingmembers.length
            for (let index = 0; index < participatingMembersLength; index++) {
              // const userId = oneTransactionData.participatingmembers[index].user_id
              // const stage = oneTransactionData.participatingmembers[index].stage
              const { user_id: userId, stage } = oneTransactionData.participatingmembers[index]
              const { data: { name, membership_no: number, user_type: type, otheruser } } = await UsersServices.fetchOneItem(userId)
              if (otheruser) {
                const { name, membership_no: number, user_type: type } = otheruser
                members.push({ name, number, type: getRoleName(roles, type), s: '', stage })
              } else {
                members.push({ name, number, type: getRoleName(roles, type), s: '', stage })
              }
            }
          }

          // eslint-disable-next-line no-inner-declarations
          async function assignMembers (customer, stage) {
            const stages = {
              0: { sign: 'input_stage_sign_show', name: 'input_stage_name_show' },
              1: { sign: 'evaluation_stage_sign_show', name: 'evaluation_stage_name_show' },
              2: { sign: 'review_stage_sign_show', name: 'review_stage_name_show' },
              3: { sign: 'adoption_stage_sign_show', name: 'adoption_stage_name_show' },
            }

            if (customer[stages[stage].sign] === 1) {
              const userId = +customer[stages[stage].name]
              if (userId !== -1) {
                const { data: { name, membership_no: number, user_type: type } } = await UsersServices.fetchOneItem(userId)

                const stageIndex = members.findIndex(member => member?.stage === stage)

                if (stageIndex > -1) {
                  members[stageIndex] = { name, number, type: getRoleName(roles, type) }
                }
              }
            } else {
              const stageIndex = members.findIndex(member => member?.stage === stage)
              if (stageIndex > -1) {
                members.splice(stageIndex, 1)
              }
            }
          }

          await assignMembers(oneTransactionData.customer, '0')
          this.progressNumber = 55
          await assignMembers(oneTransactionData.customer, '1')
          this.progressNumber = 60
          await assignMembers(oneTransactionData.customer, '2')
          this.progressNumber = 65
          await assignMembers(oneTransactionData.customer, '3')

          // if (oneTransactionData.customer.input_stage_sign_show === 1) {
          //   const userId = +oneTransactionData.customer.input_stage_name_show
          //   if (userId !== -1) {
          //     const { data: { name, membership_no: number, user_type: type } } = await UsersServices.fetchOneItem(userId)

          //     const stageIndex = members.findIndex(member => member?.stage === '0')

          //     if (stageIndex > -1) {
          //       members[stageIndex] = { name, number, type: getRoleName(roles, type) }
          //     }

          //     // members.forEach((member, index) => {
          //     //   if (member?.stage === '0') {
          //     //     members[index] = { name, number, type: getRoleName(roles, type) }
          //     //   }
          //     // })
          //   }
          // } else {
          //   const stageIndex = members.findIndex(member => member?.stage === '0')
          //   if (stageIndex > -1) {
          //     members.splice(stageIndex, 1)
          //   }
          // }

          // if (oneTransactionData.customer.evaluation_stage_sign_show === 1) {
          //   const userId = +oneTransactionData.customer.evaluation_stage_name_show
          //   const { data: { name, membership_no: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
          //   members.forEach((member, index) => {
          //     if (member?.stage === '1') {
          //       members[index] = { name, number, type: getRoleName(roles, type) }
          //     }
          //   })

          //   // members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
          // }

          // if (oneTransactionData.customer.review_stage_sign_show === 1) {
          //   const userId = +oneTransactionData.customer.review_stage_name_show
          //   const { data: { name, membership_no: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
          //   members.forEach((member, index) => {
          //     if (member?.stage === '2') {
          //       members[index] = { name, number, type: getRoleName(roles, type) }
          //     }
          //   })
          //   // members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
          // }

          // if (oneTransactionData.customer.adoption_stage_sign_show === 1) {
          //   const userId = +oneTransactionData.customer.adoption_stage_name_show
          //   const { data: { name, membership_no: number, user_type: type } } = await UsersServices.fetchOneItem(userId)
          //   members.forEach((member, index) => {
          //     if (member?.stage === '3') {
          //       members[index] = { name, number, type: getRoleName(roles, type) }
          //     }
          //   })
          //   // members.push({ name, number, type: roles.find(role => +role.id === +type)?.role_name, s: '' })
          // }
          // ! ADD PROGRESS NUMBER 60
          pdfData.members = members
          this.progressNumber = 70

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
            this.pdfData.evaluation_criteria = (oneTransactionData.evaluation_criteria || [1, 2, 3]).map(x => +x)

            if (pdfData.sample.name === 'نموذج البنك الفرنسى - شركات') {
              this.$refs.html2PdfFrench.generatePdf()
            } else {
              this.$refs.html2Pdf.generatePdf()
            }
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
            date: images[index].date,
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
      filterTransctions: async function () {
        const data = { ...this.data }
        for (const key in data) {
          if (!data[key]) {
            delete data[key]
          }
        }
        history.replaceState(null, null, '?' + qs.stringify({ ...data, page: this.page }))
        // console.log(qs.stringify(data))
        // this.$router.replace({ query: data })
      },
      fetchAllItems: async function (options) {
        this.isLoading = true
        let _options = { ...options } || {}
        if (this.$route.path === '/Treatments') {
          _options = { ..._options, ...qs.parse(window.location.search.substr(1)) }
        } else {
          const { page } = this.options
          _options.page = page
        }
        // console.log(options)
        // const pageNumber = page - 1
        const items = await TransactionsServices.getAllItems(_options)
        // console.clear()
        if (this.$route.path === '/') {
          const { type, status } = _options
          switch (type) {
            case 1 :
              this.$store.dispatch('setTotal', { type: 'underEvaluation', total: items.total })
              break
            case 2 :
              this.$store.dispatch('setTotal', { type: 'underReview', total: items.total })
              break
            case 3 :
              if (status === 5) {
                this.$store.dispatch('setTotal', { type: 'approvaed', total: items.total })
              } else {
                this.$store.dispatch('setTotal', { type: 'underApproval', total: items.total })
              }
              break
            case 4:
              this.$store.dispatch('setTotal', { type: 'added', total: items.total })
              break
            default:
              break
          }

          // if there is no type
          if (!_options.type && _options.status) {
            switch (status) {
              case 7:
                this.$store.dispatch('setTotal', { type: 'suspended', total: items.total })
                break
              default:
                break
            }
            // console.log('I have only status, not type', _options.status)
          }
        }
        /**
         */
        // items.data.forEach(item => {
        //   item.status = this.statuses[item.status]
        // })
        this.itemsTr = items.data
        this.total = items.total
        this.isLoading = false
      },
      // dialog methods
      // filterTransctions: async function () {
      //   await TransactionsServices.filterItems(this.data)
      // },
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
      getAllUsers: async function () {
        const { data: { data } } = await UsersServices.getAllItems()
        this.usersList = Object.freeze(data.map(({ id, name }) => ({ id, name })))
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
      handleDeleteTransactionDialog: function (transactionId, transactionNumber) {
        this.deleteTransactionDialog.show = true
        this.deleteTransactionDialog.title = 'تأكيد الحذف'
        this.deleteTransactionDialog.body = `هل أنت متأكد من حذف المعاملة "${transactionNumber}" ؟`
        this.deleteTransactionDialog.saveButton.action = () => { this.deleteTransaction(transactionId); this.deleteTransactionDialog.show = false }
      },
      deleteTransaction: async function (id, index) {
        this.isLoading = true
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
        } finally {
          this.isLoading = false
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

.light-green-btn{
  background-color: #4DC334 !important;
  color: #fff !important;
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

// .elevation-1 .v-data-footer__select {
//   display: none !important;
// }
</style>

<style>
  .elevation-1 .v-data-footer__select {
    visibility: hidden;
  }
  .v-dialog {
      scrollbar-color: #3772FF rgba(0, 0, 0, 0.1);
    scrollbar-width: thin;
}
.v-dialog #cancel-filter i {
  transform: translateX(6px);
}

.v-dialog::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0.3);
    width: 8px;
    border-radius: 5px;
}

.v-dialog::-webkit-scrollbar-thumb {
    background: #3772FF ;
    border-radius: 5px;
}

</style>
