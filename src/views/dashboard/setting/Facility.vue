<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <template>
      <v-form
        v-model="valid"
        @submit.prevent="submitForm()"
      >
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
                  Millennium
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
                  ختم المنشأة
                </h3>
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
            <v-col
              cols="12"
              md="4"
            >
              <v-card class="image-card py-2 px-3">
                <h3 class="head-card">
                  بيانات الدخول
                </h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-subheader>اسم المستخدم:</v-subheader>
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
                    <v-subheader>كلمة المرور:</v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="data.password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      outlined
                      dense
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
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
                  v-model="data.seal_name"
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
                  v-model="data.seal_name"
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
                  v-model="data.seal_name"
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
                  v-model="data.seal_name"
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
                  v-model="data.ID_approved_resident"
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
                <v-text-field
                  v-model="data.seal_name"
                  outlined
                  class="mt-1"
                  placeholder="تاريخ الترخيص"
                />
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
            :disabled="disabled"
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
      absolute
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
      absolute
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
      dataLoading: false,
      valid: false,
      show1: false,
      data: {
        name: '',
        password: '',
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
        user_id: 0,
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
    methods: {
      async updateContent (data) {
        console.log('update Item', data)
        const item = await SettingService.updateAssets(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets')
          }, 1500)
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
        console.log('assets', data.data)
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
