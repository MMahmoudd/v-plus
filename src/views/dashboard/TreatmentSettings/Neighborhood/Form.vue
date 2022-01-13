<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? 'تعديل' : 'اضافة' }}
      </v-card-title>
      <template>
        <v-form
          v-model="valid"
          :disabled="!permissions.update"
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                md="6"
              >
                <label
                  class="d-block mb-3 font-weight-bold"
                >المدينة</label>
                <v-select
                  v-model="data.city_id"
                  :loading="citiesLoading"
                  :items="citiesList"
                  item-text="name"
                  item-value="id"
                  outlined
                  required
                  label="إسم المدينة"
                />
              </v-col>
            </v-row>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                md="6"
              >
                <label
                  class="d-block mb-3 font-weight-bold"
                >إسم الحي</label>
                <v-text-field
                  v-model="data.name"
                  :disabled="!data.city_id"
                  outlined
                  required
                />
              </v-col>
            </v-row>
            <!-- <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                md="6"
              >
                <label
                  class="d-block mb-3 font-weight-bold"
                >الحالة</label>
                <v-radio-group
                  v-model="data.status"
                  row
                >
                  <v-radio
                    label="مفعل"
                    color="blue"
                    value="1"
                  />
                  <v-radio
                    label="غير مفعل"
                    color="red"
                    value="2"
                  />
                </v-radio-group>
              </v-col>
            </v-row> -->
            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="loading"
              :disabled="disabled || !permissions.update"
            >
              {{ this.$route.params.id ? 'حفظ' : 'اضافة' }}
            </v-btn>
          </v-container>
        </v-form>
      </template>
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
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const CitiesService = ServiceFactory.get('Cites')
  const NeighborhoodsService = ServiceFactory.get('Neighborhoods')
  export default {
    name: 'Companies',
    data: (vm) => ({
      permissions: {},
      dataLoading: false,
      citiesLoading: false,
      valid: false,
      citiesList: [],
      data: {
        id: null,
        name: '',
        city_id: '',
      },
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
    },
    mounted () {
      this.getCities()
      this.permissions = this.can('تخصيص المعاملة')
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          name: this.data.name,
          city_id: this.data.city_id,
        }
        if (this.$route.params.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await NeighborhoodsService.addOneItem(data)
        if (item.success === true) {
          this.successMessage = 'تمت الاضافة بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/treatment-settings/neighborhoods')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (id, data) {
        const item = await NeighborhoodsService.updateOneItem(id, data)
        if (item.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/treatment-settings/neighborhoods')
          }, 1500)
        } else {
          this.errorMessage('يوجد مشكلة في التعديل')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const user = await NeighborhoodsService.fetchOneItem(id)
        console.log(user)
        this.data = user.data
        this.dataLoading = false
      },
      async getCities () {
        this.citiesLoading = true
        const { data } = await CitiesService.getAllItems()
        this.citiesList = data.data.map(({ id, name }) => ({
          id, name,
        }))
        this.citiesLoading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
