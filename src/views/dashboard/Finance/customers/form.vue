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
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.name"
                  label="الاسم"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.email"
                  label="البريد الاليكتروني"
                  type="email"
                  outlined
                  required
                />
              </v-col>
              <v-col
                v-if="!this.$route.params.id"
                cols="12"
              >
                <v-text-field
                  v-model="data.password"
                  label="كلمة السر"
                  outlined
                  required
                  type="password"
                />
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
      absolute
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
      absolute
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
        cs_care: '',
        cs_type: '',
        tr_form: '',
        cs_company: '',
        cs_bank: '',
        cs_vat_num: '',
        cs_price_land: '',
        cs_price_villa: '',
        cs_img_num: '',
        time_in_pic: '',
        tr_name: '',
        cs_footer: '',
        color_a: '',
        color_b: '',
        color_c: '',
        color_d: '',
        color_e: '',
        color_f: '',
        compare_on_page: '',
        compare_on_map: '',
        cs_sin_height: '',
        cs_signature_appraiser_case: '',
        cs_signature_appraiser: '',
        cs_signature_appraiser_title: '',
        cs_signature_coordinator_case: '',
        cs_signature_coordinator: '',
        cs_signature_coordinator_title: '',
        cs_signature_supervisor_case: '',
        cs_signature_supervisor: '',
        cs_signature_supervisor_title: '',
        cs_signature_manager_case: '',
        cs_signature_manager: '',
        cs_signature_manager_title: '',
        cs_signature_seal_case: '',
        cs_signature_seal: '',
        cs_signature_seal_title: '',
        cs_logo: '',
        cs_logo_status: '',
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
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          name: this.data.name,
          email: this.data.email,
          password: this.data.password,
        }
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
        console.log(user)
        this.data = user.data
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
