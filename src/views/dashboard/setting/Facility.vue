<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ this.$route.params.id ? $t('assets.editAssets') : $t('assets.addAssets') }}
      </v-card-title>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>
    </v-card>
    <template>
      <v-form
        v-model="valid"
        @submit.prevent="submitForm()"
      >
        <!-- <v-container fluid>
          <v-row class="mx-md-8 px-md-8">
            <h3>{{ $t('assets.basicInfo') }}</h3>
            <v-col cols="12">
              <v-row class=" px-2">
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="data.assetName"
                    :label="$t('assets.assetName')"
                    outlined
                    dense
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="data.assetDescription"
                    :label="$t('assets.assetDescription')"
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </v-col>
            <h3>{{ $t('assets.assetsInfo') }}</h3>
            <v-col cols="12">
              <v-row class=" px-2">
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex"
                >
                  <v-select
                    v-model="data.assetCategoryId"
                    :items="LKPCategory"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseCtegory')"
                    outlined
                    dense
                    @input="getLKPType(data.assetCategoryId)"
                  />
                  <span v-if="!this.$route.params.id">
                    <div
                      v-for="role in Roles"
                      :key="role"
                    >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-if="role === 'AssetCategory.AddOrUpdate'"
                            color="green"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            @click="addAssetCategory = true"
                          >
                            <v-icon>
                              fa-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        {{ $t('actions.addCategory') }}
                      </v-tooltip>
                    </div>
                  </span>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex"
                >
                  <v-select
                    v-model="data.assetTypeId"
                    :items="LKPType"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseType')"
                    outlined
                    dense
                    @input="getLKPBrand(data.assetTypeId)"
                  />
                  <span v-if="!this.$route.params.id">
                    <div
                      v-for="role in Roles"
                      :key="role"
                    >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-if="role === 'AssetType.AddOrUpdate'"
                            color="green"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            @click="addAssetType = true"
                          >
                            <v-icon>
                              fa-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        {{ $t('actions.addType') }}
                      </v-tooltip>
                    </div>
                  </span>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex"
                >
                  <v-select
                    v-model="data.assetBrandId"
                    :items="LKPBrand"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseBrand')"
                    outlined
                    dense
                    @input="getLKPModel(data.assetBrandId)"
                  />
                  <span v-if="!this.$route.params.id">
                    <div
                      v-for="role in Roles"
                      :key="role"
                    >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-if="role === 'AssetBrand.AddOrUpdate'"
                            color="green"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            @click="addAssetBrand = true"
                          >
                            <v-icon>
                              fa-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        {{ $t('actions.addBrand') }}
                      </v-tooltip>
                    </div>
                  </span>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex"
                >
                  <v-select
                    v-model="data.assetModelId"
                    :items="LKPModel"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseModel')"
                    outlined
                    dense
                  />
                  <span v-if="!this.$route.params.id">
                    <div
                      v-for="role in Roles"
                      :key="role"
                    >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-if="role === 'AssetModel.AddOrUpdate'"
                            color="green"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            @click="addAssetModel = true"
                          >
                            <v-icon>
                              fa-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        {{ $t('actions.addModel') }}
                      </v-tooltip>
                    </div>
                  </span>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex"
                >
                  <v-select
                    v-model="data.assetStatusId"
                    :items="LKPStatus"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseStatus')"
                    outlined
                    dense
                  />
                </v-col>
                <v-col
                  v-if="this.$route.params.id"
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="data.assetSerialNumber"
                    :label="$t('assets.assetSerialNumber')"
                    outlined
                    dense
                    required
                  />
                </v-col>
                <v-col
                  v-if="!this.$route.params.id"
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="data.assetCount"
                    :label="$t('assets.assetCount')"
                    outlined
                    dense
                    required
                    type="number"
                  />
                </v-col>
              </v-row>
            </v-col>
            <h3>{{ $t('assets.companiesInfo') }}</h3>
            <v-col cols="12">
              <v-row class=" px-2">
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="data.branchId"
                    :items="LKPBrnch"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseBranch')"
                    outlined
                    dense
                    @input="getLKPFloor(data.branchId)"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="data.floorId"
                    :items="LKPFloor"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseFloor')"
                    outlined
                    dense
                    @input="getLKPRoom(data.floorId)"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="data.roomId"
                    :items="LKPRoom"
                    item-text="name"
                    item-value="id"
                    :label="$t('assets.chooseRoom')"
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </v-col>
            <h3>{{ $t('assets.datesInfo') }}</h3>
            <v-col cols="12">
              <v-row class=" px-2">
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-menu
                    v-model="assetProductionDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.assetProductionDate"
                        :label="$t('assets.assetProductionDate')"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.assetProductionDate"
                      class="mt-0 mb-0"
                      @input="assetProductionDate = false"
                    />
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-menu
                    v-model="assetExpiryDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.assetExpiryDate"
                        :label="$t('assets.assetExpiryDate')"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.assetExpiryDate"
                      class="mt-0 mb-0"
                      @input="assetExpiryDate = false"
                    />
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-menu
                    v-model="assetMaintinanceDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.assetMaintinanceDate"
                        :label="$t('assets.assetMaintinanceDate')"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.assetMaintinanceDate"
                      class="mt-0 mb-0"
                      @input="assetMaintinanceDate = false"
                    />
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            class="mx-auto my-auto d-flex"
            color="indigo"
            :loading="loading"
            :disabled="disabled"
          >
            {{ this.$route.params.id ? $t('actions.save') : $t('actions.add') }}
          </v-btn>
        </v-container> -->
      </v-form>
    </template>
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
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const SettingService = ServiceFactory.get('Setting')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        name: '',
        logo: '',
        url: '',
        tax_number: '',
        VAT_rate: '',
        seal_name: '',
        seal_url: '',
        phone_number: '',
        email: '',
        unified_number: '',
        ID_approved_resident: '',
        national_address: '',
        city: '',
        neighborhood: '',
        street: '',
        building_number: '',
        unit_number: '',
        postal_code: '',
        extra_number: '',
        user_id: 0,
      },
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      this.fetchItem()
    },
    methods: {
      async updateContent (data) {
        console.log('update Item', data)
        const item = await SettingService.updateAssets(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchItem () {
        this.dataLoading = true
        const assets = await SettingService.getFacility()
        this.data = assets.object
        console.log('assets.object', assets.object)
        this.dataLoading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
.border{
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  margin-bottom: 20px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details{
  display: none !important;
}
</style>
