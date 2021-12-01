<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        اعدادات المستخدمين
        <v-spacer />
        <v-spacer />
        <router-link
          :to="{ path: '/userSettingForm'}"
          color="blue"
        >
          <v-btn
            class="mx-2"
            color="blue"
          >
            انشاء منصب  جديد +
          </v-btn>
        </router-link>
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="items"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        @fetchAllItems="fetchAllItems"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <router-link
                :to="'/userSettingForm/' + item.id"
              >
                <v-btn
                  small
                  fab
                  outlined
                  class="mx-2"
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </router-link>
            </template>
            تعديل
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                fab
                outlined
                class="mx-2"
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="confirmDeleteUser(item)"
              >
                <v-icon>
                  fa-trash-alt
                </v-icon>
              </v-btn>
            </template>
            حذف
          </v-tooltip>
        </template>

        <template
          v-slot:no-data
          loading
        >
          <p>{{ $t('actions.noData') }}</p>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="deleteDailog"
      width="500"
    >
      <v-card
        class="text-center"
      >
        <base-material-card
          title="تأكيد حذف"
          color="error"
          class="pt-12"
        >
          <v-card-text class="mt-2">
            هل انت متأكد من حذف {{ userDetails.name }} ؟
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green"
              outlined
              :loading="loading"
              :disabled="disabled"
              @click="deleteRole(userDetails)"
            >
              حذف
            </v-btn>
            <v-btn
              color="error"
              outlined
              @click="deleteDailog = false"
            >
              اغلاق
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-card>
    </v-dialog>
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
  // import moment from 'moment'
  const UserSettingService = ServiceFactory.get('UserSetting')
  export default {
    name: 'UserSetting',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      items: [],
      loading: false,
      deleteDailog: false,
      userDetails: {},
      editedIndex: -1,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
      headers: [
        { text: 'معرف', sortable: true, value: 'id' },
        { text: 'اسم المنصب', sortable: true, value: 'role_name' },
        { text: 'الحالة', sortable: true, value: 'status' },
        { text: 'الاجراءات', value: 'actions', sortable: false },
      ],
    }),
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },
    methods: {
      confirmDeleteUser (userData) {
        this.userDetails = userData
        this.deleteDailog = true
      },
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await UserSettingService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('roles', items)
        items.data.map(item => {
          if (item.status === '1') {
            item.status = 'مفعل'
          } else {
            item.status = 'غير مفعل'
          }
        })
        this.items = items.data
        this.total = items.total
        this.dataLoading = false
      },
      async deleteRole (roleDetails) {
        this.loading = true
        this.disabled = true
        const deleteRole = await UserSettingService.deleteRole(roleDetails.id)
        if (deleteRole.success === true) {
          this.deleteDailog = false
          this.successMessage = 'تم الحذف بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.editedIndex = this.items.indexOf(roleDetails)
            this.items.splice(this.editedIndex, 1)
          }, 500)
        } else {
          this.errorMessage('يوجد مشكلة')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
