
<template>
  <v-container>
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        المعاملات
      </h1>
      <div>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="800px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-large
              class="ma-2 filter-bg"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                fas fa-filter
              </v-icon>
              فرز
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <label class="d-block mb-3 font-weight-bold">العميل</label>
                    <v-select
                      :items="items"
                      label="العميل"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="5"
                  >
                    <label class="d-block mb-3 font-weight-bold">من</label>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          readonly
                          v-bind="attrs"
                          single-line
                          outlined
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu1 = false"
                      />
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="2"
                    class="d-flex align-center justify-center"
                  >
                    <v-icon>mdi-less-than</v-icon>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="5"
                  >
                    <label class="d-block mb-3 font-weight-bold">إلى</label>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          readonly
                          v-bind="attrs"
                          single-line
                          outlined
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block font-weight-bold">فرز حسب</label>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex1"
                      class="check-label"
                      label="تاريخ الإرسال"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex2"
                      class="check-label"
                      label="تاريخ التكليف"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex3"
                      class="check-label"
                      label="تاريخ التسليم"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                </v-row>
                <v-row>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex4"
                      class="check-label"
                      label="تاريخ الإدخال"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex5"
                      class="check-label"
                      label="طريقة الاستثمار رسملة الدخل"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex6"
                      class="check-label"
                      label="ناريخ الاعتماد"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                </v-row>
                <v-row class="mt-10">
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">المقيم</label>
                    <v-select
                      :items="items"
                      label="المقيم"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">المراجع</label>
                    <v-select
                      :items="items"
                      label="المراجع"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">الغرض من التقييم</label>
                    <v-select
                      :items="items"
                      label="الغرض من التقييم"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">نوع العقار</label>
                    <v-select
                      :items="items"
                      label="نوع العقار"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">تصنيف العقار</label>
                    <v-select
                      :items="items"
                      label="تصنيف العقار"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">المنطقة</label>
                    <v-text-field
                      label="المنطقة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">اسم المدينة</label>
                    <v-text-field
                      label="اسم المدينة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">اسم الحى</label>
                    <v-text-field
                      label="اسم الحى"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block font-weight-bold">حالة المعاملة</label>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex7"
                      class="check-label"
                      label="تحت التثمين"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex8"
                      class="check-label"
                      label="للتدقيق"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex9"
                      class="check-label"
                      label="للاعتماد"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex10"
                      class="check-label"
                      label="معتمدة"
                      color="success"
                      value=""
                      hide-details
                    />
                  </div>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                x-large
                class="ma-2"
                color="blue"
                @click="dialog = false"
              >
                <v-icon left>
                  mdi-file
                </v-icon>
                قائمة المعاملات
              </v-btn>
              <v-btn
                x-large
                class="ma-2 filter-bg"
                @click="dialog = false"
              >
                <v-icon left>
                  fas fa-filter
                </v-icon>
                فرز
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          x-large
          class="ma-2"
          color="blue"
        >
          <v-icon left>
            mdi-file-plus-outline
          </v-icon>
          معاملة جديدة
        </v-btn>
      </div>
    </v-row>
    <v-card class="form-container">
      <v-container>
        <div />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'NewTreatment',

    data: () => ({
      ex1: false,
      ex2: false,
      ex3: false,
      ex4: false,
      ex5: false,
      ex6: false,
      ex7: false,
      ex8: false,
      ex9: false,
      ex10: false,

      dialog: false,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      // Date Inputs
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
    }),
  }
</script>

<style lang="scss" scoped>
.filter-bg{
    background-color: #5FCA21 !important;
}
label{
    font-size: 13px;
}
</style>
