<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.pendingAssets') }}
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
            <template
              v-slot:activator="{ on, attrs }"
            >
              <v-btn
                small
                fab
                outlined
                class="mx-2"
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="acceptTransfer(item)"
              >
                <v-icon>
                  fa-check
                </v-icon>
              </v-btn>
            </template>
            {{ $t('actions.accept') }}
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                fab
                outlined
                class="mx-1 my-1"
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="moreDetailsD(item)"
              >
                <v-icon>
                  fa-eye
                </v-icon>
              </v-btn>
            </template>
            {{ $t('actions.moreDetails') }}
          </v-tooltip>
        </template>

        <template
          v-slot:no-data
          loading
        >
          <p>{{ $t('actions.noData') }}</p>
        </template>
      </v-data-table>
      <v-dialog
        v-model="moreDetails"
        max-width="1200"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assets.moreDetails') + assetsDetails.assetName"
            color="info"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        {{ $t('assets.branchName') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.floorName') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.roomName') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.transActionDesc') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.actionUserDate') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ assetsDetails.branchName }}</td>
                      <td>{{ assetsDetails.floorName }}</td>
                      <td>{{ assetsDetails.roomName }}</td>
                      <td>{{ assetsDetails.transActionDesc }}</td>
                      <td>{{ assetsDetails.actionUserDate }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                outlined
                @click="moreDetails = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="acceptTransferDailog"
        max-width="500"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assets.confirmAccept') + assetsDetails.assetName"
            color="green"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              {{ $t('assets.areYouSure') }}
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="green"
                outlined
                :loading="loading"
                :disabled="disabled"
                @click="acceptTransfers(assetsDetails)"
              >
                {{ $t('actions.accept') }}
              </v-btn>
              <v-btn
                color="error"
                outlined
                @click="acceptTransferDailog = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>
      </v-dialog>
    </v-card>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      absolute
      bottom
      right
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      absolute
      bottom
      right
      :timeout="timeout"
    >
      {{ errorSnackbar }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import moment from 'moment'
  const AssetsService = ServiceFactory.get('Assets')
  export default {
    name: 'PendingAssets',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      assets: [],
      Roles: [],
      moreDetails: false,
      acceptTransferDailog: false,
      assetsDetails: {},
      timeout: 3000,
      successSnackbar: false,
      errorSnackbar: false,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'assetId',
        },
        { text: vm.$t('assets.assetName'), sortable: false, value: 'assetName' },
        { text: vm.$t('assets.assetBrandName'), sortable: false, value: 'brandName' },
        { text: vm.$t('assets.assetCategoryName'), sortable: false, value: 'categoryName' },
        { text: vm.$t('assets.assetModelName'), sortable: false, value: 'modelName' },
        { text: vm.$t('assets.assetTypeName'), sortable: false, value: 'typeName' },
        { text: vm.$t('assets.assetSerialNumber'), sortable: false, value: 'serialNumber' },
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
      acceptTransfer (item) {
        this.acceptTransferDailog = true
        this.assetsDetails = item
      },
      moreDetailsD (item) {
        this.moreDetails = true
        item.actionUserDate = moment(item.actionUserDate).format('YYYY-MM-DD hh:mm a')
        this.assetsDetails = item
        console.log('assetsDetails', this.assetsDetails)
      },
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const assets = await AssetsService.getPendingItems(itemsPerPage, page, pageNumber)
        console.log('Assets', assets)
        this.assets = assets.list
        this.total = assets.count
        // this.numberOfPages = companies.data.pageCount
        this.dataLoading = false
      },
      async acceptTransfers (item) {
        this.loading = true
        this.disabled = true
        const apperove = await AssetsService.acceptTransfer(item.assetId)
        if (apperove.success === true) {
          this.acceptTransferDailog = false
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.go('/Pending-Assets')
          }, 1000)
        } else {
          this.errorMessage('something Error')
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
