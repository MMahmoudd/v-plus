<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('floor.editFloor') : $t('floor.addFloor') }}
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
                  v-model="data.floorName"
                  :label="$t('floor.floorName')"
                  outlined
                  required
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
                  :label="$t('floor.branchName')"
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
  const CompaniesFloorService = ServiceFactory.get('CompaniesFloor')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        floorId: null,
        branchId: null,
        floorName: '',
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
            areaId: this.data.areaId,
            areaName: this.data.areaName,
            companyId: this.data.companyId,
          })
        } else {
          this.newItem(
            {
              areaName: this.data.areaName,
              companyId: this.data.companyId.id,
            },
          )
        }
      },
      async newItem (data) {
        const item = await CompaniesFloorService.updateAddFloor(data)
        console.log('new Item item', item)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Companies-floor')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.loading = false
        this.disabled = false
      },
      async updateContent (data) {
        const item = await CompaniesFloorService.updateAddFloor(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Companies-floor')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.loading = false
        this.disabled = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const floor = await CompaniesFloorService.fetchOneItem(id)
        this.data = floor.object
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
