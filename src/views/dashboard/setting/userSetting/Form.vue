<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? 'تعديل' : 'اضافة' }}
      </v-card-title>
      <template>
        <v-form
          v-model="valid"
          :disabled="!permissions.update"
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.role_name"
                  label="الاسم"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>
                          اسم المنصب
                        </th>
                        <th>
                          قراءة
                        </th>
                        <th>
                          اضافة
                        </th>
                        <th>
                          تحديث
                        </th>
                        <th>
                          مسح
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(value, i) in allPermissions"
                        :key="i"
                      >
                        <td>{{ value.model_name }}</td>
                        <td>
                          <v-checkbox
                            v-model="value.read"
                          />
                        </td>
                        <td>
                          <v-checkbox
                            v-model="value.add"
                          />
                        </td>
                        <td>
                          <v-checkbox
                            v-model="value.update"
                          />
                        </td>
                        <td>
                          <v-checkbox
                            v-model="value.delete"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="loading"
              :disabled="disabled || !permissions.update"
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
  const UserSettingService = ServiceFactory.get('UserSetting')
  export default {
    name: 'Companies',
    data: (vm) => ({
      permissions: {},
      dataLoading: false,
      valid: false,
      data: {
        id: 0,
        role_name: '',
      },
      allPermissions: [],
      currentPermissions: [],
      Permissions: [],
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
      this.getAllPermission()
    },
    mounted () {
      this.permissions = this.can('المناصب')
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          role_name: this.data.role_name,
          Permissions: this.allPermissions,
        }
        if (this.$route.params.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await UserSettingService.addRoles(data)
        if (item.success === true) {
          this.successMessage = 'تمت الاضافة بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/users-setting')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (id, data) {
        console.log('reS: ', data)
        this.disabled = false
        this.loading = false
        const item = await UserSettingService.updatePermissions(id, data)
        console.log('reS: ', item)
        if (item.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/users-setting')
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
        const item = await UserSettingService.fetchOneItem(id)
        this.data = item.data
        this.currentPermissions = item.data.permission
        this.allPermissions = this.currentPermissions
        console.log(this.currentPermissions)
        this.dataLoading = false
      },
      async getAllPermission () {
        this.dataLoading = true
        const Permission = await UserSettingService.getAllPermission()
        this.allPermissions = Permission.data
        setTimeout(() => {
          this.allPermissions = this.allPermissions.map((allitem, i) => {
            // eslint-disable-next-line camelcase
            const foundIt = this.currentPermissions.find(({ model_name }) => model_name === allitem.model_name)
            if (foundIt) {
              return foundIt
            } else {
              return allitem
            }
          })
          console.log('allPermissions', this.allPermissions)
        }, 1500)
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
