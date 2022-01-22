<template>
  <div>
    <div
      class="html2pdf__page-break last"
    />
    <!-- 1 -->
    <table class="first">
      <thead :style="styleData">
        <tr>
          <th colspan="8">
            <div class="header ">
              <div class="header-text">
                العقارات المقارنة
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
            العقار المقارن
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع العملية
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            المساحة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ العملية
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            السعر
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            سعر المتر
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            خط الطول
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            خط العرض
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            1 العقار المقارن
          </td>
          <td>{{ data.cm_operation_type || '' }}</td>
          <td>{{ data.cm_space || '' }}</td>
          <td>{{ formatDate(data.operation_date) }}</td>
          <td>{{ data.cm_price || '' }}</td>
          <td>{{ priceFromMeter(data.cm_price, data.cm_space) || '' }}</td>
          <td>{{ data.cm_latitude }}</td>
          <td>{{ data.cm_longitude }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            2 العقار المقارن
          </td>
          <td>{{ data.cm_operation_type_2 || '' }}</td>
          <td>{{ data.cm_space_2 || '' }}</td>
          <td>{{ formatDate(data.operation_date_2) }}</td>
          <td>{{ data.cm_price_2 || '' }}</td>
          <td>{{ priceFromMeter(data.cm_price, data.cm_space) || '' }}</td>
          <td>{{ data.cm_latitude_2 }}</td>
          <td>{{ data.cm_longitude_2 }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            3 العقار المقارن
          </td>
          <td>{{ data.cm_operation_type_3 || '' }}</td>
          <td>{{ data.cm_space_3 || '' }}</td>
          <td>{{ formatDate(data.operation_date_3) }}</td>
          <td>{{ data.cm_price_3 || '' }}</td>
          <td>{{ priceFromMeter(data.cm_price, data.cm_space) || '' }}</td>
          <td>{{ data.cm_latitude_3 }}</td>
          <td>{{ data.cm_longitude_3 }}</td>
        </tr>
      </tbody>
    </table>
    <!--جدول التسويات-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                جدول التسويات
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
            عناصر المقارنة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 1
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 2
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 3
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية عامل الوقت
          </td>
          <td>{{ addPercentage(data.cm_time_factor_adjustment) }}</td>
          <td>{{ addPercentage(data.cm_time_factor_adjustment_2) }}</td>
          <td>{{ addPercentage(data.cm_time_factor_adjustment_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية شروط التمويل
          </td>
          <td>{{ addPercentage(data.cm_settlement_financing_terms) }}</td>
          <td>{{ addPercentage(data.cm_settlement_financing_terms_2) }}</td>
          <td>{{ addPercentage(data.cm_settlement_financing_terms_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية ظروف السوق
          </td>
          <td>{{ addPercentage(data.cm_settling_market_conditions) }}</td>
          <td>{{ addPercentage(data.cm_settling_market_conditions_2) }}</td>
          <td>{{ addPercentage(data.cm_settling_market_conditions_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            إجمالي تسويات التمويل والسوق
          </td>
          <td>{{ addPercentage(data.cm_total_funding_market_adjustments) }}</td>
          <td>{{ addPercentage(data.cm_total_funding_market_adjustments_2) }}</td>
          <td>{{ addPercentage(data.cm_total_funding_market_adjustments_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            سعر البيع بعد تسوية شروط التمويل وظروف السوق
          </td>
          <td>{{ formatCurrency(data.cm_price_after_settling_financing_terms) }}</td>
          <td>{{ formatCurrency(data.cm_price_after_settling_financing_terms2) }}</td>
          <td>{{ formatCurrency(data.cm_price_after_settling_financing_terms3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية المساحة
          </td>
          <td>{{ addPercentage(data.cm_space_settlement) }}</td>
          <td>{{ addPercentage(data.cm_space_settlement2) }}</td>
          <td>{{ addPercentage(data.cm_space_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسويات أخرى

            (الحيازة، التنظيم<br> (سكني), الموقع، طبيعة الأرض،عدد  <br>الشوارع)
          </td>
          <td>{{ addPercentage(data.cm_other_settlement) }}</td>
          <td>{{ addPercentage(data.cm_other_settlement2) }}</td>
          <td>{{ addPercentage(data.cm_other_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            مجموع نسب التسويات (%)
          </td>
          <td>{{ addPercentage(data.cm_total_settlement) }}</td>
          <td>{{ addPercentage(data.cm_total_settlement2) }}</td>
          <td>{{ addPercentage(data.cm_total_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            سعر البيع بعد التسويات
          </td>
          <td>{{ formatCurrency(data.cm_selling_p_a_settlement) }}</td>
          <td>{{ formatCurrency(data.cm_selling_p_a_settlement2) }}</td>
          <td>{{ formatCurrency(data.cm_selling_p_a_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            األوزان النسبية للعقارات المقارنة
          </td>
          <td>{{ addPercentage(data.cm_relative_w_comparable_p) }}</td>
          <td>{{ addPercentage(data.cm_relative_w_comparable_p2) }}</td>
          <td>{{ addPercentage(data.cm_relative_w_comparable_p3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            مساهمة العقارات المقارنة حسب الوزن النسبي
          </td>
          <td>{{ formatCurrency(data.cm_contribution_comparative_p_relative_weight) }}</td>
          <td>{{ formatCurrency(data.cm_contribution_comparative_p_relative_weight2) }}</td>
          <td>{{ formatCurrency(data.cm_contribution_comparative_p_relative_weight3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة البيوع المقارنة
          </td>
          <td colspan="3">
            {{ formatCurrency(data.cm_market_v_comparative_sales_method) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- then 3 -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                طريقة التكلفة
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
      <tbody>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تقييم الأرض والمباني
          </td>
        </tr>
      </tbody>
    </table>
    <table
      style="width:60%;float:right;"
    >
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            البيان
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            المساحه
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            سعر المتر
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            المجموع
          </td>
        </tr>
        <tr
          v-for="(b,index) in data.transactions_buildings.slice(0,5)"
          :key="index"
        >
          <td
            class="field"
            :style="styleSubData"
          >
            {{ b.building_type }}
          </td>
          <td>{{ b.space }}</td>
          <td>{{ formatCurrency(b.price) }}</td>
          <td>{{ formatCurrency(b.total) }}</td>
        </tr>
        <!-- <tr>
          <td />
          <td
            class="field small"
            :style="styleSubData"
          >
            اجمالي المساحات
            <br>
            (باستثناء الأرض والاسوار)
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            متوسط سعر المتر
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            الإجمالي
          </td>
        </tr>
        <tr>
          <td />
          <td>{{ cm_space_total }}</td>
          <td>{{ cm_space_price_average }}</td>
          <td>{{ formatCurrency(data.cm_method_total) }}</td>
        </tr> -->
      </tbody>
    </table>
    <table
      class=""
      style="width:40%;"
    >
      <tbody>
        <tr>
          <td />
          <td>القيمة</td>
          <td>ملاحظات</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            قيمة الاستبدال
          </td>
          <td>{{ formatCurrency(data.cm_exchange_value) }}</td>
          <td>{{ data.cm_exchange_note || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            التكاليف المباشرة
          </td>
          <td>{{ formatCurrency(data.cm_direct_costs) }}</td>
          <td>{{ data.cm_direct_costs_note || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            التكاليف غير المباشرة
          </td>
          <td>{{ formatCurrency(data.cm_indirect_costs) }}</td>
          <td>{{ data.cm_indirect_costs_note || '' }}</td>
        </tr>
      </tbody>
    </table>
    <div
      class="html2pdf__page-break last"
    />
    <table style="width:60%;float:right;">
      <tbody class="has-fields">
        <tr
          v-for="(b,index) in data.transactions_buildings.slice(0,5)"
          :key="index"
          class="collapse"
        >
          <td
            class="field"
            :style="styleSubData"
          >
            {{ b.building_type }}
          </td>
          <td>{{ b.space }}</td>
          <td>{{ formatCurrency(b.price) }}</td>
          <td>{{ formatCurrency(b.total) }}</td>
        </tr>
        <tr
          v-for="(b,index) in data.transactions_buildings.slice(5)"
          :key="index"
        >
          <td
            class="field"
            :style="styleSubData"
          >
            {{ b.building_type }}
          </td>
          <td>{{ b.space }}</td>
          <td>{{ formatCurrency(b.price) }}</td>
          <td>{{ formatCurrency(b.total) }}</td>
        </tr>
        <tr>
          <td />
          <td
            class="field small"
            :style="styleSubData"
          >
            اجمالي المساحات
            <br>
            (باستثناء الأرض والاسوار)
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            متوسط سعر المتر
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            الإجمالي
          </td>
        </tr>
        <tr>
          <td />
          <td>{{ cm_space_total }}</td>
          <td>{{ cm_space_price_average }}</td>
          <td>{{ formatCurrency(data.cm_method_total) }}</td>
        </tr>
      </tbody>
    </table>
    <!-- ناقصا الإهلاك -->
    <table>
      <tbody class="has-fields">
        <tr>
          <td colspan="3">
            ناقصا الإهلاك
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            1-التدهور المادي
          </td>
          <td>{{ addPercentage(data.cm_physical_deterioration_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_physical_deterioration_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            2-التقادم الوظيفي
          </td>
          <td>{{ addPercentage(data.cm_occupational_limitations_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_occupational_limitations_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            3-التقادم االقتصادي
          </td>
          <td>{{ addPercentage(data.cm_economic_obsolescence_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_economic_obsolescence_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            إحمالي الإهلاك (1+2+3)
          </td>
          <td>{{ addPercentage(data.cm_total_depreciation_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_total_depreciation_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة المهلكة للمباني
          </td>
          <td>{{ addPercentage(data.cm_depreciation_buildings_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_depreciation_buildings_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة المهلكة ألعمال الموقع
          </td>
          <td>{{ addPercentage(data.cm_depreciation_s_business_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_depreciation_s_business_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            قيمة الأرض
          </td>
          <td />
          <td />
        </tr>
        <tr style="visibility: collapse">
          <td>القيمة المهلكة ألعمال الموقع</td><td />
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            أرباح المطور
          </td>
          <td>{{ addPercentage(data.cm_developer_earnings_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_developer_earnings_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بأسلوب التكلفة
          </td>
          <td colspan="2">
            {{ formatCurrency(data.cm_total_market_value) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- الترجيح -->
    <table>
      <tbody class="has-fields">
        <tr>
          <td class="thead">
            الترجيح
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة البيوع المقارنة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة رسملة الدخل
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة التكلفة
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            األوزان النسبية للطرق المستخدمة %
          </td>
          <td>{{ addPercentage(data.weights_market_value_relative_weights_roads_used) }}</td>
          <td>{{ addPercentage(data.weights_market_value_income_capitalization) }}</td>
          <td>{{ addPercentage(data.weights_market_value_cost) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            مساهمة الطرق المستخدمة حسب الوزن النسبي
          </td>
          <td>{{ formatCurrency(data.relative_market_value_relative_weights_roads_used) }}</td>
          <td>{{ formatCurrency(data.relative_market_value_income_capitalization) }}</td>
          <td>{{ formatCurrency(data.relative_market_value_cost) }}</td>
        </tr>
      </tbody>
    </table>
    <!--القيمة السوقية بعد الترجيح-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                القيمة السوقية بعد الترجيح
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
      <tbody>
        <tr>
          <td>القيمة رقمًا</td>
          <td>{{ formatCurrency(data.market_value_weighting_number) }}</td>
        </tr>
        <tr>
          <td>القيمة كتابة</td>
          <td>{{ data.market_value_weighting_text || '' }}</td>
        </tr>
      </tbody>
    </table>
    <div
      class="html2pdf__page-break"
    />
  </div>
</template>

<script>
//   import { pdfMixin } from '../../../../../mixins/pdfMixin.js'

  export default {
    name: 'OneNThree',
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
