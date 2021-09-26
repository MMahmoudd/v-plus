<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.assetsCategory') }}
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
          :to="{ path: '/assetsCategoryForm'}"
          color="primary"
        >
          <v-btn
            v-if="role === 'AssetCategory.AddOrUpdate'"
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
        :items="category"
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
              v-if="role === 'AssetCategory.GetById'"
              v-slot:activator="{ on, attrs }"
            >
              <router-link
                :to="'/assetsCategoryForm/' + item.assetCategoryId"
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
  const AssetsCategoryService = ServiceFactory.get('AssetsCategory')
  export default {
    name: 'Category',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      category: [],
      Roles: [],
      loading: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'assetCategoryId',
        },
        { text: vm.$t('assetCategory.assetCategoryName'), sortable: false, value: 'assetCategoryName' },
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
        const category = await AssetsCategoryService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('category', category)
        this.category = category.list
        this.total = category.count
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
