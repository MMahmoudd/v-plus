<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        النماذج
        <v-spacer />
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
        <template v-slot:[`item.status`]="{ item }">
          <v-radio-group
            v-model="item.status"
            row
          >
            <v-radio
              label="مفعل"
              color="blue"
              value="1"
              @click="changeStatus(item)"
            />
            <v-radio
              label="غير مفعل"
              color="red"
              value="2"
              @click="changeStatus(item)"
            />
          </v-radio-group>
        </template>

        <template
          v-slot:no-data
          loading
        >
          <p>{{ $t('actions.noData') }}</p>
        </template>
      </v-data-table>
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
  import moment from 'moment'
  const SamplesService = ServiceFactory.get('Samples')
  export default {
    name: 'Sample',
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
        { text: 'إسم النموذج', sortable: true, value: 'name' },
        { text: 'تاريخ الإنشاء', sortable: true, value: 'created_at' },
        { text: 'الحالة', sortable: true, value: 'status' },
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
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await SamplesService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('SamplesService', items.data)
        items.data.map(item => {
          item.created_at = moment(item.created_at).format('YYYY-MM-DD hh:mm a')
        })
        this.items = items.data
        this.total = items.total
        this.dataLoading = false
      },
      async changeStatus (item) {
        this.dataLoading = true
        const changeStatus = await SamplesService.updateOneItem(item.id, item)
        if (changeStatus.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
        } else {
          this.errorMessage('يوجد مشكلة في التعديل')
          this.errorSnackbar = true
        }
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
