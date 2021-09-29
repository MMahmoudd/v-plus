<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title v-if="this.$route.name === 'Move Assets Branch'">
        {{ $t('assets.moveAssets') }}
      </v-card-title>
      <v-card-title v-else-if="this.$route.name === 'Move Assets Floor'">
        {{ $t('actions.moveAssetsToFloor') }}
      </v-card-title>
      <v-card-title v-else-if="this.$route.name === 'Move Assets Room'">
        {{ $t('actions.moveAssetsToRoom') }}
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
                  readonly
                />
              </v-col>
              <!--Move Asset To Branch -->
              <v-col
                v-if="this.$route.name === 'Move Assets Branch'"
                cols="12"
                md="6"
              >
                <v-select
                  v-if="LKPBrnch"
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
                v-if="this.$route.name === 'Move Assets Branch'"
                cols="12"
                md="6"
              >
                <v-select
                  v-if="LKPBrnch"
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
              <!--Move Asset To Floor And Room-->
              <v-col
                v-if="this.$route.name === 'Move Assets To Floor And Room'"
                cols="12"
                md="6"
              >
                <v-select
                  v-if="LKPFloor"
                  v-model="data.floorId"
                  :items="LKPFloor"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('assets.currentFloor')"
                  outlined
                  dense
                  readonly
                />
              </v-col>
              <v-col
                v-if="this.$route.name === 'Move Assets To Floor And Room'"
                cols="12"
                md="6"
              >
                <v-select
                  v-if="LKPFloor"
                  v-model="data.newFloorId"
                  :items="LKPFloor"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('assets.chooseNewFloor')"
                  outlined
                  dense
                  @input="getLKPRoom(data.newFloorId.id)"
                />
              </v-col>
              <v-col
                v-if="this.$route.name === 'Move Assets To Floor And Room'"
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.newRoomId"
                  :items="LKPRoom"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$t('assets.chooseNewRoom')"
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
  const CompaniesFloorService = ServiceFactory.get('CompaniesFloor')
  const CompanyRoomService = ServiceFactory.get('CompanyRoom')
  export default {
    name: 'StatusForm',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        assetId: null,
        assetName: '',
        BranchId: null,
        floorId: null,
        roomId: null,
        NewBranchId: null,
        newFloorId: null,
        newRoomId: null,
        description: '',
      },
      LKPBrnch: [],
      LKPFloor: [],
      LKPRoom: [],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      this.fetchOneItem(this.$route.params.id)
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.name === 'Move Assets Branch') {
          this.updateBranch({
            assetId: this.data.assetId,
            NewBranchId: this.data.NewBranchId.id,
            description: this.data.description,
          })
        } else if (this.$route.name === 'Move Assets To Floor And Room') {
          if (this.data.newFloorId) {
            this.updateFloorRoom({
              assetId: this.data.assetId,
              newFloorId: this.data.newFloorId.id,
              newRoomId: this.data.newRoomId.id,
              transActionDesc: this.data.description,
            })
          } else {
            this.updateFloorRoom({
              assetId: this.data.assetId,
              newFloorId: this.data.floorId,
              newRoomId: this.data.newRoomId.id,
              transActionDesc: this.data.description,
            })
          }
        }
      },
      async updateBranch (data) {
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
      async updateFloorRoom (data) {
        console.log(data)
        const item = await AssetsService.MoveAssetInsideBranch(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            // this.$router.push('/Move-Assets')
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
        const assets = await AssetsService.fetchOneItem(id)
        console.log(assets)
        this.getLKPBrnch()
        this.getLKPFloor(assets.object.branchId)
        this.getLKPRoom(assets.object.floorId)
        this.data = assets.object
        this.dataLoading = false
      },
      async getLKPBrnch () {
        this.dataLoading = true
        const LKPBrnch = await CompanyBranchesService.getLKPBrnch()
        this.LKPBrnch = LKPBrnch.list
        this.dataLoading = false
      },
      async getLKPFloor (id) {
        this.dataLoading = true
        console.log('id', id)
        const LKPFloor = await CompaniesFloorService.getFloorByBranch(id)
        console.log(LKPFloor)
        this.LKPFloor = LKPFloor.list
        this.dataLoading = false
      },
      async getLKPRoom (id) {
        this.dataLoading = true
        const LKPRoom = await CompanyRoomService.getRoomByFloor(id)
        this.LKPRoom = LKPRoom.list
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
