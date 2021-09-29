<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.reports') }}
        <v-spacer />
        <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
          hide-details
        /> -->
        <v-spacer />
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="reports"
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
                :to="'/reportForm/' + item.procedure"
              >
                <v-btn
                  small
                  fab
                  outlined
                  class="mx-1 my-1"
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    fa-eye
                  </v-icon>
                </v-btn>
              </router-link>
            </template>
            {{ $t('actions.viewReport') }}
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
  const ReportsService = ServiceFactory.get('Reports')
  export default {
    name: 'Reports',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      reports: [],
      disabled: false,
      editedIndex: -1,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: vm.$t('assets.assetName'), sortable: false, value: 'name' },
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
        const reports = await ReportsService.GetProcedures()
        console.log('reports', reports)
        this.reports = reports.list
        this.total = reports.count
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
