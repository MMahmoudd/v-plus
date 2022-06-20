<template>
  <v-container
    id="regular-tables"
    class="userAchievements"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        إنجازات المستخدمين
        <v-spacer />
        <v-row class="pt-5">
          <v-col
            cols="12"
            md="6"
          >
            <v-menu
              v-model="searchDates"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  id="searchDates"
                  v-model="dateRangeText"
                  label="تحديد المدة الزمنية"
                  placeholder="YYYY-MM-DD Format"
                  hint="YYYY-MM-DD Format"
                  v-bind="attrs"
                  outlined
                  v-on="on"
                  @input="fetchAllItems"
                />
              </template>
              <v-date-picker
                v-model="search.dates"
                range
                @change="fetchAllItems"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-autocomplete
              v-model="search.status"
              :items="status"
              item-text="name"
              item-value="id"
              label="المراحل"
              outlined
              @change="fetchAllItems"
            />
          </v-col>
        </v-row>
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
                size="40"
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
      searchDates: false,
      search: {
        dates: [],
        status: '',
      },
      status: [
        { id: 4, name: 'المدخلات' },
        { id: 1, name: 'التقييم' },
        { id: 2, name: 'المراجعة' },
        { id: 3, name: 'الاعتماد' },
        { id: 5, name: 'الكل' },
      ],
      permissions: {},
      dataLoading: false,
      options: {},
      items: [],
      loading: false,
      deleteDailog: false,
      userDetails: {},
      editedIndex: -1,
      disabled: false,
      headers: [
        { text: 'المستخدم', sortable: true, value: 'users.name' },
        { text: 'اجمالي العمليات', sortable: true, value: 'total' },
      ],
    }),

    computed: {
      dateRangeText () {
        return this.search.dates.join(' ~ ')
      },
    },
    mounted () {
    },
    created () {
      this.fetchAllItems()
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const filter = {
          status: +this.search.status === 5 ? 0 : +this.search.status,
          from: this.search.dates[0],
          to: this.search.dates[1],
        }
        console.log('test', filter)
        const items = await Service.getUserAchievementsStatistics(filter)
        console.log('Users', items)
        // items.data.forEach(item => {
        //   // item.created_at &&= new Date(item.created_at).toLocaleString('ar-eg')
        //   if (item.status === '1') {
        //     item.status = 'مفعل'
        //   } else if (item.status === '2') {
        //     item.status = 'قيد انتظار قبول الدعوة'
        //   } else if (item.status === '3') {
        //     item.status = 'غير مفعل '
        //   }
        // })
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
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
  margin-right: 0px;
}
.v-date-picker-title__date{
  display: none;
}
.v-card{
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.v-text-field__details{
  display: none;
}
</style>
