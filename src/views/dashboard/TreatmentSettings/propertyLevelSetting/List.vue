<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        المنسوب
        <v-spacer />
        <v-spacer />
        <router-link
          :to="{ path: '/treatment-settings/propertyLevelSettingForm/'}"
          color="blue"
        >
          <v-btn
            class="mx-2"
            color="blue"
          >
            إضافة منسوب +
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
                :to="'/treatment-settings/propertyLevelSettingForm/' + item.id"
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
          <p>لا يوجد بيانات</p>
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
              @click="deleteUser(userDetails)"
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
  import moment from 'moment'
  const SettingService = ServiceFactory.get('propertyLevelSetting')

  export default {
    name: 'Users',
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
        { text: 'الاسم', sortable: true, value: 'name' },
        { text: 'تاريخ الإنشاء', sortable: true, value: 'created_at' },
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
        const items = await SettingService.getAllItems(itemsPerPage, page, pageNumber)
        items.data.map(item => {
          item.created_at = moment(item.created_at).format('YYYY-MM-DD hh:mm a')
          item.status = item.status === 1 ? 'مفعل' : 'غير مفعل'
        })
        this.items = items.data
        console.log('designSettingForm', items)
        this.total = items.total
        this.dataLoading = false
      },
      async deleteUser (userDetails) {
        this.loading = true
        this.disabled = true
        const deleteUsers = await SettingService.deleteOneItem(userDetails.id)
        if (deleteUsers.success) {
          this.deleteDailog = false
          this.successMessage = 'تم الحذف بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.editedIndex = this.items.indexOf(userDetails)
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
