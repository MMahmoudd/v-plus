<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.assetsStatus') }}
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
          v-for="role in Roles"
          :key="role"
          :to="{ path: '/assetsStatusForm'}"
          color="primary"
        >
          <v-btn
            v-if="role === 'AssetStatus.AddOrUpdate'"
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
        :items="status"
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
            v-for="role in Roles"
            :key="role"
            bottom
          >
            <template
              v-if="role === 'AssetStatus.GetById'"
              v-slot:activator="{ on, attrs }"
            >
              <router-link
                :to="'/assetsStatusForm/' + item.assetStatusId"
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
  const AssetsStatusService = ServiceFactory.get('AssetsStatus')
  export default {
    name: 'Status',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      status: [],
      Roles: [],
      loading: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'assetStatusId',
        },
        { text: vm.$t('assetsStatus.assetStatusDesc'), sortable: false, value: 'assetStatusDesc' },
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
    created () {
      this.checkLinksRole()
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const status = await AssetsStatusService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('status', status)
        this.status = status.list
        this.total = status.count
        // this.numberOfPages = companies.data.pageCount
        this.dataLoading = false
      },
      checkLinksRole () {
        const userDataPermission = localStorage.getItem('userDataPermission')
        const permissions = userDataPermission.split(',')
        this.Roles = permissions
        console.log('this.Roles', this.Roles)
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
