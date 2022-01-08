<template>
  <v-dialog
    v-model="showModal"
    width="900"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        x-large
        class="ma-2"
        color="blue"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-file-plus-outline
        </v-icon>
        معاملة جديدة
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-right select-samples-header">
        <h3 class="card-title">
          اختيار نوع النموذج
        </h3>
        <v-btn
          icon
          @click.prevent="showModal = false"
        >
          <v-icon
            dark
            right
          >
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              lg="5"
              md="5"
            >
              <label class="d-block mb-3 font-weight-bold">العميل</label>
              <v-select
                v-model="customer_id"
                :items="customersList"
                item-text="name"
                item-value="id"
                return-object
                label="اختيار العميل"
                single-line
                outlined
                :loading="loading.customers"
                @change="changeCustomer"
              />
            </v-col>
            <v-col
              cols="12"
              lg="5"
              md="5"
            >
              <label class="d-block mb-3 font-weight-bold">النموذج</label>
              <v-select
                v-model="sample_id"
                :items="samplesList"
                item-text="name"
                item-value="id"
                label="اختيار النموذج"
                single-line
                outlined
                :loading="loading.samples"
              />
            </v-col>
            <!-- <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    single-line
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    اختر النموذج
                  </v-btn>
                </template>
                <v-list>
                  <template v-for="sample in samplesList">
                    <v-list-item
                      v-show="sample.status === '1'"
                      :key="sample.id"
                    >
                      <v-list-item-title>
                        <router-link :to="sample.path">
                          {{ sample.name }}
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu> -->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          x-large
          class="ma-2 py-4"
          color="blue"
          :disabled="!sample_id"
          @click.prevent="action"
        >
          إختيار النموذج
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'

  const SamplesService = ServiceFactory.get('Samples')
  const CustomersService = ServiceFactory.get('Customers')

  export default {
    name: 'SelectSample',
    data: () => ({
      loading: {
        samples: false,
        customers: false,
      },
      showModal: false,
      sample_id: '',
      customer_id: '',
      samplesList: [],
      customersList: [],
    }),
    mounted () {
      this.getCustomers()
      this.getSamples()
    },
    methods: {
      async getSamples () {
        this.loading.samples = true
        const { data } = await SamplesService.getAllItems()
        this.samplesList = data.map(sample => {
          return {
            name: sample.name,
            id: sample.id,
            path: `/New-Treatment/${sample.id}`,
            status: sample.status,
          }
        }).filter(sample => sample.status === '1')
        this.loading.samples = false
      },
      async getCustomers () {
        this.loading.customers = true

        const { data: { data } } = await CustomersService.getAllItems()
        this.customersList = data.map(customer => {
          return {
            name: customer.cs_name,
            id: { id: customer.id, sample_id: customer.sample_id },
          }
        })
        this.loading.customers = false
      },
      changeCustomer (selectedCustomer) {
        this.sample_id = selectedCustomer.id.sample_id
      },
      action () {
        this.$router.push(`/New-Treatment/${this.sample_id}`)
      },
    },
  }
</script>
<style scoped>
.select-samples-header{
    display: flex !important;
    justify-content: space-between;
}
.select-samples-header button.v-btn {
    background-color: transparent !important;
}
.select-samples-header button.v-btn .v-icon{
    position: relative !important;
    left: unset !important;
    right: unset !important;
    top: unset !important;
    bottom: unset !important;
    font-size: 25px !important;
}
.v-card__actions > .v-btn.v-btn {
    padding-right: 30px !important;
    padding-left: 30px !important;
}
</style>
