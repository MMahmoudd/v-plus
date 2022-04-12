<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <template>
      <v-form
        v-model="valid"
        :disabled="!permissions.update || !permissions.add"
        @submit.prevent="updateContent()"
      >
        <h1>بيانات المنشأة</h1>
        <v-container fluid>
          <v-card class="image-card">
            <v-img
              class="white--text align-end"
              height="300px"
              src="../../../assets/background.png"
            >
              <v-card-title class="Card-Title">
                <v-avatar
                  size="125"
                  color="#F5F5F5"
                >
                  <v-img
                    class="elevation-6 w-75"
                    alt=""
                    :src="data.logo"
                  />
                </v-avatar>
                <h2 class="text-center py-2">
                  {{ data.name }}
                </h2>
                <v-text-field
                  v-model="data.url"
                  suffix="millennium.sa"
                  outlined
                  class="w-300"
                />
              </v-card-title>
            </v-img>
          </v-card>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-card class="image-card py-2 px-3">
                <h3 class="head-card">
                  بيانات المنشأة
                </h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>اسم المنشأة:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.name"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>اسم الختم:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.seal_name"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>ارفاق الختم:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-file-input
                      outlined
                      chips
                      dense
                      label="إضافة مرفق"
                      @change="onNewFileSelected2()"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>صورة المنشأة:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-file-input
                      outlined
                      chips
                      dense
                      label="إضافة صورة"
                      prepend-icon="mdi-camera"
                      accept="image/png, image/jpeg, image/bmp"
                      @change="onNewFileSelected3()"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-card class="image-card py-2 px-3">
                <h3 class="head-card">
                  بيانات ضريبية
                </h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>رقم السجل التجاري:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.Commercial_Registration_number"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>الرقم الضريبي:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.Tax_Number"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>تاريخ بدء السجل التجاري:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-menu
                      v-model="Commercial_Registration_date"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="data.Commercial_Registration_date"
                          prepend-icon="mdi-calendar"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="data.Commercial_Registration_date"
                        @input="Commercial_Registration_date = false"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>تاريخ انتهاء السجل التجاري:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-menu
                      v-model="Commercial_Registration_expiry_date"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="data.Commercial_Registration_expiry_date"
                          prepend-icon="mdi-calendar"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="data.Commercial_Registration_expiry_date"
                        @input="Commercial_Registration_expiry_date = false"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-card class="image-card py-2 px-3">
                <h3 class="head-card">
                  بيانات التواصل
                </h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>رقم الهاتف:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.phone_number"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>البريد الالكتروني:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.email"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>الرقم الموحد:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.unified_number"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-card class="image-card py-2 px-3">
            <h3 class="head-card">
              هوية المقيم المعتمد
            </h3>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>الاسم</strong>
                </label>
                <v-text-field
                  v-model="data.resident_name"
                  outlined
                  placeholder="الاسم"
                  class="mt-1"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>فرع التقييم</strong>
                </label>
                <v-text-field
                  v-model="data.evaluation_branch"
                  outlined
                  placeholder="فرع التقييم"
                  class="mt-1"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>فئة العضوية</strong>
                </label>
                <v-text-field
                  v-model="data.membership_category"
                  outlined
                  class="mt-1"
                  placeholder="فئة العضوية"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>صفته</strong>
                </label>
                <v-text-field
                  v-model="data.resident_adjective"
                  outlined
                  class="mt-1"
                  placeholder="صفته"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>التوقيع</strong>
                </label>
                <v-file-input
                  outlined
                  chips
                  class="mt-1"
                  placeholder="إضافة مرفق"
                  @change="onNewFileSelected"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>رقم الترخيص</strong>
                </label>
                <v-text-field
                  v-model="data.license_number"
                  outlined
                  class="mt-1"
                  placeholder="رقم الترخيص"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>تاريخ الترخيص</strong>
                </label>
                <v-menu
                  v-model="license_date"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data.license_date"
                      prepend-icon="mdi-calendar"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="data.license_date"
                    @input="license_date = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="image-card py-2 px-3">
            <h3 class="head-card">
              العنوان الوطني
            </h3>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>المدينة</strong>
                </label>
                <v-text-field
                  v-model="data.city"
                  outlined
                  placeholder="المدينة"
                  class="mt-1"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>الحي</strong>
                </label>
                <v-text-field
                  v-model="data.neighborhood"
                  outlined
                  placeholder="الحي"
                  class="mt-1"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>الشارع</strong>
                </label>
                <v-text-field
                  v-model="data.street"
                  outlined
                  class="mt-1"
                  placeholder="الشارع"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>رقم المبنى</strong>
                </label>
                <v-text-field
                  v-model="data.building_number"
                  outlined
                  class="mt-1"
                  placeholder="رقم المبنى"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>رقم الوحدة</strong>
                </label>
                <v-text-field
                  v-model="data.unit_number"
                  outlined
                  class="mt-1"
                  placeholder="رقم الوحدة"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>الرمز البريدي</strong>
                </label>
                <v-text-field
                  v-model="data.postal_code"
                  outlined
                  class="mt-1"
                  placeholder="الرمز البريدي"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <label>
                  <strong>الرقم الإضافي</strong>
                </label>
                <v-text-field
                  v-model="data.extra_number"
                  outlined
                  class="mt-1"
                  placeholder="الرقم الإضافي"
                />
              </v-col>
            </v-row>
          </v-card>
          <v-btn
            type="submit"
            class="mx-auto my-auto d-flex"
            color="#3772FF"
            :loading="loading"
            :disabled="disabled || !permissions.update || !permissions.add"
          >
            <i class="far fa-save ml-2" />  حفظ
          </v-btn>
        </v-container>
      </v-form>
    </template>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      bottom
      right
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      bottom
      right
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const SettingService = ServiceFactory.get('Setting')
  export default {
    name: 'Companies',
    data: (vm) => ({
      permissions: {},
      dataLoading: false,
      valid: false,
      show1: false,
      license_date: false,
      Commercial_Registration_date: false,
      Commercial_Registration_expiry_date: false,
      data: {
        name: '',
        logo: '',
        url: '',
        tax_number: '',
        VAT_rate: '',
        seal_name: '',
        seal_url: '',
        phone_number: '',
        email: '',
        unified_number: '',
        ID_approved_resident: '',
        national_address: '',
        city: '',
        neighborhood: '',
        street: '',
        building_number: '',
        unit_number: '',
        postal_code: '',
        extra_number: '',
        resident_name: '',
        evaluation_branch: '',
        membership_category: '',
        resident_adjective: '',
        signature: null,
        license_number: '',
        license_date: null,
        user_id: 0,
        Commercial_Registration_number: '',
        Commercial_Registration_date: '',
        Commercial_Registration_expiry_date: '',
        Tax_Number: '',
      },
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      this.fetchItem()
    },
    mounted () {
      this.permissions = this.can('ملف المنشاة')
    },
    methods: {
      onNewFileSelected (event) {
        this.data.signature = event
      },
      onNewFileSelected2 (event) {
        this.data.seal_url = event
      },
      onNewFileSelected3 (event) {
        this.data.logo = event
      },
      async updateContent () {
        const formData = new FormData()
        /**
         * ? converting the json object to a form-data format
         */
        // function buildFormData (formData, data, parentKey) {
        //   if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        //     Object.keys(data).forEach(key => {
        //       buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
        //     })
        //   } else {
        //     const value = data == null ? '' : data

        //     formData.append(parentKey, value)
        //   }
        // }
        // buildFormData(formData, this.data)
        for (const key in this.data) {
          if (key === 'seal_url') {
            if (this.data[key] && !this.data[key].startsWith('public')) {
              formData.append(key, this.data[key])
            }
          } else {
            formData.append(key, this.data[key])
          }
          // if (Array.isArray(this.data[key])) {
          //   formData.append(key, JSON.stringify(this.data[key]))
          // } else {
          // }
        }
        console.log('formData', formData)
        const item = await SettingService.updateFacility(formData, this.data.id)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchItem () {
        this.dataLoading = true
        const data = await SettingService.getFacility()
        this.data = data.data
        if (data.data.license_date) {
          data.data.license_date = new Date(data.data.license_date).toLocaleDateString('en-CA')
        }
        this.dataLoading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
.border{
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  margin-bottom: 20px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details{
  display: none !important;
}
.image-card{
  min-height: 255px !important;
}
.image-card .v-responsive__content{
  margin-right: unset !important;
  width: 100% !important;
  height: 100% !important;
}
.image-card .theme--light.v-label{
  color: rgba(0, 0, 0, 0.3);;
}
.image-card .head-card{
  color: #37A8FF;
  padding-bottom: 20px;
}
.Card-Title{
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  color: #000;
  display: block;
  transform: translate(50%, 10%);
  direction: ltr;
}
.w-75{
  max-width: 90px !important;
  max-height: 90px;
}
.w-300{
  width: 300px;
  margin: auto !important;
}
.w-300 .v-input__slot{
  background-color: #f5f5f5 !important;
}
</style>
