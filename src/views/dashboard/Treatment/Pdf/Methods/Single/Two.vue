<template>
  <div>
    <div
      class="html2pdf__page-break last"
    />
    <table class="first">
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                أسلوب الدخل (رسملة الدخل)
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            إجمالي الدخل السنوي
          </td>
          <td>{{ formatCurrency(data.total_annual_income) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            خصم خسائر عدم اإلشغال والتحصيل
          </td>
          <td>{{ formatCurrency(data.deduction_losses) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            إجمالي الدخل الفعلي
          </td>
          <td>{{ formatCurrency(data.total_actual_income) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            ناقصا النفقات التشغيلية والرأسمالية
          </td>
          <td>{{ formatCurrency(data.m_operating_c_expenditures) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            صافي الدخل التشغيلي
          </td>
          <td>{{ formatCurrency(data.net_operating_income) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            معدل الرسملة عامل شراء السنوات
          </td>
          <td>{{ addPercentage(data.capitalization_rate) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية باستخدام طريقة رسملة الدخل
          </td>
          <td>{{ formatCurrency(data.market_v_income_c_method) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//   import { pdfMixin } from '../../../../../mixins/pdfMixin.js'

  export default {
    name: 'Two',
    // mixins: [pdfMixin],
    props: {
      data: { type: Object, default: () => ({}) },
      styleSubData: { type: Object, default: () => ({}) },
      styleData: { type: Object, default: () => ({}) },
    },
    methods: {
      join: function (array) {
        return array.filter(item => typeof item !== 'undefined').join(', ')
      },
      addPercentage: function (number) {
        if (number) {
          return number + '%'
        }

        return ''
      },
      formatCurrency: function (number) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',

        })

        if (number) {
          return formatter.format(+number).replace('$', '')
        }

        return ''
      },
      formatDate: function (date) {
        if (date) {
          return new Date(date).toLocaleDateString('en-GB').split('/').reverse().join('-')
        } else {
          return ''
        }
      },
      priceFromMeter: function (price, space) {
        if (!price || !space) {
          return ''
        } else {
          return this.formatCurrency(space / price)
        }
      },
    },
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap');
#pdf-content {
  width: 90%;
  margin: 30px auto;
}
.first {
  margin-top: 30px;
}
.last {
  margin-bottom: 30px;
}
.collapse {
  visibility: collapse;
}
.container-header {
  width:97%;
  margin: auto;
  direction: rtl;
  text-align: right;
}
.container-header h1 {
  font-size: 28px;
}
.container-header .color {
  color: #187F7B;
}
.container-header .sub-header {
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:10px;
  margin-bottom:10px;
}
.container-header .sub-header h2 {
  font-size: 20px;
}
.container-header .sub-header h3 {
  font-size: 16px;
  /* color: #57585A; */
}

.image-facilty img{
  width: 200px;
  height:100px;
  object-fit: cover;
}
.not-empty {
  min-height: 60px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #57585A;
  margin-bottom: 30px;
}
*:not(.v-icon){
    font-family: 'Baloo Bhaijaan 2', cursive;
  font-weight: normal;

}
table {
  width:100%;
  direction: rtl;
}
table.table-fixed {
  table-layout: fixed;
}
table, th, td, .td {
  border: 1px solid #ccc;
  border-collapse: collapse;
}
table:not(:first-child), table:not(:first-child) th {
  border-top: unset;
}
.colspan td {
  padding: 3px;
}
td,.td{
  padding: 7px 5px;
}
tbody td {
  text-align: center;
}
table thead, .thead {
  background: #187F7B;
  color: #fff;
}
table thead.diff {
  background: #57585A;
  color: #fff;
}
table thead .header {
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
}
table thead th {
  text-align: right;
  font-size:14px;
}
table tbody td ,.td{
  font-size: 12px !important;
}
table tbody td.small {
  font-size: 10px !important;
}
.td {
  text-align: center;
}
table tbody.has-fields tr td.field {
  background: #F3F5F5;
}

.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.text-align-center .v-input--checkbox {
  display: inline-block !important;
}

.checkbox-label {
  color: #333 !important;
}

tbody.images {
  display: grid;
  grid-template-columns: 352px 352px;
justify-content:space-between;
  grid-row-gap: 2px;
}
.image-transaction {
  width: 352px !important;
  height:240px !important;
  object-fit: contain;
}
.html2pdf__page-break {
  direction: rtl;
  text-align: center;
}
/* .html2pdf__page-break::before {
  direction: rtl;
  content: attr(data-number);
  text-align: right;
} */
</style>
