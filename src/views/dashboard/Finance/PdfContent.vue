<template>
  <div id="pdf-content">
    <div class="container-header">
      <div class="row">
        <v-col
          cols="6"
        >
          <img
            :src="pdfData.FacilityData.logo"
            alt="facility-image"
            class="border-raduis"
          >
          <h2 v-if="pdfData.FacilityData.name">
            {{ pdfData.FacilityData.name }}
          </h2>
          <p v-if="pdfData.FacilityData.Commercial_Registration_number">
            {{ pdfData.FacilityData.Commercial_Registration_number }}
          </p>
          <p v-if="pdfData.FacilityData.national_address">
            {{ pdfData.FacilityData.national_address }}
          </p>
          <p v-if="pdfData.FacilityData.tax_number">
            {{ pdfData.FacilityData.tax_number }}
          </p>
        </v-col>
        <v-col
          cols="6"
          class="ltr"
        >
          <h1 v-if="pdfData.Name">
            {{ pdfData.Name }}
          </h1>
          <p
            v-if="pdfData.tableData.offer_number"
          >
            # {{ pdfData.tableData.offer_number }}
          </p>
        </v-col>
      </div>
      <div class="row">
        <v-col
          cols="6"
        >
          <p>فاتورة الى</p>
          <p>{{ pdfData.tableData.customer.cs_name }}</p>
        </v-col>
        <v-col
          cols="6"
        >
          <div class="all d-flex justify-space-between text-right">
            <div class="names">
              <p>
                التاريخ
              </p>
              <p>
                مدة الانجاز
              </p>
              <p>
                الغرض من التقييم
              </p>
            </div>
            <div class="values">
              <p
                class="p-right"
              >
                {{ pdfData.tableData.created_at }}
              </p>
              <p
                class="p-right"
              >
                {{ pdfData.tableData.of_time }}
              </p>
              <p
                class="p-right"
              >
                {{ pdfData.tableData.of_purpose }}
              </p>
            </div>
          </div>
        </v-col>
      </div>
      <br>
      <br>
      <div class="table">
        <v-simple-table>
          <template v-slot:default>
            <thead
              dark
              class="dark"
            >
              <tr>
                <th class="text-right text-bold">
                  رقم الصك
                </th>
                <th class="text-right text-bold">
                  نوع العقار
                </th>
                <th class="text-right text-bold">
                  المساحة
                </th>
                <th class="text-right text-bold">
                  المدينة
                </th>
                <th class="text-right text-bold">
                  السعر
                </th>
                <th class="text-right text-bold">
                  الضريبة %
                </th>
                <th class="text-right text-bold">
                  الاجمالي
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in pdfData.tableData.saqs"
                :key="i"
              >
                <td class="text-right">
                  {{ item.instrument_number }}
                </td>
                <td class="text-right">
                  {{ item.property_description }}
                </td>
                <td class="text-right">
                  {{ item.space }}
                </td>
                <td class="text-right">
                  {{ item.location }}
                </td>
                <td class="text-right">
                  {{ formatCurrency(item.price) }}
                </td>
                <td class="text-right">
                  {{ item.vat_rate }}
                </td>
                <td class="text-right">
                  {{ formatCurrency(item.price + (item.price * item.vat_rate / 100)) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div class="row">
        <v-col cols="6" />
        <v-col
          cols="6"
        >
          <div class="d-flex justify-space-between text-right py-3">
            <p>اجمالي المبلغ</p>
            <p class="pl-3">
              {{ formatCurrency(bill_price) }}
            </p>
          </div>
          <div class="d-flex justify-space-between text-right py-3">
            <p>اجمالي الضريبة</p>
            <p class="pl-3">
              {{ formatCurrency(bill_price * bill_vatRat / 100) }}
            </p>
          </div>
          <div class="d-flex justify-space-between gray text-right py-3">
            <p>الاجمالي</p>
            <p class="pl-3">
              {{ formatCurrency(bill_price + (bill_price * bill_vatRat / 100)) }}
            </p>
          </div>
        </v-col>
      </div>
      <br>
      <hr>
      <br>
      <div class="row">
        <v-col cols="12">
          <h3>الملاحظات</h3>
          <p v-if="pdfData.tableData.of_note">
            {{ pdfData.tableData.of_note }}
          </p>
          <br>
          <h3>الشروط والاحكام</h3>
          <p v-if="pdfData.tableData.of_terms_condition">
            {{ pdfData.tableData.of_terms_condition }}
          </p>
        </v-col>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'PdfContent',
    props: {
      pdfData: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      bill_price: function () {
        return this.pdfData.tableData.saqs.reduce((p, item) => p + +item.price, 0)
      },
      bill_vatRat: function () {
        return this.pdfData.tableData.saqs.reduce((p, item) => p + +item.vat_rate, 0)
      },
    },
    methods: {
      formatCurrency: function (number) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'SAR',

        })

        if (number) {
          return formatter.format(+number).replace('SAR', 'ر.س')
        }

        return ''
      },
    },
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap');
#pdf-content {
  width: 90%;
  margin: 50px auto;
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
.container-header .ltr {
  direction: ltr;
  text-align: left;
}
.container-header .d-flex {
  display: flex
}
.container-header .justify-space-between {
  justify-content: space-between;
}
.container-header .dark {
  background-color: #1e1e1e;

}
.container-header .dark tr th{
  color: #fff !important;
}
.container-header .gray{
  background-color: rgb(175, 175, 175) !important;
}
.text-bold{
  font-weight: bold;
}
.container-header .p-right{
  direction: rtl !important;
  text-align: right !important;
}
.pl-3{
  padding-left: 5px !important;
}
.py-3{
padding: 2px 10px !important;
}
.border-raduis{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
