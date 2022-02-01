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
      <div
        class="table_title"
        style="display:flex;justify-content:space-between;align-items:center;"
      >
        <span>
          تقرير المصروفات
        </span>
        <v-form @submit.prevent="filterExpenses">
          <v-text-field
            v-model="filterForm.year"
            type="number"
            label="السنة"
            outlined
            single-line
            style="display:inline-flex;width:300px;"
            hide-details
            dense
            :disabled="loading.list"
          />
          <v-btn
            class="time-chip"
            color="primary"
            label
            text-color="white"
            type="submit"
            :disabled="loading.list"
          >
            اذهب
          </v-btn>
        </v-form>
      </div>
      <div class="custom-table">
        <table>
          <thead>
            <tr>
              <th class="sticky-first">
                المصروفات
              </th>
              <th
                v-for="(item,index) in listHeader"
                :key="index"
              >
                {{ item.month_name }}
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
            <tr>
              <td>
                المصاريف الثابتة
              </td>
              <td
                v-for="(item,index) in list.expenses_fixed"
                :key="index"
                :data-prefix="listHeader[index].month_name"
              >
                {{ item || 0 }}
              </td>
            </tr>
            <tr>
              <td>
                المصاريف المتغيرة
              </td>
              <td
                v-for="(item,index) in list.expenses_static"
                :key="index"
                :data-prefix="listHeader[index].month_name"
              >
                {{ item || 0 }}
              </td>
            </tr>
            <tr>
              <td>
                الإجمالي
              </td>
              <td
                v-for="(item,index) in list.expenses_static"
                :key="index"
                :data-prefix="`إجمالي ${listHeader[index].month_name}`"
              >
                {{ item + list.expenses_fixed[index]|| 0 }}
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

      <!-- <div class="v-data-footer custom-table_footer">
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
      </div> -->
    </div>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const expensesReportService = ServiceFactory.get('expensesReport')

  export default {
    name: 'ExpensesReports',
    data: () => ({
      loading: {
        list: false,
      },
      list: [],
      totalOfEveryMonth: [],
      page: {
        current: 1,
        total: 0,
        items: 0,
        next_page: 1,
      },
      filterForm: {
        year: '',
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
        {
          month_name: 'الإجمالي',
        },
      ]),
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
      this.fetchAll()
    },
    methods: {
      async fetchAll (options = {}) {
        this.loading.list = true
        const { data } = await expensesReportService.getAllItems(options)
        this.list = this.formatList(data)
        this.loading.list = false
      },
      formatList (object) {
        const newObject = {}
        // eslint-disable-next-line no-unused-vars
        let totalExpensesStatic = 0
        // eslint-disable-next-line no-unused-vars
        let totalExpensesFixed = 0
        newObject.expenses_static = []
        newObject.expenses_fixed = []

        object.expenses_static.forEach(obj => {
          const value = Object.values(obj)[0] || 0
          newObject.expenses_static.push(value)
          totalExpensesStatic += value
        })
        newObject.expenses_static.push(totalExpensesStatic)
        object.expenses_fixed.forEach(obj => {
          const value = Object.values(obj)[0] || 0
          newObject.expenses_fixed.push(value)
          totalExpensesFixed += value
        })
        newObject.expenses_fixed.push(totalExpensesFixed)

        // newObject.expenses_static = object.expenses_static.map(v => Object.values(v)).flat()
        // newObject.expenses_fixed = object.expenses_fixed.map(v => Object.values(v)).flat()

        return newObject
      },
      async filterExpenses () {
        this.fetchAll({ year: this.filterForm.year })
        this.filterForm.year = ''
      },
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
    display:flex;justify-content:space-between;align-items:center;
    padding-right: 10px;
    padding-left:10px;
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
  /* tr {
    display:flex;
    justify-content: space-between;
    align-items: center
  } */
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
