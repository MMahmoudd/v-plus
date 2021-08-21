<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('assets.assets') }}
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
          :to="{ path: '/assetsForm'}"
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
        :items="assets"
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
                :to="'/assetsForm/' + item.assetId"
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
  const AssetsService = ServiceFactory.get('Assets')
  export default {
    name: 'Companies',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      assets: [],
      loading: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'assetId',
        },
        { text: vm.$t('assets.assetName'), sortable: false, value: 'assetName' },
        { text: vm.$t('assets.assetDescription'), sortable: false, value: 'assetDescription' },
        { text: vm.$t('assets.assetBrandName'), sortable: false, value: 'assetBrandName' },
        { text: vm.$t('assets.assetCategoryName'), sortable: false, value: 'assetCategoryName' },
        { text: vm.$t('assets.assetModelName'), sortable: false, value: 'assetModelName' },
        { text: vm.$t('assets.assetTypeName'), sortable: false, value: 'assetTypeName' },
        { text: vm.$t('assets.assetSerialNumber'), sortable: false, value: 'assetSerialNumber' },
        { text: vm.$t('assets.branchName'), sortable: false, value: 'branchName' },
        { text: vm.$t('assets.floorName'), sortable: false, value: 'floorName' },
        { text: vm.$t('assets.roomName'), sortable: false, value: 'roomName' },
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
        const assets = await AssetsService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('assets', assets)
        this.assets = assets.list
        this.total = assets.count
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
