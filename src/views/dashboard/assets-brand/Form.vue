<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('assetsBrand.editBrand') : $t('assetsBrand.addBrand') }}
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
                md="6"
              >
                <v-text-field
                  v-model="data.brandName"
                  :label="$t('assetsBrand.brandName')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.assetTypeId"
                  :items="LKPType"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('assetsBrand.chooseType')"
                  outlined
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
              {{ this.$route.params.id ? $t('actions.save') : $t('actions.add') }}
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
      {{ errorSnackbar }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const AssetsBrandService = ServiceFactory.get('AssetsBrand')
  const AssetsTypeService = ServiceFactory.get('AssetsType')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        assetBrandId: null,
        assetTypeId: null,
        brandName: '',
      },
      LKPType: [],
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
      this.getLKPType()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            assetBrandId: this.data.assetBrandId,
            brandName: this.data.brandName,
            assetTypeId: this.data.assetTypeId,
          })
        } else {
          this.newItem(
            {
              brandName: this.data.brandName,
              assetTypeId: this.data.assetTypeId.id,
            },
          )
        }
      },
      async newItem (data) {
        // const item = await AssetsBrandService.updateAddAssetsBrand(data)
        console.log('new Item item', data)
        // if (item.status === 200) {
        // this.successMessage = 'Successful'
        // this.successSnackbar = true
        // setTimeout(() => {
        //   this.$router.push('/Companies')
        // }, 1500)
        // } else {
        //   this.errorMessage('something Error')
        //   this.errorSnackbar = true
        // }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        // const item = await AssetsBrandService.updateAddAssetsBrand(data)
        console.log('update Content item', data)
        // if (item.status === 200) {
        //   this.successMessage = 'Successful'
        //   this.successSnackbar = true
        //   setTimeout(() => {
        //     this.$router.push('/Companies')
        //   }, 1500)
        // } else {
        //   this.errorMessage('something Error')
        //   this.errorSnackbar = true
        // }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const company = await AssetsBrandService.fetchOneItem(id)
        this.data = company.object
        this.dataLoading = false
      },
      async getLKPType () {
        this.dataLoading = true
        const LKPType = await AssetsTypeService.getLKPType()
        this.LKPType = LKPType.list
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
