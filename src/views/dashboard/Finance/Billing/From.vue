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
                  :hint="`${select.cs_name}, ${select.id}`"
                  :items="customers"
                  item-text="cs_name"
                  item-value="id"
                  label="العميل"
                  persistent-hint
                  single-line
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.time"
                  label="مدة الانجاز"
                  type="text"
                  outlined
                  required
                />
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="data.purpose"
                  :items="purpose"
                  label="الغرض"
                  dense
                  solo
                />
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              />

              <v-col
                cols="12"
                md="6"
              >
                <v-textarea
                  v-model="data.own_customer"
                  solo
                  name="input-7-4"
                  label="الشروط والاحكام"
                />
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              />
              <v-col
                cols="12"
                md="6"
              >
                <v-textarea
                  v-model="data.note"
                  solo
                  name="input-7-4"
                  label="ملاحظات"
                />
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              />
              <v-col
                class="d-flex"
                cols="6"
                sm="4"
              >
                <v-select
                  v-model="data.signature"
                  :items="purpose"
                  label="التوقيع"
                  dense
                  solo
                />
              </v-col>
            </v-row>

            <h2>نطاق العمل وتفاصيل العقار</h2>
            <br>
            <v-row
              v-for="(row, index) in airRows"
              :key="index"
              align="center"
            >
              <v-col
                cols="1"
                lg="2"
                md="2"
              >
                <v-text-field
                  v-model="data.saq.instrument_number"
                  label="رقم الصك"
                  type="number"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="4"
              >
                <v-text-field
                  v-model="data.saq.property_description"
                  label="وصف العقار"
                  type="text"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="2"
                lg="2"
                md="2"
              >
                <v-text-field
                  v-model="data.saq.space"
                  label="المساحة"
                  type="number"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="4"
              >
                <v-text-field
                  v-model="data.saq.location"
                  label="الموقع"
                  type="text"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                lg="2"
                md="2"
              >
                <v-text-field
                  v-model="data.saq.price"
                  label="قيمة الاتعاب"
                  type="number"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                lg="2"
                md="2"
              >
                <label
                  class="d-block font-weight-bold"
                  @click.prevent="airRows++"
                >
                  <v-icon left> mdi-plus </v-icon>
                  إضافة
                </label>
              </v-col>
              <v-col
                cols="12"
                lg="2"
                md="2"
              >
                <label
                  class="d-block font-weight-bold"
                  @click.prevent="removeField(airRows)"
                >
                  <v-icon left> mdi-plus </v-icon>
                  remove
                </label>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="loading"
              :disabled="disabled"
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
      absolute
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
      absolute
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

  const BillingServices = ServiceFactory.get('Bills')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        customer_id: 0,
        time: '',
        own_customer: '',
        purpose: '',
        note: '',
        signature: '',
        price: 0,
        saq: [{
          instrument_number: 0,
          property_description: '',
          space: 0,
          location: '',
          price: 0,
        }],
      },
      airRows: 1,
      customers: [
        { cs_name: 'name', id: 1 },
      ],
      select: { cs_name: '', id: null },
      purpose: ['تقيم', 'بيع'],
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
      this.fetchCustomer()
    },
    methods: {
      async submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          customer_id: this.data.customer_id,
          time: this.data.time,
          own_customer: this.data.own_customer,
          purpose: this.data.purpose,
          note: this.data.note,
          signature: this.data.signature,
          by: this.data.by,
          price: this.data.price,
          saq: [this.data.saq],
        }
        if (this.$route.params.id) {
          await this.updateContent(this.$route.params.id, formData)
        } else {
          await this.newItem(formData)
        }
      },
      async newItem (data) {
        console.log('request: ', data)
        const item = await BillingServices.addBill(data)
        console.log('response: ', item)
        if (item.success === true) {
          this.successMessage = 'تمت الاضافة بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/price-offers')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      removeField (index) {
        this.data.saq.splice(index, 1)
        console.log('remove: ', index)
      },
      async updateContent (id, data) {
        const item = await BillingServices.updateBill(id, data)
        if (item.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/price-offers')
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
        const user = await BillingServices.fetchOneItem(id)
        console.log(user)
        this.data = user.data
        this.dataLoading = false
      },
      async fetchCustomer () {
        this.dataLoading = true
        const customers = await BillingServices.getCustomer()
        console.log(customers)
        this.customers = customers.data
        this.customers = this.customers.data
        console.log('resp: ', this.customers)
        console.log('select: ', this.items)
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
