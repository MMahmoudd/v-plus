<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        العملاء
        <v-spacer />
        <v-spacer />
        <router-link
          v-if="permissions.add"
          :to="{ path: '/customerForm'}"
          color="blue"
        >
          <v-btn
            class="mx-2"
            color="blue"
          >
            اضافة عميل +
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
          'items-per-page-options': [5, 10, 20, 40, 50],
        }"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        class="custom_table_class mt-8"
        @fetchAllItems="fetchAllItems"
      >
        <template v-slot:[`item.color_e`]="{ item }">
          <p class="color_primary">
            {{ item.color_e }}
          </p>
        </template>
        <template
          v-if="permissions.update || permissions.read || permissions.remove"
          v-slot:[`item.actions`]="{ item }"
        >
          <div class="text-center">
            <v-menu offset-y>
              <template
                v-slot:activator="{ on, attrs }"
              >
                <v-icon
                  medium
                  class="mr-2"
                  v-bind="attrs"
                  color="primary"
                  v-on="on"
                >
                  mdi-dots-vertical
                </v-icon>
              </template>
              <v-list>
                <v-list-item
                  v-if="permissions.update || permissions.read"
                  :to="'/customerForm/' + item.id"
                >
                  <v-icon class="ml-2">
                    mdi-pencil
                  </v-icon>
                  تعديل
                </v-list-item>
                <v-list-item
                  v-if="permissions.remove"
                  color="primary"
                  @click="confirmDeleteUser(item)"
                >
                  <v-icon
                    color="danger"
                    class="ml-2"
                  >
                    mdi-trash-can-outline
                  </v-icon>
                  <span class="color_danger"> حذف </span>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
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
            هل انت متأكد من حذف {{ userDetails.cs_name }} ؟
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
  const CustomersService = ServiceFactory.get('Customers')

  export default {
    data: () => ({
      permissions: {},
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
        {
          text: 'أسم العميل',
          align: 'start',
          sortable: false,
          value: 'cs_name',
        },
        { text: 'نوع العميل', value: 'cs_type' },
        { text: 'الجوال/الهاتف', value: 'cs_phone' },
        { text: 'البريد الالكتروني', value: 'cs_email' },
        { text: 'الربحية', value: 'color_e', class: 'color_primary' },
        { text: 'الاجراءات', value: 'actions', sortable: false },
      ],
    }),

    computed: {},
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },
    mounted () {
      this.permissions = this.can('العملاء')
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
        const items = await CustomersService.getAllItems(
          itemsPerPage,
          page,
          pageNumber
        )
        console.log('Users', items)
        items.data.data.map((item) => {
          item.created_at = moment(item.created_at).format('YYYY-MM-DD hh:mm a')
        })
        this.items = items.data.data
        this.total = items.total
        this.dataLoading = false
      },
      async deleteUser (userDetails) {
        this.loading = true
        this.disabled = true
        const deleteUsers = await CustomersService.deleteUser(userDetails.id)
        if (deleteUsers.success === true) {
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
