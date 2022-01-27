<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        تقرير المستخدمين
        <v-spacer />
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
          <v-tooltip
            v-if="permissions.update || permissions.read"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                fab
                outlined
                class="mx-2"
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="viewMore(item)"
              >
                <v-icon>
                  fa-eye
                </v-icon>
              </v-btn>
            </template>
            عرض المزيد
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
      v-model="viewMoreDailog"
      width="1800"
    >
      <v-card
        class="text-center"
      >
        <base-material-card
          title="تفاصيل السنة للمستخدم"
          color="blue"
          class="pt-12"
        >
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    المصاريف
                  </th>
                  <th
                    v-for="(item, i) in userDetails.months"
                    :key="i"
                    class="text-center"
                  >
                    {{ item.month_name }}
                  </th>
                  <th class="text-center">
                    الاجمالي
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    المصاريف الثابتة
                  </td>
                  <td
                    v-for="(item, i) in userDetails.months"
                    :key="i"
                    class="text-center"
                  >
                    {{ item.total }}
                  </td>
                  <td class="text-center">
                    الاجمالي
                  </td>
                </tr>
                <tr>
                  <td class="text-center">
                    المصاريف المتغيرة
                  </td>
                  <td
                    v-for="(item, i) in userDetails.months"
                    :key="i"
                    class="text-center"
                  >
                    {{ item.total_other }}
                  </td>
                  <td class="text-center">
                    الاجمالي
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              text
              @click="viewMoreDailog = false"
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
  const Service = ServiceFactory.get('usersReport')
  export default {
    name: 'UsersReports',
    data: (vm) => ({
      permissions: {},
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      items: [],
      loading: false,
      viewMoreDailog: false,
      userDetails: {},
      editedIndex: -1,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
      headers: [
        { text: '#', sortable: true, value: 'id' },
        { text: 'المستخدم', sortable: true, value: 'name' },
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
    mounted () {
      this.permissions = this.can('المستخدمين')
    },
    methods: {
      viewMore (userData) {
        this.userDetails = userData
        this.viewMoreDailog = true
      },
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await Service.getAllItems(itemsPerPage, page, pageNumber)
        this.items = items.data
        this.total = items.total
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
