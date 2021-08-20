<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.CompaniesArea') }}
        <v-spacer />
        <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
          hide-details
        /> -->
        <v-spacer />
        <router-link
          :to="{ path: '/areaForm'}"
          color="primary"
        >
          <v-btn
            outlined
            class="mx-2"
            color="primary"
          >
            {{ $t('actions.Add') }}
          </v-btn>
        </router-link>
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="area"
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
                :to="'/areaForm/' + item.areaId"
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
            {{ $t('actions.edit') }}
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
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const CompanyAreaService = ServiceFactory.get('CompanyArea')
  export default {
    name: 'CompanyBranches',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      area: [],
      loading: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'areaId',
        },
        { text: vm.$t('area.areaName'), sortable: false, value: 'areaName' },
        { text: vm.$t('area.companyName'), sortable: false, value: 'companyName' },
        { text: vm.$t('actions.actions'), value: 'actions', sortable: false },
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
        const area = await CompanyAreaService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('area', area)
        this.area = area.list
        this.total = area.count
        // this.numberOfPages = companies.data.pageCount
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
