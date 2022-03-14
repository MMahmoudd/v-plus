<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-form @submit.prevent="addOneItem">
        <v-container fluid>
          <v-row>
            <v-col
              md="6"
              sm="12"
              cols="12"
            >
              <label class="d-block mb-3 font-weight-bold">مفتاح خرائط قوقل</label>
              <v-textarea
                v-model="map_key"
                outlined=""
                single-line=""
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                color="blue"
                type="submit"
                :loading="loading"
                @click.prevent="addOneItem"
              >
                حفظ
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'

  const GoogleMapService = ServiceFactory.get('googleMaps')

  export default {
    name: 'GoogleMap',
    data: () => ({
      map_key: '',
      /** update or add based on the get request */
      state: 'add',
      loading: false,

      timeout: 3000,
      successSnackbar: false,
      successMessage: '',
      errorSnackbar: false,
      errorMessage: '',
    }),
    mounted () {
      this.fetchOneItem()
    },
    methods: {
      async fetchOneItem () {
        const { data } = await GoogleMapService.fetchOneItem()
        if (data.google_maps_key) {
          this.state = 'update'
        }
        this.map_key = data.google_maps_key
      },

      async addOneItem () {
        try {
          this.loading = true
          let response
          if (this.state === 'add') {
            response = await GoogleMapService.addOneItem({ map_key: this.map_key })
          } else {
            response = await GoogleMapService.updateOneItem({ map_key: this.map_key })
          }
          if (typeof response.data !== 'object') {
            throw new Error('حدثت مشكلة أثناء التحديث')
          }
          if (response.data.success !== true) {
            throw new Error(response.data.message)
          }

          this.successSnackbar = true
          this.successMessage = response.data.message
        } catch (err) {
          this.errorSnackbar = true
          this.errorMessage = err.message
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>
