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
                        <th class="text-center">
                          اسم المنصب
                        </th>
                        <th class="text-center">
                          قراءة
                        </th>
                        <th class="text-center">
                          اضافة
                        </th>
                        <th class="text-center">
                          تحديث
                        </th>
                        <th class="text-center">
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
  const UserSettingService = ServiceFactory.get('UserSetting')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        id: 0,
        role_name: '',
      },
      allPermissions: [],
      currentPermissions: [],
      permissions: [],
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
        const formData = this.allPermissions
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
        const item = await UserSettingService.updatePermissions(id, data)
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
        this.dataLoading = false
        this.allPermissions = this.currentPermissions
        console.log(this.currentPermissions)
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
