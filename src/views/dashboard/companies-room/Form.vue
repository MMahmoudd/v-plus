<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('room.editRoom') : $t('room.addRoom') }}
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
                  v-model="data.roomName"
                  :label="$t('room.roomName')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.roomNumber"
                  :label="$t('room.roomNumber')"
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
                  :label="$t('room.branchName')"
                  outlined
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
                  return-object
                  :label="$t('room.floorName')"
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
  const CompanyRoomService = ServiceFactory.get('CompanyRoom')
  const CompaniesFloorService = ServiceFactory.get('CompaniesFloor')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        roomId: null,
        floorId: null,
        branchId: null,
        roomNumber: '',
        roomName: '',
      },
      LKPBrnch: [],
      LKPFloor: [],
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
      this.getLKPFloor()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            roomId: this.data.roomId,
            roomNumber: this.data.roomNumber,
            roomName: this.data.roomName,
            floorId: this.data.floorId.id,
            branchId: this.data.branchId.id,
          })
        } else {
          this.newItem(
            {
              roomNumber: this.data.roomNumber,
              roomName: this.data.roomName,
              floorId: this.data.floorId.id,
              branchId: this.data.branchId.id,
            },
          )
        }
      },
      async newItem (data) {
        const item = await CompanyRoomService.updateAddRoom(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Companies-room')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.loading = false
        this.disabled = false
      },
      async updateContent (data) {
        const item = await CompanyRoomService.updateAddRoom(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Companies-room')
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
        const floor = await CompanyRoomService.fetchOneItem(id)
        this.data = floor.object
        this.dataLoading = false
      },
      async getLKPBrnch () {
        this.dataLoading = true
        const LKPBrnch = await CompanyBranchesService.getLKPBrnch()
        this.LKPBrnch = LKPBrnch.list
        this.dataLoading = false
      },
      async getLKPFloor () {
        this.dataLoading = true
        const LKPFloor = await CompaniesFloorService.getLKPFloor()
        this.LKPFloor = LKPFloor.list
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
