<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.CompaniesGroup') }}
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
          :to="{ path: '/groupForm'}"
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
        :items="groups"
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
                :to="'/groupForm/' + item.groupId"
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
  const companyGroupService = ServiceFactory.get('companyGroup')
  export default {
    name: 'CompanyBranches',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      groups: [],
      loading: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'groupId',
        },
        { text: vm.$t('groups.groupName'), sortable: false, value: 'groupName' },
        { text: vm.$t('groups.groupLogo'), sortable: false, value: 'groupLogo' },
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
        const groups = await companyGroupService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('groups', groups)
        this.groups = groups.list
        this.total = groups.count
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
