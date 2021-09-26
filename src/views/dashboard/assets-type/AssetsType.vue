<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.assetsType') }}
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
          :to="{ path: '/assetsTypeForm'}"
          color="primary"
        >
          <v-btn
            v-if="role === 'AssetType.AddOrUpdate'"
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
        :items="types"
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
              v-if="role === 'AssetType.GetById'"
              v-slot:activator="{ on, attrs }"
            >
              <router-link
                :to="'/assetsTypeForm/' + item.assetTypeId"
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
  const AssetsTypeService = ServiceFactory.get('AssetsType')
  export default {
    name: 'Companies',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      types: [],
      Roles: [],
      loading: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'assetTypeId',
        },
        { text: vm.$t('assetsType.assetTypeDesc'), sortable: false, value: 'assetTypeDesc' },
        { text: vm.$t('assets.assetCategoryName'), sortable: false, value: 'assetCategoryName' },
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
        const types = await AssetsTypeService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('types', types)
        this.types = types.list
        this.total = types.count
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
