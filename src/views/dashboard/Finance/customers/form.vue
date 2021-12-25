<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? 'تعديل عميل' : 'اضافة عميل' }}
      </v-card-title>
      <template>
        <v-form
          v-model="valid"
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <h3
              class="mx-7 my-5 blue1"
            >
              البيانات الاساسية
            </h3>
            <v-row class="mx-lg-8 px-lg-8">
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>الاسم</label>
                <v-text-field
                  v-model="data.cs_name"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>رقم الهاتف</label>
                <v-text-field
                  v-model="data.cs_phone"
                  outlined
                  required
                  type="phone"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>البريد الاليكتروني</label>
                <v-text-field
                  v-model="data.cs_email"
                  outlined
                  required
                  type="email"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>نسخة الى</label>
                <v-text-field
                  v-model="data.cs_email_cc"
                  outlined
                  required
                  type="email"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>نوع العميل</label>
                <v-radio-group
                  v-model="data.cs_type"
                  row
                >
                  <v-radio
                    label="فرد"
                    color="blue"
                    value="1"
                  />
                  <v-radio
                    label="منشأة"
                    color="blue"
                    value="2"
                  />
                </v-radio-group>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>النموذج الافتراضي</label>
                <v-select
                  v-model="data.sample_id"
                  :items="sampleList"
                  item-text="name"
                  item-value="id"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>الرقم الضريبي</label>
                <v-text-field
                  v-model="data.cs_vat_num"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="5"
              >
                <label>شعار العميل</label>
                <v-file-input
                  show-size
                  chips
                  required
                  outlined
                  prepend-icon="mdi-camera"
                  accept="image/png, image/jpeg, image/bmp"
                  @change="onCs_logo"
                />
              </v-col>
              <v-col
                v-if="data.cs_logo"
                cols="12"
                sm="3"
                md="2"
              >
                <label>صورة العميل</label>
                <br>
                <img
                  width="50"
                  :src="data.cs_logo"
                  alt="Image"
                >
              </v-col>
            </v-row>
            <v-spacer />
            <hr>
            <h3
              class="mx-7 my-5 blue1"
            >
              اعدادات التقارير
            </h3>
            <v-row class="mx-lg-8 px-lg-8">
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <label>اسم التقرير</label>
                    <v-select
                      v-model="data.report_id"
                      :items="reportList"
                      item-text="name"
                      item-value="id"
                      outlined
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <label>عرض شعار العميل في التقرير</label>
                    <v-radio-group
                      v-model="data.show_logo"
                      row
                    >
                      <v-radio
                        label="نعم"
                        color="blue"
                        value="1"
                      />
                      <v-radio
                        label="لا"
                        color="blue"
                        value="2"
                      />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      v-model="data_fount_color"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <label>لون خط البيانات الأساسية</label>
                        <v-text-field
                          v-model="data.cs_data_fount_color"
                          prepend-icon="fa-palette"
                          readonly
                          outlined
                          required
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-color-picker
                        v-model="data.cs_data_fount_color"
                        dot-size="13"
                        hide-mode-switch
                        mode="hexa"
                        swatches-max-height="250"
                      />
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      v-model="data_frame_color"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <label>لون اطار البيانات الأساسية</label>
                        <v-text-field
                          v-model="data.cs_data_frame_color"
                          prepend-icon="fa-palette"
                          readonly
                          outlined
                          required
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-color-picker
                        v-model="data.cs_data_frame_color"
                        dot-size="25"
                        hide-mode-switch
                        mode="hexa"
                        swatches-max-height="200"
                      />
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      v-model="data_background_color"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <label>لون خلفية البيانات الأساسية</label>
                        <v-text-field
                          v-model="data.cs_data_background_color"
                          prepend-icon="fa-palette"
                          readonly
                          outlined
                          required
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-color-picker
                        v-model="data.cs_data_background_color"
                        dot-size="25"
                        hide-mode-switch
                        mode="hexa"
                        swatches-max-height="200"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      v-model="subdata_fount_color"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <label>لون خط البيانات الفرعية</label>
                        <v-text-field
                          v-model="data.cs_subdata_fount_color"
                          label=""
                          prepend-icon="fa-palette"
                          readonly
                          outlined
                          required
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-color-picker
                        v-model="data.cs_subdata_fount_color"
                        dot-size="25"
                        hide-mode-switch
                        mode="hexa"
                        swatches-max-height="200"
                      />
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      v-model="subdata_frame_color"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <label>لون اطار البيانات الفرعية</label>
                        <v-text-field
                          v-model="data.cs_subdata_frame_color"
                          prepend-icon="fa-palette"
                          readonly
                          outlined
                          required
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-color-picker
                        v-model="data.cs_subdata_frame_color"
                        dot-size="25"
                        hide-mode-switch
                        mode="hexa"
                        swatches-max-height="200"
                      />
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      v-model="subdata_background_color"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <label>لون خلفية البيانات الفرعية</label>
                        <v-text-field
                          v-model="data.cs_subdata_background_color"
                          label=""
                          prepend-icon="fa-palette"
                          readonly
                          outlined
                          required
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-color-picker
                        v-model="data.cs_subdata_background_color"
                        dot-size="25"
                        hide-mode-switch
                        mode="hexa"
                        swatches-max-height="200"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <label>عدد الصور في كل صغحة</label>
                    <v-radio-group
                      v-model="data.image_per_page"
                      row
                    >
                      <v-radio
                        label="6"
                        color="blue"
                        value="6"
                      />
                      <v-radio
                        label="8"
                        color="blue"
                        value="8"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <label>عرض التاريخ والوقت علي الصور</label>
                    <v-radio-group
                      v-model="data.date_time_show"
                      row
                    >
                      <v-radio
                        label="نعم"
                        color="blue"
                        value="1"
                      />
                      <v-radio
                        label="لا"
                        color="red"
                        value="2"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <label>اضافة خريطة المقارنات</label>
                    <v-radio-group
                      v-model="data.map_show"
                      row
                    >
                      <v-radio
                        label="نعم"
                        color="blue"
                        value="1"
                      />
                      <v-radio
                        label="لا"
                        color="red"
                        value="2"
                      />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-spacer />
            <hr>
            <h3
              class="mx-7 my-5 blue1"
            >
              تثبيت التوقيع في التقرير
            </h3>
            <v-row class="mx-lg-8 px-lg-8">
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <p class="mt-5">
                      مرحلة الادخال
                    </p>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-radio-group
                      v-model="data.input_stage_sign_show"
                      row
                    >
                      <v-radio
                        label="اظهار"
                        color="blue"
                        value="1"
                      />
                      <v-radio
                        label="اخفاء"
                        color="red"
                        value="2"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <label>الاسم الذي سيظهر في التوقيع</label>
                    <v-select
                      v-model="data.input_stage_name_show"
                      :items="ListUsers"
                      item-text="name"
                      item-value="id"
                      outlined
                      required
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <p class="mt-5">
                      مرحلة التقييم
                    </p>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-radio-group
                      v-model="data.evaluation_stage_sign_show"
                      row
                    >
                      <v-radio
                        label="اظهار"
                        color="blue"
                        value="1"
                      />
                      <v-radio
                        label="اخفاء"
                        color="red"
                        value="2"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <label>الاسم الذي سيظهر في التوقيع</label>
                    <v-select
                      v-model="data.evaluation_stage_name_show"
                      :items="ListUsers"
                      item-text="name"
                      item-value="id"
                      outlined
                      required
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <p class="mt-5">
                      مرحلة المراجعة
                    </p>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-radio-group
                      v-model="data.review_stage_sign_show"
                      row
                    >
                      <v-radio
                        label="اظهار"
                        color="blue"
                        value="1"
                      />
                      <v-radio
                        label="اخفاء"
                        color="red"
                        value="2"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <label>الاسم الذي سيظهر في التوقيع</label>
                    <v-select
                      v-model="data.review_stage_name_show"
                      :items="ListUsers"
                      item-text="name"
                      item-value="id"
                      outlined
                      required
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <p class="mt-5">
                      مرحلة الاعتماد
                    </p>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-radio-group
                      v-model="data.adoption_stage_sign_show"
                      row
                    >
                      <v-radio
                        label="اظهار"
                        color="blue"
                        value="1"
                      />
                      <v-radio
                        label="اخفاء"
                        color="red"
                        value="2"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <label>الاسم الذي سيظهر في التوقيع</label>
                    <v-select
                      v-model="data.adoption_stage_name_show"
                      :items="ListUsers"
                      item-text="name"
                      item-value="id"
                      outlined
                      required
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-spacer />
            <hr>
            <h3
              class="mx-7 my-5 blue1"
            >
              التسعير
            </h3>
            <v-row class="mx-lg-8 px-lg-8">
              <v-col
                cols="12"
              >
                <template>
                  <v-row
                    class="border"
                  >
                    <v-col
                      v-for="(item, index) in data.pricing"
                      :key="index"
                      cols="12"
                    >
                      <v-card
                        class="pa-2 ma-2"
                      >
                        <v-card-title>
                          بيان سعر جديد
                          <v-spacer />
                          <v-btn
                            medium
                            color="red"
                            @click="deletePricing(index)"
                          >
                            <v-icon
                              aria-label="Close"
                            >
                              fa-trash-alt
                            </v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-row class="px-5 py-5">
                          <v-select
                            v-model="item.region_id"
                            :items="regionList"
                            class="mx-2"
                            item-text="name"
                            item-value="id"
                            label="المنطقة"
                            outlined
                            required
                          />
                          <v-select
                            v-model="item.city_list"
                            :items="cityList.filter(city => city.regionId === item.region_id)"
                            class="mx-2"
                            item-text="name"
                            item-value="id"
                            label="المدينة"
                            outlined
                            required
                            multiple
                            chips
                          />
                          <v-select
                            v-model="item.use_property_id"
                            :items="propertyList"
                            class="mx-2"
                            item-text="name"
                            item-value="id"
                            label="استخدام العقار"
                            outlined
                            required
                          />
                          <v-select
                            v-model="item.customer_id"
                            :items="propertyTypeList"
                            class="mx-2"
                            item-text="name"
                            item-value="id"
                            label="نوع العقار"
                            outlined
                            required
                          />
                          <v-text-field
                            v-model="item.custom_price"
                            label="السعر المخصص"
                            outlined
                            required
                          />
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-btn
                  medium
                  class="mx-1 my-1"
                  color="blue"
                  @click="addNewPricing()"
                >
                  اضافة حقل جديد +
                </v-btn>
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="loading"
              :disabled="disabled"
            >
              {{ this.$route.params.id ? 'حفظ' : 'اضافة' }}
            </v-btn>
          </v-container>
        </v-form>
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
  const CustomersService = ServiceFactory.get('Customers')
  const RegionsService = ServiceFactory.get('Regions')
  const CitesService = ServiceFactory.get('Cites')
  const PropertyRatingsService = ServiceFactory.get('PropertyRatings')
  const PropertyTypesService = ServiceFactory.get('PropertyTypes')
  const SamplesService = ServiceFactory.get('Samples')
  const UsersService = ServiceFactory.get('Users')
  const ReportTypesServices = ServiceFactory.get('ReportTypes')

  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        cs_name: '',
        cs_phone: '',
        cs_email: '',
        cs_email_cc: '',
        cs_type: '',
        sample_id: 0,
        cs_vat_num: '',
        cs_logo: '',
        report_id: 0,
        show_logo: '',
        cs_data_fount_color: '',
        cs_data_frame_color: '',
        cs_data_background_color: '',
        cs_subdata_fount_color: '',
        cs_subdata_frame_color: '',
        cs_subdata_background_color: '',
        image_per_page: '',
        date_time_show: '',
        map_show: '',
        input_stage_sign_show: '',
        evaluation_stage_sign_show: '',
        review_stage_sign_show: '',
        adoption_stage_sign_show: '',
        facility_stamp_show: '',
        input_stage_name_show: '',
        evaluation_stage_name_show: '',
        review_stage_name_show: '',
        adoption_stage_name_show: '',
        facility_stamp_name: '',
        land_default_price: 0,
        building_default_price: 0,
        pricing: [],
      },
      data_fount_color: false,
      subdata_fount_color: false,
      data_frame_color: false,
      subdata_frame_color: false,
      data_background_color: false,
      subdata_background_color: false,
      ListUsers: [],
      sampleList: [],
      reportList: [],
      regionList: [],
      cityList: [],
      propertyList: [],
      propertyTypeList: [],
      cs_logo: null,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
      this.getRegions()
      this.getCities()
      this.getPropertyRatings()
      this.getPropertyTypes()
      this.getSamples()
      this.getUsers()
      this.getReports()
    },
    methods: {
      onCs_logo (event) {
        this.cs_logo = event
      },
      addNewPricing () {
        this.data.pricing.push({
          customer_id: null,
          region_id: null,
          use_property_id: null,
          city_list: [],
          custom_price: null,
        })
      },
      deletePricing (index) {
        this.data.pricing.splice(index, 1)
      },
      async submitForm () {
        this.loading = true
        this.disabled = true

        const formData = new FormData()
        /**
         * ? converting the json object to a form-data format
         */
        function buildFormData (formData, data, parentKey) {
          if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
              buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
            })
          } else {
            const value = data == null ? '' : data

            formData.append(parentKey, value)
          }
        }

        buildFormData(formData, this.data)
        // for (const key in this.data) {
        //   if (Array.isArray(this.data[key])) {
        //     formData.append(key, JSON.stringify(this.data[key]))
        //   } else {
        //     formData.append(key, this.data[key])
        //   }
        // }

        if (this.$route.params.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await CustomersService.addUser(data)
        if (item.success === true) {
          this.successMessage = 'تمت الاضافة بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Users')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (id, data) {
        const item = await CustomersService.updateUser(id, data)
        if (item.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Users')
          }, 1500)
        } else {
          this.errorMessage('يوجد مشكلة في التعديل')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const user = await CustomersService.fetchOneItem(id)
        for (const key in user.data) {
          if (user.data[key] === null) {
            this.data[key] = this.data[key]
          } else {
            this.data[key] = user.data[key]
          }
        }
        // this.data = user.data
        this.dataLoading = false
      },
      async getRegions () {
        this.loading = true
        const { data } = await RegionsService.getAllItems()
        this.regionList = data.data.map(({ id, name }) => ({
          id, name,
        }))
        this.loading = false
      },
      async getCities () {
        this.loading = true
        const { data } = await CitesService.getAllItems()
        this.cityList = data.data.map((city) => ({
          name: city.name,
          id: city.id,
          regionId: city.region_id,
        }))
        this.loading = false
      },
      async getPropertyRatings () {
        this.loading = true
        const { data } = await PropertyRatingsService.getAllItems()
        this.propertyList = data.data
        this.loading = false
      },
      async getPropertyTypes () {
        this.loading = true
        const { data } = await PropertyTypesService.getAllItems()
        this.propertyTypeList = data.data
        this.loading = false
      },
      async getSamples () {
        this.loading = true
        const { data } = await SamplesService.getAllItems()
        this.sampleList = data
        this.loading = false
      },
      async getUsers () {
        this.loading = true
        const { data } = await UsersService.getAllItems()
        this.ListUsers = data.data
        this.loading = false
      },
      async getReports () {
        this.loading = true
        const { data } = await ReportTypesServices.getAllItems()
        this.reportList = data.data
        console.log('ListUsers', data.data)
        this.loading = false
      },
    },
  }
</script>
<style lang="scss" scoped>
.blue1{
  color: #48afff;
}
a{
  text-decoration: none;
}
</style>
