<template>
  <!-- hi developer, how's everything going?,
  I've heard you screaming : "WTF IS THAT?!!",
  and I'm here to answer this question :
  "I have no idea, I don't know why I built the table myself,
  instead of using (v-table), maybe I was drunk.
  although I don't drink, I don't know :(,
  please forgive me, contact me if you need anything,
  anotherDeveloperEmail@thisCodeIsNowYouProblem.com
   -->
  <v-container>
    <div class="custom-table_wrapper">
      <h1 class="table_title">
        تقرير الإيرادات
      </h1>

      <div class="custom-table">
        <table>
          <thead>
            <tr>
              <th class="sticky-first">
                إسم العميل
              </th>
              <th
                v-for="(item,index) in listHeader"
                :key="index"
              >
                {{ item.month_name }}
              </th>
              <th class="sticky-last">
                الإجمالي
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading.list">
              <td
                colspan="14"
                class="progress-linear-table"
              >
                <v-progress-linear
                  indeterminate
                />
              </td>
            </tr>
            <tr v-if="no_items">
              <td>
                لا يوجد عناصر
              </td>
            </tr>
            <tr
              v-for="(item,index) in list"
              :key="index"
            >
              <td data-prefix="إسم العميل">
                <router-link :to="'/reports/revenues-report/'+item.id">
                  {{ item.cs_name }}
                </router-link>
              </td>
              <td
                v-for="(month,monthIndex) in item.months"
                :key="month.name"
                :data-prefix="listHeader[monthIndex].month_name"
              >
                {{ month.total || 0 }}
              </td>
              <td
                data-prefix="الإجمالي"
              >
                {{ item.total || 0 }}
              </td>
            </tr>
            <!--TOTAL-->
            <tr v-if="!no_items && totalOfEveryMonth.length > 0">
              <td class="total-in-mobile">
                الإجمالي
              </td>
              <td
                v-for="(total,indexTotal) in totalOfEveryMonth.slice(0,12)"
                :key="indexTotal"
                :data-prefix="'إجمالي شهر ' + listHeader[indexTotal].month_name"
              >
                {{ total }}
              </td>
              <td data-prefix="إجمالي كل الشهور">
                {{ totalOfEveryMonth[12] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="v-data-footer custom-table_footer">
        <div class="actions">
          <v-btn
            icon
            text
            title="الصفحة التالية"
            :disabled="page.next_page === -1"
            @click="changePage(1)"
          >
            <i class="v-icon notranslate mdi mdi-chevron-left theme--light" />
          </v-btn>
          <v-btn
            class="prev-button"
            icon
            text
            title="الصفحة السابقه"
            :disabled="page.current === 1"
            @click="changePage(-1)"
          >
            <i class="v-icon notranslate mdi mdi-chevron-right theme--light" />
          </v-btn>
        </div>
        <div class="pages_numbers">
          {{ page_number_text }}
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const revenuesReportService = ServiceFactory.get('revenuesReport')
  export default {
    name: 'ListRevenues',
    data: () => ({
      loading: {
        list: false,
      },
      listHeader: Object.freeze([
        {
          month_name: 'يناير',
        },
        {
          month_name: 'فبراير',
        },
        {
          month_name: 'مارس',
        },
        {
          month_name: 'إبريل',
        },
        {
          month_name: 'مايو',
        },
        {
          month_name: 'يونيو',
        },
        {
          month_name: 'يوليو',
        },
        {
          month_name: 'أغسطس',
        },
        {
          month_name: 'سبتمبر',
        },
        {
          month_name: 'أكتوبر',
        },
        {
          month_name: 'نوافمبر',
        },
        {
          month_name: 'ديسمبر',
        },
      ]),
      list: [],
      totalOfEveryMonth: [],
      page: {
        current: 1,
        total: 0,
        items: 0,
        next_page: 1,
      },
      // page: 1,
      // total: 0,
      // currentItems: 0,
    }),
    computed: {
      page_number_text () {
        if (this.page.items > 0) {
          return [this.page.current, '-', this.page.items, ' من ', this.page.total].join('')
        }
        return ''
      },
      no_items () {
        // eslint-disable-next-line no-unneeded-ternary
        return !this.loading.list && this.list.length === 0 ? true : false
      },
    },
    mounted () {
      this.page.current = +this.$route.query.page || 1
      this.fetchAll({ page: this.page.current })
    },
    methods: {
      async fetchAll (options) {
        this.loading.list = true
        const { data: { data: list, total, next_page: nextPage } } = await revenuesReportService.getAllItems(options)
        this.page.total = total
        this.page.items = list.length || 0
        this.page.next_page = nextPage
        this.list = this.addTotalToList(list)
        this.totalOfEveryMonth = this.calcTotalOfEveryMonth(this.list)
        console.log(this.totalOfEveryMonth)
        this.loading.list = false
      },
      addTotalToList (list) {
        return list.map((item) => ({ ...item, total: item.months.reduce((p, c) => p + +c.total, 0) }))
      },
      calcTotalOfEveryMonth (list) {
        const TotalOfEveryMonth = new Array(13).fill(0)
        const MONTH_LENGTH = 12
        for (let index = 0; index < list.length; index++) {
          for (let monthIndex = 0; monthIndex < MONTH_LENGTH; monthIndex++) {
            TotalOfEveryMonth[monthIndex] += +list[index].months[monthIndex].total
          }
          TotalOfEveryMonth[MONTH_LENGTH] += +list[index].total
        }
        // list.forEach((item, index) => {
        //   TotalOfEveryMonth[0] += +item.months[index].total
        //   TotalOfEveryMonth[1] += +item.months[index].total
        //   TotalOfEveryMonth[2] += +item.months[index].total
        //   TotalOfEveryMonth[3] += +item.months[index].total
        //   TotalOfEveryMonth[4] += +item.months[index].total
        //   TotalOfEveryMonth[5] += +item.months[index].total
        //   TotalOfEveryMonth[6] += +item.months[index].total
        //   TotalOfEveryMonth[7] += +item.months[index].total
        //   TotalOfEveryMonth[8] += +item.months[index].total
        //   TotalOfEveryMonth[9] += +item.months[index].total
        //   TotalOfEveryMonth[10] += +item.months[index].total
        //   TotalOfEveryMonth[11] += +item.months[index].total
        // })
        console.log(TotalOfEveryMonth)
        return TotalOfEveryMonth
      },
      changePage (n) {
        this.page.current = +this.page.current + n
        this.$router.replace({ query: { page: this.page.current } })
        this.fetchAll({ page: this.page.current })
      },
    //   formatList (list) {
    //     return list.map(item => {
    //       const newItem = { cs_name: item.cs_name }
    //       item.months.forEach((month) => {
    //         newItem[`${month.month_name.slice(0, 3)}_total`] = Number(month.total)
    //       })
    //       return newItem
    //     })
    //   },
    },
  }
</script>

<style scoped>
.custom-table_wrapper {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 4px;
  margin-top: 30px;
  margin-bottom: 15px;
}
.progress-linear-table {
  height: auto !important;
  padding: 0px !important;
  margin: 0px !important;
}
.table_title {
    /* border-radius: 4px 4px 0px 0px ; */
    padding-right: 10px;
    font-size: 18px;
    font-weight: 500;
    padding-top: 24px;
    padding-bottom: 18px;
    margin-bottom: 3px;
    border-bottom: 1px solid #eaeaea;
    /* box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%); */
}
.custom-table {
    /* border-radius: 0px 0px 4px 4px; */
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-color: #3772FF rgba(0, 0, 0, 0.1);
    scrollbar-width: thin;
}

.custom-table::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0.1);
    height: 10px;
    border-radius: 5px;
}

.custom-table::-webkit-scrollbar-thumb {
    background: #3772FF ;
    border-radius: 5px;
}

.custom-table table {
    width: max-content;
    min-width: 100%;
    table-layout: fixed;
}

.custom-table table thead th {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.75rem;
    font-weight: 300;
}
.custom-table table a {
   color:  #3772ff !important;
   text-decoration: none;

}
.custom-table table tr td , .custom-table table tr th {
    height: 48px;
    padding: 0 16px;
    border-bottom: 1px solid #eaeaea;
    margin: 0px;
    text-align: right;
}

.custom-table table tr:last-child td {
    border-bottom: 1px solid transparent;
}

.custom-table table tr td:first-child, .custom-table table tr th:first-child {
    background-color: #fafafa;
    right: 0;
    position: sticky;
    /* background: linear-gradient(267deg, rgb(51 48 48 / 1%), transparent); */
}
.custom-table table tr td:last-child, .custom-table table tr th:last-child {
    background-color: #fafafa;
    left: 0;
    position: sticky;
}
.custom-table .v-data-footer, .custom-table_footer {
    /* border-top: thin solid rgba(0, 0, 0, 0.12); */
    border-top: 1px solid #eaeaea;
    flex-direction: row-reverse;
    padding: 10px 15px;
    /* position: sticky; */
    /* left: 0; */
}
.custom-table_footer .actions {
    /* margin-right: auto; */
    direction: ltr;
}

 /* .pages_numbers {} */
.prev-button {
  margin-left: 10px;
}
@media screen and (max-width: 500px) {
  .total-in-mobile {
    text-align: center !important;
    display: block !important;
    height: 40px !important;
    line-height: 40px !important;
  }

  /* tbody {
  } */
  thead {
    display: none;
  }
  tr {
    /* display:flex;
    justify-content: space-between;
    align-items: center; */
  }
  tr td {
    border-bottom-color: transparent !important;
    font-weight: 300 !important;
  }
  tr td:last-child {
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
  }
  td {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  td::before {
    content: attr(data-prefix);
    display: inline-block;
    font-weight: 500;
  }
}
</style>
