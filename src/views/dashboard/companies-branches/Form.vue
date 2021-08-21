<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('branches.editBranch') : $t('branches.addBranch') }}
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
                  v-model="data.branchName"
                  :label="$t('branches.branchName')"
                  outlined
                  required
                />
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.branchAddress"
                  :label="$t('branches.branchAddress')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.areaId"
                  :items="LKPArea"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('branches.areaName')"
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
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  const CompanyAreaService = ServiceFactory.get('CompanyArea')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        branchId: null,
        branchName: '',
        branchAddress: '',
        areaId: null,
        areaName: '',
      },
      LKPArea: [],
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
      this.getLKPArea()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            branchId: this.data.branchId,
            branchName: this.data.branchName,
            branchAddress: this.data.branchAddress,
            areaId: this.data.areaId,
          })
        } else {
          this.newItem(
            {
              branchName: this.data.branchName,
              branchAddress: this.data.branchAddress,
              areaId: this.data.areaId.id,
            },
          )
        }
      },
      async newItem (data) {
        // const item = await CompanyBranchesService.updateAddBrnch(data)
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
        this.loading = false
        this.disabled = false
      },
      async updateContent (data) {
        // const item = await CompanyBranchesService.updateAddBrnch(data)
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
        this.loading = false
        this.disabled = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const branch = await CompanyBranchesService.fetchOneItem(id)
        this.data = branch.object
        this.dataLoading = false
      },
      async getLKPArea () {
        this.dataLoading = true
        const LKPArea = await CompanyAreaService.getLKPArea()
        this.LKPArea = LKPArea.list
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
