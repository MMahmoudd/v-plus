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
          :disabled="!permissions.update"
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
                  id="name"
                  v-model="data.name"
                  :error="errors.name"
                  :error-messages="errors.name"
                  label="الاسم"
                  outlined
                  required
                  @input="()=>{touched.name = true}"
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
                <v-autocomplete
                  v-model="data.role_id"
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
                  id="membership_no"
                  v-model="data.membership_no"
                  label="رقم العضوية"
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
                  :src="'https://taqeeem.millennium.sa/' + data.image"
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
                  id="email"
                  v-model="data.email"
                  label="البريد الاليكتروني"
                  :error="errors.email"
                  :error-messages="errors.email"
                  type="email"
                  outlined
                  required
                  @input="()=>{touched.email = true}"
                />
              </v-col>
              <v-col
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
              <v-col
                cols="12"
                sm="5"
                md="6"
              >
                <v-autocomplete
                  v-model="data.signature_type"
                  :items="signature_type"
                  item-text="type"
                  item-value="id"
                  label="نوع التوقيع"
                  outlined
                  required
                />
              </v-col>
              <v-col
                v-if="data.signature_type === 1"
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
                  label="ارفاق التوقيع"
                  @change="signature_type_image"
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
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <h3>مرحلة الجودة</h3>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="data.commission_quality_stage_amount"
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
                    v-model="data.commission_quality_stage_rate"
                    label="النسبة"
                    outlined
                    required
                  />
                </v-col>
              </v-row>
            </v-row>
            <div class="text-center mt-10">
              <v-btn
                to="/Users"
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
                {{ this.$route.params.id ? 'حفظ' : 'اضافة' }}
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
      :timeout="5000"
    >
      <template>
        <p
          v-for="(msg,index) in errorMessage"
          :key="index"
        >
          {{ msg }}
        </p>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import { format } from 'date-fns'

  const UsersService = ServiceFactory.get('Users')
  const UserSettingService = ServiceFactory.get('UserSetting')
  export default {
    name: 'Companies',
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
        commission_quality_stage_rate: null,
        commission_quality_stage_amount: null,
        signature_type: '',
        signature: null,
      },
      profile_image: null,
      bank_statement_image: null,
      roles: [],
      signature_type: [
        { type: 'توقيع', id: 1 },
        { type: 'QR كود', id: 0 },
      ],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
      errors: {},
      touched: {},
    }),
    watch: {
      data: {
        handler (n) {
          if (this.errors.name && n.name.trim() !== '') {
            delete this.errors.name
          } else if (n.name.trim() === '' && this.touched.name === true) {
            this.errors.name = 'هذا الحقل مطلوب'
          }

          if (this.errors.email && n.email.trim() !== '') {
            delete this.errors.email
          } else if (n.email.trim() === '' && this.touched.email === true) {
            this.errors.email = 'هذا الحقل مطلوب'
          }
        },
        deep: true,
      },
    },
    created () {
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
      console.log('this.$route', this.$route)
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
      signature_type_image (event) {
        this.data.signature = event
      },
      async submitForm () {
        /**
         * ? simple validtion
         */
        this.errors = {}
        if (!this.data.name) {
          this.errors.name = 'هذا الحقل مطلوب'
        }
        if (!this.data.email) {
          this.errors.email = 'هذا الحقل مطلوب'
        }
        if (Object.keys(this.errors).length !== 0) {
          this.$el.querySelector(`#${Object.keys(this.errors)[0]}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
          return
        }
        this.loading = true
        this.disabled = true

        const formData = new FormData()

        for (const key in this.data) {
          formData.append(key, this.data[key])
        }
        // TODO : Ask the backend to delete this column from the datebase as it's not required anymore for the project.
        formData.append('start_membership', format(new Date(), 'yyyy-MM-dd'))

        if (this.$route.params.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        console.log('data', data)
        const item = await UsersService.addUser(data)
        if (item.success === true) {
          this.successMessage = 'تمت الاضافة بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Users')
          }, 1500)
        } else {
          // for (const key in item.errors) {
          //   if (item.errors[key][0].match('The (\w+) field is required.')) {

          //   }
          // }
          this.errorMessage = Object.values(item.errors).flat(2)
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
          this.errorMessage = Object.values(item.errors).flat(2)
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
