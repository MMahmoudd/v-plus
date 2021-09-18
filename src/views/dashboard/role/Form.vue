<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('role.editRole') : $t('role.addRole') }}
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
                  v-model="data.roleName"
                  :label="$t('role.roleName')"
                  outlined
                  required
                />
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.roleGroup"
                  :label="$t('role.roleGroup')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="data.policyIds"
                  :items="permissions"
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
  const RoleService = ServiceFactory.get('Role')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        roleId: null,
        policyIds: [],
        roleName: '',
        roleGroup: '',
      },
      permissions: [],
      selectedPermissions: [],
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
      this.featchAllPerimissions()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent(
            {
              roleId: this.data.roleId,
              roleName: this.data.roleName,
              roleGroup: this.data.roleGroup,
            },
            {
              roleId: this.data.roleId,
              policyIds: this.data.policyIds,
            },
          )
        } else {
          this.newItem(
            {
              roleName: this.data.roleName,
              roleGroup: this.data.roleGroup,
            },
            {
              roleId: this.data.roleId,
              policyIds: this.data.policyIds,
            },
          )
        }
      },
      async newItem (data, per) {
        const item = await RoleService.updateAddRole(data)
        const itemPer = await RoleService.addRoleToPermission(per)
        console.log('new Item item', data)
        if (item.success && itemPer.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Roles')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data, per) {
        const item = await RoleService.updateAddRole(data)
        const itemPer = await RoleService.addRoleToPermission(per)
        console.log('item', item)
        console.log('per', per)
        if (item.success && itemPer.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Roles')
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
        const role = await RoleService.fetchOneItem(id)
        console.log(role)
        this.data = role.object
        this.dataLoading = false
      },
      async featchAllPerimissions () {
        this.dataLoading = true
        const permissions = await RoleService.getAllpermissions()
        this.permissions = permissions.list
        console.log('permissions', this.permissions)
        this.total = permissions.count
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
