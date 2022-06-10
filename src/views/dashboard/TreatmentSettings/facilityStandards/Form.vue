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
                >المعايير</label>
                <v-textarea
                  v-model="data.content_en"
                  outlined
                  required
                  :disabled="dataLoading"
                />
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="dataLoading"
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
  const facilityStandards = ServiceFactory.get('facilityStandards')

  export default {
    name: 'FacilityStandards',
    data: (vm) => ({
      permissions: {},
      dataLoading: false,
      regionsLoading: false,
      valid: false,
      regionsList: [],
      will: '',
      data: {
        id: '',
        content_en: '',
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
      this.getAll()
    },
    methods: {
      async getAll () {
        this.dataLoading = true
        const response = await facilityStandards.getAll()
        const { data } = response.data
        if (data.length !== 0) {
          const content = data[0].Content
          const id = data[0].id
          this.data.content_en = content
          this.data.id = id
          this.will = 'update'
        } else {
          this.will = 'create'
        }
        this.dataLoading = false
      },
      async updateOne () {
        this.dataLoading = true
        try {
          const response = await facilityStandards.update(this.data.id, { content_en: this.data.content_en, content_ar: this.data.content_en })
          const data = response.data
          if (data.errors) {
            throw new Error('حدثت مشكلة')
          }
          this.successSnackbar = true
          this.successMessage = 'تم التعديل بنجاح'
        } catch (err) {
          this.errorSnackbar = true
          this.errorMessage = 'يجب أن يكون النص أطول من 30 حرف'
        } finally {
          this.dataLoading = false
        }
      },
      async createOne () {
        this.dataLoading = true
        try {
          const response = await facilityStandards.create({ content_en: this.data.content_en, content_ar: this.data.content_en })
          const data = response.data
          if (data.errors) {
            throw new Error('حدثت مشكلة')
          }
          this.successSnackbar = true
          this.successMessage = 'تم التعديل بنجاح'
          this.will = 'update'
        } catch (err) {
          this.errorSnackbar = true
          this.errorMessage = 'يجب أن يكون النص أطول من 30 حرف'
        } finally {
          this.dataLoading = false
        }
      },
      async deleteOne () {
        this.dataLoading = true
        try {
          const response = await facilityStandards.deleteOne(this.data.id)
          const data = response.data
          if (data.errors) {
            throw new Error('حدثت مشكلة')
          }
          this.successSnackbar = true
          this.successMessage = 'تم التعديل بنجاح'
          this.will = 'create'
        } catch (err) {
          this.errorSnackbar = true
          this.errorMessage = 'حدثت مشكلة'
        } finally {
          this.dataLoading = false
        }
      },
      submitForm () {
        // if (this.data.content_en.trim().length === 0) {
        //   this.
        // }
        if (this.will === 'create') {
          this.createOne()
        } else {
          if (this.data.content_en.trim().length === 0) {
            this.deleteOne()
          } else {
            this.updateOne()
          }
        }
      },
    },
  }
</script>
