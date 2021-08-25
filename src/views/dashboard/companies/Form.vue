<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('companies.editCompanies') : $t('companies.addCompanies') }}
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
                  v-model="data.companyNameArabic"
                  :label="$t('companies.arName')"
                  outlined
                  required
                />
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.companyNameEnglish"
                  :label="$t('companies.enName')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.groupId"
                  :items="LKPGroup"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('companies.chooseGroup')"
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
  const CompaniesService = ServiceFactory.get('companies')
  const CompanyGroupService = ServiceFactory.get('companyGroup')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        companyId: 0,
        groupId: 0,
        groupName: '',
        companyNameArabic: '',
        companyNameEnglish: '',
        companyLogo: '',
      },
      LKPGroup: [],
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
      this.getLKPGroup()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            companyId: this.data.companyId,
            groupId: this.data.groupId,
            companyLogo: this.data.companyLogo,
            companyNameArabic: this.data.companyNameArabic,
            companyNameEnglish: this.data.companyNameEnglish,
          })
        } else {
          this.newItem(
            {
              groupId: this.data.groupId.id,
              companyLogo: this.data.companyLogo,
              companyNameArabic: this.data.companyNameArabic,
              companyNameEnglish: this.data.companyNameEnglish,
            },
          )
        }
      },
      async newItem (data) {
        const item = await CompaniesService.updateAddCompany(data)
        console.log('new Item item', data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Companies')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        const item = await CompaniesService.updateAddCompany(data)
        console.log('update Content item', data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Companies')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const company = await CompaniesService.fetchOneItem(id)
        this.data = company.object
        this.dataLoading = false
      },
      async getLKPGroup () {
        this.dataLoading = true
        const LKPGroup = await CompanyGroupService.getLKPGroup()
        this.LKPGroup = LKPGroup.list
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
