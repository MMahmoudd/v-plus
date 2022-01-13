<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? 'تعديل فاتورة' : 'اضافة فاتورة' }}
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
                <v-select
                  v-model="data.customer_id"
                  :items="customers"
                  item-text="cs_name"
                  item-value="id"
                  label="العميل"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="data.purpose"
                  :items="purpose"
                  label="الغرض"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.first_batch"
                  label="الدفعات"
                  type="text"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="data.of_terms_condition"
                  outlined
                  required
                  name="input-7-4"
                  label="الشروط والاحكام"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="data.note"
                  outlined
                  required
                  name="input-7-4"
                  label="ملاحظات"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="bill_price"
                  outlined
                  disabled
                  name="input-7-4"
                  label="اجمالي السعر"
                />
              </v-col>
            </v-row>
            <v-divider />
            <br>
            <h2>نطاق العمل وتفاصيل العقار</h2>
            <br>
            <v-row>
              <v-col
                cols="12"
              >
                <template>
                  <h3 class="mb-4">
                    بيانات الصكوك
                  </h3>
                  <v-row
                    class="border"
                  >
                    <v-col
                      v-for="(item, index) in data.saqs"
                      :key="index"
                      cols="12"
                    >
                      <v-card
                        class="pa-2 ma-2"
                      >
                        <v-card-title>
                          بيان صك جديد
                          <v-spacer />
                          <v-btn
                            medium
                            color="red"
                            @click="deleteSaq(index)"
                          >
                            <v-icon
                              aria-label="Close"
                            >
                              fa-trash-alt
                            </v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-row class="px-5 py-5">
                          <v-text-field
                            v-model="item.instrument_number"
                            label="رقم الصك"
                            type="number"
                            outlined
                            required
                            class="mx-2"
                          />
                          <v-text-field
                            v-model="item.property_description"
                            label="نوع العقار"
                            type="text"
                            outlined
                            required
                            class="mx-2"
                          />
                          <v-text-field
                            v-model="item.space"
                            label="المساحة"
                            type="number"
                            outlined
                            required
                            class="mx-2"
                          />
                          <v-text-field
                            v-model="item.location"
                            label="المدينة"
                            type="text"
                            outlined
                            required
                            class="mx-2"
                          />
                          <v-text-field
                            v-model="item.vat_rate"
                            label="الضريبة"
                            type="number"
                            outlined
                            required
                            class="mx-2"
                          />
                          <v-text-field
                            v-model="item.price"
                            label="السعر"
                            type="number"
                            outlined
                            required
                            class="mx-2"
                          />
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-btn
                  medium
                  class="mx-1 my-1"
                  color="blue"
                  @click="addNewSaq()"
                >
                  اضافة حقل جديد +
                </v-btn>
              </v-col>
            </v-row>
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
  import { ServiceFactory } from '@/services/ServiceFactory'

  const BillsService = ServiceFactory.get('Bills')
  export default {
    name: 'OffersForm',
    data: (vm) => ({
      permissions: {},
      dataLoading: false,
      valid: false,
      data: {
        id: null,
        customer_id: null,
        of_terms_condition: '',
        time: '',
        bill_price: null,
        bill_number: '',
        first_batch: '',
        purpose: '',
        note: '',
        bill_by: null,
        status: '',
        saqs: [],
      },
      SAQ: [],
      customers: [],
      purpose: ['تقيم', 'بيع'],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    computed: {
      bill_price: function () {
        return this.data.saqs.reduce((p, item) => p + +item.price, 0)
      },
    },
    created () {
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
      this.fetchCustomer()
    },
    mounted () {
      this.permissions = this.can('الفواتير')
    },
    methods: {
      async submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          customer_id: this.data.customer_id,
          time: this.data.time,
          bill_price: this.bill_price,
          of_terms_condition: this.data.of_terms_condition,
          first_batch: this.data.first_batch,
          purpose: this.data.purpose,
          note: this.data.note,
          bill_number: this.data.bill_number,
          saqs: this.data.saqs,
        }
        if (this.$route.params.id) {
          await this.updateContent(this.$route.params.id, formData)
        } else {
          await this.newItem(formData)
        }
      },
      async newItem (data) {
        console.log('request: ', data)
        const item = await BillsService.addBill(data)
        console.log('response: ', item)
        if (item.success === true) {
          this.successMessage = 'تمت الاضافة بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Bills')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (id, data) {
        const item = await BillsService.updateBill(id, data)
        if (item.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Bills')
          }, 1500)
        } else {
          this.errorMessage('يوجد مشكلة في التعديل')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      addNewSaq () {
        this.data.saqs.push({
          instrument_number: null,
          property_description: '',
          space: null,
          location: '',
          vat_rate: null,
          price: null,
        })
      },
      deleteSaq (index) {
        this.data.saqs.splice(index, 1)
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const item = await BillsService.fetchOneItem(id)
        console.log('bills', item)
        this.data = item.data
        this.dataLoading = false
      },
      async fetchCustomer () {
        this.dataLoading = true
        const customers = await BillsService.getCustomer()
        console.log('customers', customers.data.data)
        this.customers = customers.data.data
        this.dataLoading = false
      },
    },
  }
</script>
<style>
a {
  text-decoration: none;
}
</style>
