<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ $t('assets.moveAssets') }}
      </v-card-title>
      <template>
        <v-form
          v-model="valid"
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
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
                <v-select
                  v-model="data.branchId"
                  :items="LKPBrnch"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('assets.currentBranch')"
                  outlined
                  dense
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.NewBranchId"
                  :items="LKPBrnch"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('assets.chooseNewBranch')"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="data.description"
                  outlined
                  name="input-7-4"
                  :label="$t('assets.description')"
                />
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="loading"
              :disabled="disabled"
            >
              {{ $t('actions.save') }}
            </v-btn>
          </v-container>
        </v-form>
      </template>
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
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const AssetsService = ServiceFactory.get('Assets')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  export default {
    name: 'StatusForm',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        assetId: null,
        assetName: '',
        BranchId: null,
        NewBranchId: null,
        description: '',
      },
      LKPBrnch: [],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
      this.getLKPBrnch()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            assetId: this.data.assetId,
            NewBranchId: this.data.NewBranchId.id,
            description: this.data.description,
          })
        }
      },
      async updateContent (data) {
        const item = await AssetsService.MoveAssetfromBranchToBranch(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Move-Assets')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const company = await AssetsService.fetchOneItem(id)
        this.data = company.object
        this.dataLoading = false
      },
      async getLKPBrnch () {
        this.dataLoading = true
        const LKPBrnch = await CompanyBranchesService.getLKPBrnch()
        this.LKPBrnch = LKPBrnch.list
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
