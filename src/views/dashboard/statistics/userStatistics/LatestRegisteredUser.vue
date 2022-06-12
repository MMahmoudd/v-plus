<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        اخر 10 مستخدمين تمت اضافتهم للشركة
        <v-spacer />
        <v-spacer />
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="items"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 40, 50],
        }"
        class="custom_table_class mt-8"
        @fetchAllItems="fetchAllItems"
      >
        <!-- :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages" -->
        <template
          v-slot:[`item.name`]="{ item }"
        >
          <v-row>
            <v-col cols="3">
              <v-avatar
                size="60"
              >
                <img
                  :src="item.image"
                  alt="profile image"
                >
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <p>
                {{ item.name }}
              </p>
              <p>{{ item.email }}</p>
            </v-col>
          </v-row>
        </template>
        <template
          v-slot:no-data
          loading
        >
          <p>لا يوجد بيانات</p>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const Service = ServiceFactory.get('statistics')

  export default {
    data: () => ({
      permissions: {},
      search: '',
      dataLoading: false,
      options: {},
      items: [],
      loading: false,
      deleteDailog: false,
      userDetails: {},
      editedIndex: -1,
      disabled: false,
      headers: [
        { text: 'المستخدم', sortable: true, value: 'name' },
        // { text: 'تاريخ الدخول', sortable: true, value: 'register_time' },
        { text: 'المنصب', sortable: true, value: 'role.role_name' },
        // { text: 'الحالة', sortable: true, value: 'status' },
      ],
    }),

    computed: {},
    // watch: {
    //   options: {
    //     handler () {
    //       this.fetchAllItems()
    //     },
    //   },
    // },
    mounted () {
      // this.permissions = this.can('العملاء')
    },
    created () {
      this.fetchAllItems()
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const items = await Service.getLatestRegisteredUser()
        // console.log('Users', items)
        items.data.forEach(item => {
          // item.created_at &&= new Date(item.created_at).toLocaleString('ar-eg')
          if (item.status === '1') {
            item.status = 'مفعل'
          } else if (item.status === '2') {
            item.status = 'قيد انتظار قبول الدعوة'
          } else if (item.status === '3') {
            item.status = 'غير مفعل '
          }
        })
        this.items = items.data
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
