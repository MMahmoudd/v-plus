<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? 'تعديل المستخدم' : 'اضافة مستخدم' }}
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
              بيانات الدخول
            </h3>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                sm="6"
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
                sm="6"
                md="6"
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
            <v-spacer />
            <hr>
            <h3
              class="mx-7 my-5 blue1"
            >
              بيانات التواصل
            </h3>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                sm="6"
                md="8"
              >
                <v-text-field
                  v-model="data.username"
                  label="الاسم بالكامل"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  v-model="data.user_type"
                  :items="roles"
                  item-text="role_name"
                  item-value="id"
                  label="المنصب"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.phone"
                  label="رقم الهاتف"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.start_membership"
                  label="بدء العضوية"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.end_membership"
                  label="نهاية العضوية"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.id_number"
                  label="رقم الهوية"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
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
                cols="12"
                sm="6"
                md="4"
              >
                <v-file-input
                  show-size
                  chips
                  required
                  outlined
                  prepend-icon="mdi-camera"
                  accept="image/png, image/jpeg, image/bmp"
                  label="الصورة الشخصية"
                  @change="onNewFileSelected"
                />
              </v-col>
            </v-row>
            <v-spacer />
            <hr>
            <h3
              class="mx-7 my-5 blue1"
            >
              البيانات المالية
            </h3>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                sm="6"
                md="8"
              >
                <v-text-field
                  v-model="data.beneficiary_name"
                  label="أسم المستفيد"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.bank_number"
                  label="رقم البنك"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.bank_IBAN"
                  label="بنك IBAN"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-file-input
                  show-size
                  chips
                  required
                  outlined
                  prepend-icon="mdi-camera"
                  accept="image/png, image/jpeg, image/bmp"
                  label="صورة كشف حساب بنكي"
                  @change="onBank_statement_image"
                />
              </v-col>
            </v-row>
            <v-spacer />
            <hr>
            <h3
              class="mx-7 my-5 blue1"
            >
              العمولات
            </h3>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.commission_input_stage"
                  label="مرحلة إدخال العمولة"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.commission_evaluation_stage"
                  label="مرحلة تقييم العمولة"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.commission_revision_stage"
                  label="مرحلة مراجعة العمولة"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="data.commission_accreditation_stage"
                  label="مرحلة اعتماد العمولة"
                  outlined
                  required
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
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const UsersService = ServiceFactory.get('Users')
  const UserSettingService = ServiceFactory.get('UserSetting')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        name: '',
        email: '',
        password: '',
        user_type: '',
        image: null,
        phone: '',
        username: '',
        id_number: '',
        beneficiary_name: '',
        bank_number: '',
        bank_IBAN: '',
        bank_statement_image: null,
        start_membership: '',
        end_membership: '',
        commission_input_stage: '',
        commission_evaluation_stage: '',
        commission_revision_stage: '',
        commission_accreditation_stage: '',
      },
      roles: [],
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
      this.fetchRoles()
    },
    methods: {
      onNewFileSelected (event) {
        this.data.image = event
      },
      onBank_statement_image (event) {
        this.data.bank_statement_image = event
      },
      async submitForm () {
        this.loading = true
        this.disabled = true
        const formData = this.data
        if (this.$route.params.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await UsersService.addUser(data)
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
        const item = await UsersService.updateUser(id, data)
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
        const user = await UsersService.fetchOneItem(id)
        this.data = user.data
        this.dataLoading = false
      },
      async fetchRoles () {
        this.dataLoading = true
        const roles = await UserSettingService.getAllItems()
        console.log('roles', roles.data)
        this.roles = roles.data
        this.dataLoading = false
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
