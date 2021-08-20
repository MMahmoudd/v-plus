<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <!-- <h1>{{ $t('driversStatistics') }}</h1> -->
    <v-row>
      <!-- <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="activatedDrivers"
          color="success"
          icon="mdi-account-supervisor-circle"
          :title="$t('activatedDrivers')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="pendingDriver"
          color="orange"
          icon="mdi-account-alert"
          :title="$t('pendingDrivers')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="rejectedDriver"
          color="red"
          icon="mdi-account-remove-outline"
          :title="$t('rejectedDrivers')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col> -->
    </v-row>
    <!-- <h1>{{ $t('shipmentsStatistics') }}</h1> -->
    <!-- <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="pendingShipment"
          color="orange"
          icon="mdi-bus-clock"
          :title="$t('pendingShipment')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="rejectedShipment"
          color="red"
          icon="mdi-car-off"
          :title="$t('rejectedShipment')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="newShipment"
          color="info"
          icon="mdi-new-box"
          :title="$t('newShipments')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="withDriver"
          color="info"
          icon="mdi-steering"
          :title="$t('withDriver')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="shipped"
          color="info"
          icon="mdi-truck"
          :title="$t('shipped')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="inWay"
          color="info"
          icon="mdi-gauge"
          :title="$t('inWay')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="delivered"
          color="info"
          icon="mdi-handshake-outline"
          :title="$t('delivered')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="driverSnipping"
          color="red"
          icon="mdi-account-remove-outline"
          :title="$t('driverSnipping')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          v-model="snipped"
          color="red"
          icon="mdi-account-remove-outline"
          :title="$t('snipped')"
          sub-icon="mdi-calendar"
          :sub-text="$t('lastMonth')"
        />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
  // import { ServiceFactory } from '../../services/ServiceFactory'
  // const statesServices = ServiceFactory.get('states')
  export default {
    name: 'Dashboard',

    data () {
      return {
        activatedDrivers: '',
        rejectedDriver: '',
        pendingDriver: '',
        // shipments
        pendingShipment: '',
        rejectedShipment: '',
        newShipment: '',
        withDriver: '',
        shipped: '',
        inWay: '',
        delivered: '',
        driverSnipping: '',
        snipped: '',
      }
    },
    created () {
      // this.activeDrivers()
      // this.rejectedDrivers()
      // this.pendingDrivers()
      // // shipments
      // this.pendingShipments()
      // this.rejectedShipments()
      // this.allStateShipments()
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    //   async activeDrivers () {
    //     this.dataLoading = true
    //     const activatedDrivers = await statesServices.getAllActivateDrivers()
    //     this.activatedDrivers = activatedDrivers.total
    //     this.dataLoading = false
    //   },
    //   async rejectedDrivers () {
    //     this.dataLoading = true
    //     const rejectedDrivers = await statesServices.getAllRejectiedDrivers()
    //     this.rejectedDriver = rejectedDrivers.total
    //     this.dataLoading = false
    //   },
    //   async pendingDrivers () {
    //     this.dataLoading = true
    //     const pendingDrivers = await statesServices.getAllPendingDrivers()
    //     this.pendingDriver = pendingDrivers.total
    //     this.dataLoading = false
    //   },

    //   // Shipments
    //   async pendingShipments () {
    //     this.dataLoading = true
    //     const pendingShipments = await statesServices.getAllPendingShipments()
    //     this.pendingShipment = pendingShipments.total
    //     this.dataLoading = false
    //   },
    //   async rejectedShipments () {
    //     this.dataLoading = true
    //     const rejectedShipments = await statesServices.getAllRejectedShipments()
    //     this.rejectedShipment = rejectedShipments.total
    //     this.dataLoading = false
    //   },
    //   async allStateShipments () {
    //     this.dataLoading = true

    //     // New Shipments
    //     const newShipments = await statesServices.getAllstateShipments(0, 1)
    //     this.newShipment = newShipments.total
    //     this.dataLoading = false

    //     // with Driver
    //     const withDriverShipments = await statesServices.getAllstateShipments(1)
    //     this.withDriver = withDriverShipments.total
    //     this.dataLoading = false

    //     // shipped
    //     const shippedShipments = await statesServices.getAllstateShipments(2)
    //     this.shipped = shippedShipments.total
    //     this.dataLoading = false

    //     // inWay
    //     const inWayShipments = await statesServices.getAllstateShipments(3)
    //     this.inWay = inWayShipments.total
    //     this.dataLoading = false

    //     // delivered
    //     const deliveredShipments = await statesServices.getAllstateShipments(4)
    //     this.delivered = deliveredShipments.total
    //     this.dataLoading = false

    //     // driver snipping
    //     const driverSnippingShipments = await statesServices.getAllstateShipments(5)
    //     this.driverSnipping = driverSnippingShipments.total
    //     this.dataLoading = false

    //     // snipped
    //     const snippedShipments = await statesServices.getAllstateShipments(6)
    //     this.snipped = snippedShipments.total
    //     this.dataLoading = false
    //   },
    },
  }
</script>
<style lang="scss">
  h1{
    font-weight: 300;
  }
</style>
