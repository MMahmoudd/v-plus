<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        تعديل حسابي
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
              <!-- <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-autocomplete
                  v-model="data.role_id"
                  :items="roles"
                  item-text="role_name"
                  item-value="id"
                  label="المنصب"
                  outlined
                  required
                />
              </v-col> -->
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
                  id="membership_no"
                  v-model="data.membership_no"
                  label="رقم العضوية"
                  :error="errors.membership_no"
                  :error-messages="errors.membership_no"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-menu
                  v-model="end_membership"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-x
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      id="end_membership"
                      v-model="data.end_membership"
                      label="نهاية العضوية"
                      placeholder="YYYY-MM-DD Format"
                      hint="YYYY-MM-DD Format"
                      :error="errors.end_membership"
                      :error-messages="errors.end_membership"
                      v-bind="attrs"
                      outlined
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="data.end_membership"
                    @input="end_membership = false"
                  />
                </v-menu>
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
                sm="3"
                md="2"
              >
                <img
                  width="50"
                  :src="data.image"
                  alt="Image"
                >
              </v-col>
              <v-col
                cols="12"
                sm="5"
                md="6"
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
              <!-- <v-col
                cols="12"
                sm="6"
                md="8"
              >
                <v-autocomplete
                  v-model="data.other_user_id"
                  :items="usersList"
                  item-text="name"
                  item-value="id"
                  label="المستخدم البديل في التقرير"
                  outlined
                  clearable
                />
              </v-col> -->
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
                sm="3"
                md="2"
              >
                <img
                  width="50"
                  :src="'https://taqeeem.millennium.sa/' + data.bank_statement_image"
                  alt="Image"
                >
              </v-col>
              <v-col
                cols="12"
                sm="5"
                md="6"
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
            <!-- <h3
              class="mx-7 my-5 blue1"
            >
              العمولات
            </h3>
            <v-row class="mx-md-16 px-md-16">
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <h3>مرحلة الادخال</h3>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_input_stage_amount"
                    label="مبلغ"
                    outlined
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_input_stage_rate"
                    label="النسبة"
                    outlined
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <h3>مرحلة التقييم</h3>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_evaluation_stage_amount"
                    label="مبلغ"
                    outlined
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_evaluation_stage_rate"
                    label="النسبة"
                    outlined
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <h3>مرحلة المراجعة</h3>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_revision_stage_amount"
                    label="المبلغ"
                    outlined
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_revision_stage_rate"
                    label="المبلغ"
                    outlined
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <h3>مرحلة الاعتماد</h3>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_accreditation_stage_amount"
                    label="المبلغ"
                    outlined
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_accreditation_stage_rate"
                    label="النسبة"
                    outlined
                    required
                  />
                </v-col>
              </v-row>
            </v-row> -->
            <div class="text-center mt-10">
              <v-btn
                to="/"
                type="submit"
                class="mx-2"
                color="indigo"
              >
                رجوع
              </v-btn>
              <v-btn
                type="submit"
                class="mx-2"
                color="indigo"
                :loading="loading"
                :disabled="disabled || !permissions.update"
              >
                {{ 'حفظ' }}
              </v-btn>
            </div>
          </v-container>
        </v-form>
      </template>
    </v-card>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      bottom
      left
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
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
  const ProfileService = ServiceFactory.get('Profile')
  const UserSettingService = ServiceFactory.get('UserSetting')

  export default {
    name: 'Profile',
    data: (vm) => ({
      permissions: {},
      dataLoading: false,
      valid: false,
      end_membership: false,
      usersList: [],
      data: {
        name: '',
        email: '',
        password: '',
        role_id: '',
        image: null,
        phone: '',
        username: '',
        id_number: '',
        beneficiary_name: '',
        bank_number: '',
        bank_IBAN: '',
        bank_statement_image: null,
        membership_no: '',
        end_membership: '',
        other_user_id: null,
        commission_accreditation_stage_amount: null,
        commission_accreditation_stage_rate: null,
        commission_evaluation_stage_rate: null,
        commission_evaluation_stage_amount: null,
        commission_input_stage_amount: null,
        commission_input_stage_rate: null,
        commission_revision_stage_rate: null,
        commission_revision_stage_amount: null,
      },
      profile_image: null,
      bank_statement_image: null,
      roles: [],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
      errors: {},
    }),
    created () {
      this.fetchOneItem()
      this.fetchRoles()
      this.fetchAllItems()
    },
    mounted () {
      this.permissions = this.can('المستخدمين')
    },
    methods: {
      onNewFileSelected (event) {
        this.profile_image = event
      },
      onBank_statement_image (event) {
        this.bank_statement_image = event
      },
      async submitForm () {
        /**
         * ? simple validtion
         */
        this.errors = {}
        if (!this.data.membership_no) {
          this.errors.membership_no = 'هذا الحقل مطلوب'
        }
        if (!this.data.end_membership) {
          this.errors.end_membership = 'هذا الحقل مطلوب'
        }
        if (Object.keys(this.errors).length !== 0) {
          this.$el.querySelector(`#${Object.keys(this.errors)[0]}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
          return
        }
        this.loading = true
        this.disabled = true
        const formData = new FormData()
        this.data.name && formData.append('name', this.data.name)
        this.data.email && formData.append('email', this.data.email)
        this.data.password && formData.append('password', this.data.password)
        this.data.role_id && formData.append('role_id', this.data.role_id)
        this.profile_image && formData.append('image', this.profile_image)
        this.data.phone && formData.append('phone', this.data.phone)
        this.data.username && formData.append('username', this.data.username)
        this.data.id_number && formData.append('id_number', this.data.id_number)
        this.data.beneficiary_name && formData.append('beneficiary_name', this.data.beneficiary_name)
        this.data.bank_number && formData.append('bank_number', this.data.bank_number)
        this.data.bank_IBAN && formData.append('bank_IBAN', this.data.bank_IBAN)
        this.bank_statement_image && formData.append('bank_statement_image', this.bank_statement_image)
        this.data.other_user_id && formData.append('other_user_id', this.data.other_user_id)
        formData.append('membership_no', this.data.membership_no)
        formData.append('end_membership', this.data.end_membership)
        this.data.commission_accreditation_stage_amount && formData.append('commission_accreditation_stage_amount', this.data.commission_accreditation_stage_amount)
        this.data.commission_accreditation_stage_rate && formData.append('commission_accreditation_stage_rate', this.data.commission_accreditation_stage_rate)
        this.data.commission_evaluation_stage_rate && formData.append('commission_evaluation_stage_rate', this.data.commission_evaluation_stage_rate)
        this.data.commission_evaluation_stage_amount && formData.append('commission_evaluation_stage_amount', this.data.commission_evaluation_stage_amount)
        this.data.commission_input_stage_amount && formData.append('commission_input_stage_amount', this.data.commission_input_stage_amount)
        this.data.commission_input_stage_rate && formData.append('commission_input_stage_rate', this.data.commission_input_stage_rate)
        this.data.commission_revision_stage_rate && formData.append('commission_revision_stage_rate', this.data.commission_revision_stage_rate)
        this.data.commission_revision_stage_amount && formData.append('commission_revision_stage_amount', this.data.commission_revision_stage_amount)
        // if (this.$route.params.id) {
        this.updateContent(formData)
        // } else {
        // this.newItem(formData)
        // }
      },
      async updateContent (data) {
        const item = await ProfileService.updateUser(data)
        if (item.success === true) {
          window.localStorage.setItem('userData', JSON.stringify(item.data))
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            document.location.href = '/' + window.domain
          }, 300)
        } else {
          this.errorMessage = 'يوجد مشكلة في التعديل'
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem () {
        this.dataLoading = true
        const { data: { data } } = await ProfileService.fetchOneItem()
        this.data = data
        this.dataLoading = false
      },
      async fetchAllItems () {
        const { data: { data: users } } = await UsersService.getAllItems()
        this.usersList = users.map(({ id, name }) => ({ id, name }))
      },
      async fetchRoles () {
        this.dataLoading = true
        const roles = await UserSettingService.getAllItems()
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
