<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('users.editUser') : $t('users.addUser') }}
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
                  v-model="data.username"
                  :label="$t('users.username')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.userfullname"
                  :label="$t('users.userfullname')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.mobile"
                  :label="$t('users.mobile')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.email"
                  :label="$t('users.email')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                v-if="!this.$route.params.id"
                cols="12"
              >
                <v-text-field
                  v-model="data.password"
                  :label="$t('users.password')"
                  outlined
                  required
                  type="password"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.companyId"
                  :items="LKPCompany"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('users.companyName')"
                  outlined
                  @input="getLKPBranchByCompany(data.companyId.id)"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.branchId"
                  :items="LKPBranch"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('users.branchName')"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.roleIds"
                  :items="LKPRole"
                  item-text="name"
                  item-value="id"
                  chips
                  :label="$t('users.role')"
                  outlined
                  multiple
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
  const AuthenticationService = ServiceFactory.get('Authentication')
  const CompaniesService = ServiceFactory.get('companies')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  const RoleService = ServiceFactory.get('Role')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        userid: null,
        mobile: '',
        email: '',
        username: '',
        password: '',
        userfullname: '',
        roleIds: [],
        rolesName: '',
        branchId: null,
        companyId: null,
      },
      LKPRole: [],
      LKPCompany: [],
      LKPBranch: [],
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
      this.getLKPCompany()
      this.getLKPRole()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            userid: this.data.userid,
            mobile: this.data.mobile,
            email: this.data.email,
            username: this.data.username,
            userfullname: this.data.userfullname,
            arrRoleId: this.data.roleIds,
            branchId: this.data.branchId.id,
            companyId: this.data.companyId.id,
          })
        } else {
          this.newItem(
            {
              mobile: this.data.mobile,
              email: this.data.email,
              username: this.data.username,
              userfullname: this.data.userfullname,
              password: this.data.password,
              arrRoleId: this.data.roleIds,
              branchId: this.data.branchId.id,
              companyId: this.data.companyId.id,
            },
          )
        }
      },
      async newItem (data) {
        const item = await AuthenticationService.addUserData(data)
        console.log('new Item item', data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Users')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        const item = await AuthenticationService.updateUserData(data)
        console.log('update Content item', data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Users')
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
        const user = await AuthenticationService.fetchOneItem(id)
        this.data = user.object
        this.getLKPBranchByCompany(user.object.companyId)
        this.dataLoading = false
      },
      async getLKPCompany () {
        this.dataLoading = true
        const LKPCompany = await CompaniesService.getLKPCompany()
        this.LKPCompany = LKPCompany.list
        this.dataLoading = false
      },
      async getLKPRole () {
        this.dataLoading = true
        const LKPRole = await RoleService.getLKPRole()
        this.LKPRole = LKPRole.list
        this.dataLoading = false
      },
      async getLKPBranchByCompany (item) {
        this.dataLoading = true
        const LKPBranch = await CompanyBranchesService.getLKPBrnch(item)
        this.LKPBranch = LKPBranch.list
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
