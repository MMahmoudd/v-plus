<template>
  <v-container>
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        معاملة رقم 1920215841
      </h1>
      <v-chip
        class="ma-2 time-chip"
        color="blue"
        label
        text-color="white"
      >
        <v-icon left>
          mdi-clock-time-four-outline
        </v-icon>
        <span>تاريخ المعاملة</span>
      </v-chip>
    </v-row>
    <v-card class="form-container">
      <v-container>
        <div>
          <form>
            <div>
              <h2>الملحقات</h2>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">الصك</label>
                  <a
                    class="pdf-container"
                    href="http://shaalan.epizy.com/M-Shaalan-v1/muhammad-shaalan.pdf"
                    target="_blank"
                  >
                    <v-icon>
                      fas fa-file
                    </v-icon>
                    File.pdf
                  </a>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">المخطط</label>
                  <a
                    class="pdf-container"
                    href="http://shaalan.epizy.com/M-Shaalan-v1/muhammad-shaalan.pdf"
                    target="_blank"
                  >
                    <v-icon>
                      fas fa-file
                    </v-icon>
                    File.pdf
                  </a>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">خطاب التكليف</label>
                  <a
                    class="pdf-container"
                    href="http://shaalan.epizy.com/M-Shaalan-v1/muhammad-shaalan.pdf"
                    target="_blank"
                  >
                    <v-icon>
                      fas fa-file
                    </v-icon>
                    File.pdf
                  </a>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">الأرشيف</label>
                  <a
                    class="pdf-container"
                    href="http://shaalan.epizy.com/M-Shaalan-v1/muhammad-shaalan.pdf"
                    target="_blank"
                  >
                    <v-icon>
                      fas fa-file
                    </v-icon>
                    File.pdf
                  </a>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>نطاق العمل وتفاصيل العقار</h2>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label class="d-block mb-3 font-weight-bold">العميل</label>
                  <v-select
                    v-model="data.customer_id"
                    :items="customersList"
                    item-text="name"
                    item-value="id"
                    label="العميل"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم مستخدم التقرير</label>
                  <v-text-field
                    v-model="data.trans_report_name"
                    label="اسم مستخدم التقرير"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >جوال مستخدم التقرير</label>
                  <v-text-field
                    v-model="data.trans_report_phone"
                    label="جوال مستخدم التقرير"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الغرض من التقييم</label>
                  <v-select
                    v-model="data.evaluation_purpose_id"
                    :items="evaluationPurposeList"
                    item-text="name"
                    item-value="id"
                    label="الغرض من التقييم"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >أساس القيمة</label>
                  <v-select
                    v-model="data.trans_value_basis"
                    :items="valuesUsedList"
                    item-text="name"
                    item-value="id"
                    label="أساس القيمة"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >فرضية القيمة</label>
                  <v-select
                    v-model="data.value_hypothesis"
                    :items="feesUsedValuesList"
                    item-text="name"
                    item-value="id"
                    label="فرضية القيمة"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ التكليف</label>
                  <v-menu
                    v-model="trans_assignment_date"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.trans_assignment_date"
                        readonly
                        v-bind="attrs"
                        single-line
                        outlined
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.trans_assignment_date"
                      @input="trans_assignment_date = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ التقييم</label>
                  <v-menu
                    v-model="trans_evaluation_date"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.trans_evaluation_date"
                        readonly
                        v-bind="attrs"
                        single-line
                        outlined
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.trans_evaluation_date"
                      @input="menu2 = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ المعاينة</label>
                  <v-menu
                    v-model="trans_inspection_date"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.trans_inspection_date"
                        readonly
                        v-bind="attrs"
                        single-line
                        outlined
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.trans_inspection_date"
                      @input="trans_inspection_date = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >نوع التقرير</label>
                  <v-select
                    v-model="data.trans_Report_type"
                    :items="staticLists.trans_Report_type"
                    item-text="name"
                    item-value="id"
                    label="نوع التقرير"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رمز إيداع التقرير</label>
                  <v-text-field
                    v-model="data.trans_filing_the_report"
                    label="رمز إيداع التقرير"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الرقم المرجعى</label>
                  <v-text-field
                    v-model="data.trans_reference_number"
                    label="الرقم المرجعى"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رمز العقار / رقم الموقع / رقم العميل</label>
                  <v-text-field
                    v-model="data.trans_deposit_code_site_num_customer_num"
                    label="رمز العقار / رقم الموقع / رقم العميل"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>

              <v-divider class="my-10" />

              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم المنطقة</label>
                  <v-select
                    v-model="data.region_id"
                    :items="regionsList"
                    item-text="name"
                    item-value="id"
                    label="اسم المنطقة"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم المدينة</label>
                  <v-select
                    v-model="data.city_id"
                    :items="updateCitesList"
                    item-text="name"
                    item-value="id"
                    label="اسم المدينة"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label class="d-block mb-3 font-weight-bold">اسم الحى</label>
                  <v-select
                    v-model="data.neighborhood_id"
                    :items="updateNeighborhoodsList"
                    item-text="name"
                    item-value="id"
                    label="اسم الحى"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم الشارع</label>
                  <v-text-field
                    v-model="data.trans_street_name"
                    label="اسم الشارع"
                    single-line
                    outlined
                  />
                </v-col>
                <!-- add city -->
                <v-col
                  cols="12"
                  lg="6"
                  md="12"
                  class="mt-0 pt-0"
                >
                  <v-row
                    align="center"
                  >
                    <v-col
                      cols="9"
                      lg="9"
                      md="9"
                    >
                      <label
                        class="d-block mb-3 font-weight-bold"
                      >
                        إضافة مدينة
                      </label>
                      <v-text-field
                        v-model="cityName"
                        :disabled="!data.region_id"
                        label="اسم المدينة"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="3"
                      lg="3"
                      md="3"
                    >
                      <v-btn
                        :disabled="!data.region_id||!cityName"
                        block
                        x-large
                        class="mr-0"
                        color="blue"
                        @click="addCity(cityName,data.region_id)"
                      >
                        إضافة
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- end add city -->
                <!-- add neighborhood -->
                <v-col
                  cols="12"
                  lg="6"
                  md="12"
                  class="mt-0 pt-0"
                >
                  <v-row
                    align="center"
                  >
                    <v-col
                      cols="9"
                      lg="9"
                      md="9"
                    >
                      <label
                        class="d-block mb-3 font-weight-bold"
                      >
                        إضافة حي
                      </label>
                      <v-text-field
                        v-model="neighborhoodName"
                        :items="regionsList"
                        :disabled="!data.city_id"
                        label="اسم الحي"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="3"
                      lg="3"
                      md="3"
                    >
                      <v-btn
                        x-large
                        block
                        color="blue"
                        class="w-100 mr-0"
                        :disabled="!data.city_id||!neighborhoodName"
                        @click="addNeighborhood(neighborhoodName,data.city_id)"
                      >
                        إضافة
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- end add neighborhood -->
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم المخطط</label>
                  <v-text-field
                    v-model="data.residential_plan_name"
                    label="اسم المخطط"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رقم المخطط</label>
                  <v-text-field
                    v-model="data.residential_plan_no"
                    label="رقم المخطط"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رقم البلوك</label>
                  <v-text-field
                    v-model="data.trans_part_num"
                    label="رقم البلوك"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رقم القطعة</label>
                  <v-text-field
                    v-model="data.trans_part_num"
                    label="رقم القطعة"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >استخدام العقار</label>
                  <v-select
                    v-model="data.property_rating_id"
                    :items="propRatingsList"
                    item-text="name"
                    item-value="id"
                    label="استخدام العقار"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >نوع العقار</label>
                  <v-select
                    v-model="data.property_type_id"
                    :items="propTypeList"
                    item-text="name"
                    item-value="id"
                    label="نوع العقار"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم المالك</label>
                  <v-text-field
                    v-model="data.trans_owner_name"
                    label="اسم المالك"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >جوال المالك</label>
                  <v-text-field
                    v-model="data.trans_owner_phone"
                    label="جوال المالك"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label class="d-block mb-3 font-weight-bold">رقم الصك</label>
                  <v-text-field
                    v-model="data.trans_instrument_num"
                    label="رقم الصك"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ الصك</label>
                  <v-menu
                    v-model="trans_instrument_date"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.trans_instrument_date"
                        readonly
                        v-bind="attrs"
                        single-line
                        outlined
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.trans_instrument_date"
                      @input="trans_instrument_date = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رقم رخصة البناء</label>
                  <v-text-field
                    v-model="data.trans_building_permit_number"
                    label="رقم رخصة البناء"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ رخصة البناء</label>
                  <v-menu
                    v-model="trans_building_permit_date"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.trans_building_permit_date"
                        readonly
                        v-bind="attrs"
                        single-line
                        outlined
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.trans_building_permit_date"
                      @input="trans_building_permit_date = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >عمر البناء</label>
                  <v-text-field
                    v-model="data.trans_construction_age"
                    label="عمر البناء"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رقم محضر التجزئة</label>
                  <v-text-field
                    v-model="data.trans_retail_record_num"
                    label="رقم محضر التجزئة"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ محضر التجزئة</label>
                  <v-menu
                    v-model="trans_retail_record_date"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.trans_retail_record_date"
                        readonly
                        v-bind="attrs"
                        single-line
                        outlined
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="data.trans_retail_record_date"
                      @input="trans_retail_record_date = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >حالة البناء</label>
                  <v-select
                    v-model="data.trans_construction_condition"
                    :items="staticLists.trans_construction_condition"
                    label="حالة البناء"
                    item-text="name"
                    item-value="id"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >حالة الأشغال</label>
                  <v-select
                    v-model="data.trans_occupancy_status"
                    :items="staticLists.trans_occupancy_status"
                    item-text="name"
                    item-value="id"
                    label="حالة الأشغال"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-divider class="my-10" />
              <!-- If Raghie Module -->
              <div v-if="this.$route.params.id == 1">
                <v-row>
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >تاريخ بدء النشاط</label>
                    <v-menu
                      v-model="menu4"
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
                        @input="menu4 = false"
                      />
                    </v-menu>
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >المرحلة الرئيسية</label>
                    <v-text-field
                      label="المرحلة الرئيسية"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">المرحلة الفرعية</label>
                    <v-text-field
                      label="المرحلة الفرعية"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >مدة الإنجاز المتبقية</label>
                    <v-text-field
                      label="مدة الإنجاز المتبقية"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >مساحة الأرض</label>
                    <v-text-field
                      v-model="data.land_area"
                      label="مساحة الأرض"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >المصطحات المبنية</label>
                    <v-text-field
                      label="المصطحات المبنية"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >عدد الأدوار</label>
                    <v-text-field
                      v-model="data.prop_floor"
                      label="5"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
                <div class="d-flex">
                  <template>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        rounded
                        color="dark"
                        dark
                      >
                        التكلفة
                      </v-btn>
                    </div>
                  </template>
                  <template>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        rounded
                        outlined
                        color="dark"
                      >
                        النسبة المئوية
                      </v-btn>
                    </div>
                  </template>
                </div>
                <div class="table-responsive mt-10">
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>
                              مراحل البناء
                            </th>
                            <th>
                              تفاصيل المرحلة
                            </th>
                            <th>
                              النسبة إلى التكلفة
                            </th>
                            <th>
                              التكلفة
                            </th>
                            <th>
                              نسبة الإيجار
                            </th>
                            <th>
                              قيمة الإيجار
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(participant,index) in tableParticipants"
                            :key="'participant'+index"
                          >
                            <td>
                              <label class="v-label theme--light">م{{ index + 1 }}</label>
                            </td>
                            <td>
                              <v-text-field
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </div>
                <v-btn
                  x-large
                  class="orange-btn d-block ma-auto"
                  @click.prevent="tableParticipants++"
                >
                  <v-icon left>
                    fas fa-plus
                  </v-icon>
                  اضافة مرحلة جديدة
                </v-btn>
              </div>
              <!-- If Not Raghie Module -->
              <div v-else>
                <v-row>
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >الموقع العام</label>
                    <v-select
                      v-model="data.trans_general_site"
                      :items="staticLists.trans_general_site"
                      item-text="name"
                      item-value="id"
                      label="الموقع العام"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">التصميم</label>
                    <v-select
                      v-model="data.trans_the_design"
                      :items="staticLists.trans_the_design"
                      item-text="name"
                      item-value="id"
                      label="التصميم"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">المنسوب</label>
                    <v-select
                      v-model="data.trans_attributable"
                      label="المنسوب"
                      :items="staticLists.trans_attributable"
                      item-text="name"
                      item-value="id"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">الجار</label>
                    <v-select
                      v-model="data.trans_neighbor"
                      :items="staticLists.trans_neighbor"
                      item-text="name"
                      item-value="id"
                      label="الجار"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">الشوارع</label>
                    <v-select
                      v-model="data.trans_streets"
                      :items="staticLists.trans_streets"
                      item-text="name"
                      item-value="id"
                      label="الشوارع"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >اضاءة الشوارع</label>
                    <v-select
                      v-model="data.trans_Street_lighting"
                      :items="staticLists.trans_Street_lighting"
                      item-text="name"
                      item-value="id"
                      label="اضاءة الشوارع"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >التيار الكهربائى</label>
                    <v-select
                      v-model="data.trans_electric_current"
                      :items="staticLists.trans_electric_current"
                      item-text="name"
                      item-value="id"
                      label="التيار الكهربائى"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block mb-3 font-weight-bold">نوع العزل</label>
                    <v-select
                      v-model="data.trans_insulation_type"
                      :items="staticLists.trans_insulation_type"
                      item-text="name"
                      item-value="id"
                      label="نوع العزل"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوع أرضية الاحواش</label>
                    <v-select
                      v-model="data.trans_the_type_of_yard_floor"
                      :items="staticLists.trans_the_type_of_yard_floor"
                      item-text="name"
                      item-value="id"
                      label="نوع أرضية الاحواش"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوع أرضية الاستقبال</label>
                    <v-select
                      v-model="data.trans_reception_floor_type"
                      :items="staticLists.trans_reception_floor_type"
                      item-text="name"
                      item-value="id"
                      label="نوع أرضية الاستقبال"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوع أرضية المدخل</label>
                    <v-select
                      v-model="data.trans_entrance_floor"
                      :items="staticLists.trans_entrance_floor"
                      item-text="name"
                      item-value="id"
                      label="نوع أرضية المدخل"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوع أرضية الغرف</label>
                    <v-select
                      v-model="data.trans_room_floor_type"
                      :items="staticLists.trans_room_floor_type"
                      item-text="name"
                      item-value="id"
                      label="نوع أرضية الغرف"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >وصف الأبواب الخارجية</label>
                    <v-text-field
                      v-model="data.trans_bolt_the_outer_doors"
                      label="وصف الأبواب الخارجية"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >وصف الأبواب الداخلية</label>
                    <v-text-field
                      v-model="data.trans_wool_interior_doors"
                      label="وصف الأبواب الداخلية"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >الهيكل الانشائى</label>
                    <v-select
                      v-model="data.trans_structural_structure"
                      :items="staticLists.trans_structural_structure"
                      label="الهيكل الانشائى"
                      item-text="name"
                      item-value="id"
                      single-line
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوع الاسقف</label>
                    <v-select
                      v-model="data.trans_bishop_type"
                      :items="staticLists.trans_bishop_type"
                      item-text="name"
                      item-value="id"
                      label="نوع الاسقف"
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
                    <label class="d-block font-weight-bold">مميزات العقار</label>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.glass_walls_status"
                      class="check-label"
                      label="حوائط زجاجية"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.double_glazing_status"
                      class="check-label"
                      label="زجاج مزدوج"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.plaster_on_the_ceiling_status"
                      class="check-label"
                      label="جبس فى السقف"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.hidden_lighting_status"
                      class="check-label"
                      label="إضاءة مخفية"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.trans_elevators_status"
                      class="check-label"
                      label="مصاعد"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.arabic_bath_status"
                      class="check-label"
                      label="حمام عربى"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.stairs_status"
                      class="check-label"
                      label="سلالم"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.electric_garage_status"
                      class="check-label"
                      label="كراج كهربائى"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.ordinary_garage_status"
                      class="check-label"
                      label="كراج عادى"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.portals_status"
                      class="check-label"
                      label="بوابات"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.heaters_status"
                      class="check-label"
                      label="سخانات"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="data.french_bath_status"
                      class="check-label"
                      label="حمام افرنجى"
                      color="info"
                      true-value="1"
                      false-value="0"
                      hide-details
                    />
                  </div>
                </v-row>

                <v-row class="mt-10">
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block font-weight-bold">نوع التكييف</label>
                  </v-col>
                </v-row>

                <v-row class="mt-0 mb-5">
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex13"
                      class="check-label"
                      label="مركزى"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                </v-row>
                <v-row
                  v-for="(row, index) in airRows"
                  :key="index"
                  align="center"
                >
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوعية التركيب</label>
                    <v-select
                      :items="items"
                      label="نوعية التركيب"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="2"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >رقم العداد</label>
                    <v-text-field
                      label="رقم العداد"
                      single-line
                      outlined
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
                      إضافة رقم عداد جديد
                    </label>
                  </v-col>
                </v-row>

                <v-row class="mt-0 mb-5">
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex14"
                      class="check-label"
                      label="منفصل"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                </v-row>
                <v-row
                  v-for="(row, index) in airRows2"
                  :key="'row2' + index"
                  align="center"
                >
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوعية التركيب</label>
                    <v-select
                      :items="items"
                      label="نوعية التركيب"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="2"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >رقم العداد</label>
                    <v-text-field
                      label="رقم العداد"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="2"
                  >
                    <label
                      class="d-block font-weight-bold"
                      @click.prevent="airRows2++"
                    >
                      <v-icon left> mdi-plus </v-icon>
                      إضافة رقم عداد جديد
                    </label>
                  </v-col>
                </v-row>

                <v-row class="mt-0 mb-5">
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex15"
                      class="check-label"
                      label="شباك"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                </v-row>
                <v-row
                  v-for="(row, index) in airRows3"
                  :key="'row3' + index"
                  align="center"
                >
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوعية التركيب</label>
                    <v-select
                      :items="items"
                      label="نوعية التركيب"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="2"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >رقم العداد</label>
                    <v-text-field
                      label="رقم العداد"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="2"
                  >
                    <label
                      class="d-block font-weight-bold"
                      @click.prevent="airRows3++"
                    >
                      <v-icon left> mdi-plus </v-icon>
                      إضافة رقم عداد جديد
                    </label>
                  </v-col>
                </v-row>

                <v-row class="mt-0 mb-5">
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex16"
                      class="check-label"
                      label="كونسيلد"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                </v-row>
                <v-row
                  v-for="(row, index) in airRows4"
                  :key="'row4' + index"
                  align="center"
                >
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >نوعية التركيب</label>
                    <v-select
                      :items="items"
                      label="نوعية التركيب"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="2"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >رقم العداد</label>
                    <v-text-field
                      label="رقم العداد"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="2"
                  >
                    <label
                      class="d-block font-weight-bold"
                      @click.prevent="airRows4++"
                    >
                      <v-icon left> mdi-plus </v-icon>
                      إضافة رقم عداد جديد
                    </label>
                  </v-col>
                </v-row>
              </div>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>احداثيات العقار</h2>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <gmap-map
                    ref="vPlusMap"
                    map-type-id="terrain"
                    style="width: 100%; height: 450px"
                    :center="center"
                    :zoom="4"
                  >
                    <GmapMarker
                      :position="{lat: +data.latitude, lng: +data.longitude}"
                      :clickable="true"
                      :draggable="true"
                      @drag="updateCoordinates"
                      @click="updateCenter"
                    />
                  </gmap-map>
                </v-col>
                <div
                  v-if="errorCurLocation"
                  class="text-danger"
                >
                  <v-alert
                    type="error"
                  >
                    {{ errorCurLocation }}
                  </v-alert>
                </div>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >خط الطول</label>
                  <v-text-field
                    v-model="data.longitude"
                    label="خط الطول"
                    single-line
                    outlined
                    type="number"
                    @change="changeLatAndLong"
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >خط العرض</label>
                  <v-text-field
                    v-model="data.latitude"
                    label="خط العرض"
                    single-line
                    outlined
                    type="number"
                    @change="changeLatAndLong"
                  />
                </v-col>
                <v-col
                  class="d-flex align-items-center justify-content-end"
                  cols="12"
                  lg="6"
                  md="6"
                >
                  <div>
                    <v-btn
                      x-large
                      class="ma-2"
                      color="blue"
                      @click="doCopy"
                    >
                      <v-icon left>
                        fas fa-copy
                      </v-icon>
                      نسخ
                    </v-btn>
                    <v-btn
                      x-large
                      class="ma-2 orange-btn"
                      @click.prevent="getCurrentLocation()"
                    >
                      <v-icon left>
                        fas fa-map-marker-alt
                      </v-icon>
                      موقعى
                    </v-btn>
                    <!-- <v-btn
                      x-large
                      class="ma-2 light-green-btn"
                      @click.prevent="getMap(lat,long)"
                    >
                      <v-icon left>
                        fas fa-map-marker-alt
                      </v-icon>
                      تحديد الموقع
                    </v-btn> -->
                  </div>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>وصف العقار</h2>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-textarea
                    v-model="data.property_notes"
                    name="input-7-1"
                    hint="Hint text"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-10" />

            <div>
              <h2>حدود واطوال العقار</h2>
              <v-row>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الحد الشمالى</label>
                  <v-text-field
                    v-model="data.northern_border"
                    label="الحد الشمالى"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >بطول</label>
                  <v-text-field
                    v-model="data.tall_northern"
                    label="1525"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الحد الجنوبى</label>
                  <v-text-field
                    v-model="data.southern_border"
                    label="الحد الجنوبى"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >بطول</label>
                  <v-text-field
                    v-model="data.tall_southern"
                    label="1525"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الحد الشرقى</label>
                  <v-text-field
                    v-model="data.eastern_border"
                    label="الحد الشرقى"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >بطول</label>
                  <v-text-field
                    v-model="data.tall_eastern"
                    label="1525"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الحد الغربى</label>
                  <v-text-field
                    v-model="data.western_border"
                    label="الحد الغربى"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >بطول</label>
                  <v-text-field
                    v-model="data.tall_western"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">الواجهة الشمالية</label>
                  <v-select
                    v-model="data.north_facade"
                    item-text="name"
                    item-value="id"
                    :items="staticLists.north_facade"
                    label="الواجهة الشمالية"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">الواجهة الجنوبية</label>
                  <v-select
                    v-model="data.south_facade"
                    item-text="name"
                    item-value="id"
                    :items="staticLists.south_facade"
                    label="الواجهة الجنوبية"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">الواجهة الشرقية</label>
                  <v-select
                    v-model="data.eastern_facade"
                    item-text="name"
                    item-value="id"
                    :items="staticLists.eastern_facade"
                    label="الواجهة الشرقية"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label class="d-block mb-3 font-weight-bold">الواجهة الغربية</label>
                  <v-select
                    v-model="data.western_facade"
                    item-text="name"
                    item-value="id"
                    :items="staticLists.western_facade"
                    label="الواجهة الغربية"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مساحة الارض</label>
                  <v-text-field
                    v-model="data.land_area"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مساحة المبانى</label>
                  <v-text-field
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مساحة القبو</label>
                  <v-text-field
                    v-model="data.basement_space"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مساحة الملاحق</label>
                  <v-text-field
                    v-model="data.annexes_space"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >عدد الأدوار للفلل السكنية</label>
                  <v-text-field
                    v-model="data.num_floors_residential_villas"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>معلومات رخصة البناء</h2>
              <v-row>
                <v-col
                  cols="12"
                  lg="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >هل العقار على الطبيعة مطابق لرخصة البناء</label>
                  <v-radio-group
                    v-model="data.conforms_building_permit"
                    row
                  >
                    <v-radio
                      label="نعم"
                      value="1"
                    />
                    <v-radio
                      label="لا"
                      value="0"
                    />
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12"
                  lg="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >حدود المعاينة</label>
                  <v-radio-group
                    v-model="data.preview_limits"
                    row
                  >
                    <v-radio
                      label="من داخل العقار"
                      value="0"
                    />
                    <v-radio
                      label="من خارج العقار"
                      value="1"
                    />
                    <v-radio
                      label="من الداخل والخارج"
                      value="2"
                    />
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >فى حال عدم مطابقة العقار لرخصة البناء، الرجاء توضيح المخالفات أو أى ملاحظات</label>
                  <v-textarea
                    v-model="data.review_note"
                    name="input-7-1"
                    hint="Hint text"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-10" />

            <div>
              <h2>مكونات العقار</h2>
              <v-row>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مجالس</label>
                  <v-text-field
                    v-model="data.trans_boards"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >غرف طعام</label>
                  <v-text-field
                    v-model="data.trans_dining_rooms"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >غرف نوم</label>
                  <v-text-field
                    v-model="data.trans_bed_room"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مطابخ</label>
                  <v-text-field
                    v-model="data.trans_kitchens"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >دورات مياه</label>
                  <v-text-field
                    v-model="data.trans_toilets"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >جاكوزى</label>
                  <v-text-field
                    v-model="data.trans_jacuzzi"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >حديقة</label>
                  <v-text-field
                    v-model="data.trans_garden"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >غرفة خادمة</label>
                  <v-text-field
                    v-model="data.trans_maids_room"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >غرفة حارس</label>
                  <v-text-field
                    v-model="data.trans_guard_Room"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >قبو</label>
                  <v-text-field
                    v-model="data.trans_basement"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الصالات</label>
                  <v-text-field
                    v-model="data.trans_halls"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >الملاحق</label>
                  <v-text-field
                    v-model="data.trans_supplements"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مصاعد</label>
                  <v-text-field
                    v-model="data.trans_elevators"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >موقف سيارات</label>
                  <v-text-field
                    v-model="data.trans_parking"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >ملاعب أطفال</label>
                  <v-text-field
                    v-model="data.trans_children_playground"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مسرح</label>
                  <v-text-field
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مستودع</label>
                  <v-text-field
                    v-model="data.trans_storehouse"
                    label="0"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >أخرى</label>
                  <v-textarea
                    name="input-7-1"
                    hint="Hint text"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-10" />

            <div>
              <h2>تصنيف مستوى تشطيبات البناء</h2>
              <v-radio-group
                v-model="outsideFinishing"
                row
              >
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيب فاخر</label>
                  <v-radio
                    class="mr-0"
                    label="تشطيبات خارجية فاخرة"
                    value="outLux"
                    name="outsideFinishing"
                  />
                  <v-textarea
                    v-model="outLux"
                    name="input-7-1"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيب متوسط</label>
                  <v-radio
                    class="mr-0"
                    label="تشطيبات خارجية متوسطة"
                    value="outMed"
                    name="outsideFinishing"
                  />
                  <v-textarea
                    v-model="outMed"
                    name="input-7-1"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيبات عادى</label>
                  <v-radio
                    class="mr-0"
                    label="تشطيبات خارجية عادية"
                    value="outNorm"
                    name="outsideFinishing"
                  />
                  <v-textarea
                    v-model="outNorm"
                    name="input-7-1"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >بدون تشطيب</label>
                  <v-radio
                    v-model="selected"
                    class="mr-0"
                    label="بدون تشطيب خارجى"
                    value="without"
                    name="outsideFinishing"
                  />
                </v-col>
              </v-radio-group>
              <v-radio-group
                v-model="outsideFinishing"
                class="mt-0"
                row
              >
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <v-radio
                    class="mr-0"
                    label="تشطيبات داخلية فاخرة"
                    value="inLux"
                    name="insideFinishing"
                  />
                  <v-textarea
                    v-model="inLux"
                    name="input-7-1"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <v-radio
                    class="mr-0"
                    label="تشطيبات داخلية متوسطة"
                    value="inMed"
                    name="insideFinishing"
                  />
                  <v-textarea
                    v-model="inMed"
                    name="input-7-1"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <v-radio
                    class="mr-0"
                    label="تشطيبات داخلية عادية"
                    value="inNorm"
                    name="insideFinishing"
                  />
                  <v-textarea
                    v-model="inNorm"
                    name="input-7-1"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <v-radio
                    v-model="selected"
                    class="mr-0"
                    label="بدون تشطيب داخلى"
                    value="without"
                    name="insideFinishing"
                  />
                </v-col>
              </v-radio-group>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>الخدمات والمرافق المتوفرة بالبناء</h2>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-checkbox
                    v-model="selected"
                    label="هاتف"
                    value="هاتف"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-checkbox
                    v-model="selected"
                    label="صرف صحى"
                    value="صرف صحى"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-checkbox
                    v-model="selected"
                    label="مياه"
                    value="مياه"
                  />
                  <v-row
                    align="center"
                  >
                    <v-col
                      v-for="(row, index) in airRows5"
                      :key="'row5'+index"
                      cols="12"
                      sm="6"
                    >
                      <label
                        class="d-block mb-3 font-weight-bold"
                      >رقم العداد</label>
                      <v-text-field
                        class="d-inline"
                        label="رقم العداد"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <label
                        class="d-block font-weight-bold"
                        @click.prevent="airRows5++"
                      >
                        <v-icon left> mdi-plus </v-icon>
                        إضافة رقم عداد جديد
                      </label>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-checkbox
                    v-model="selected"
                    label="كهرباء"
                    value="كهرباء"
                  />
                  <v-row
                    align="center"
                  >
                    <v-col
                      v-for="(row, index) in airRows6"
                      :key="'row6'+index"
                      cols="12"
                      sm="6"
                    >
                      <label
                        class="d-block mb-3 font-weight-bold"
                      >رقم العداد</label>
                      <v-text-field
                        class="d-inline"
                        label="رقم العداد"
                        single-line
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <label
                        class="d-block font-weight-bold"
                        @click.prevent="airRows6++"
                      >
                        <v-icon left> mdi-plus </v-icon>
                        إضافة رقم عداد جديد
                      </label>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-10" />

            <div>
              <h2>المحيط المؤثر للعقار</h2>
              <v-row>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >جامع</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مرفق طبى</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مرفق أمنى</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >سوق تجارى</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >حديقة</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مرفق تعليمى</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >مقر حكومى</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >طريق سريع</label>
                  <v-text-field
                    label="تفاصيل"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  lg="1"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >يبعد</label>
                  <v-text-field
                    label="100 م"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>أسلوب او طريقة التقييم المستخدمة</h2>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-checkbox
                    v-model="evaluateType"
                    label="أسلوب السوق"
                    value="evaluateType1"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-checkbox
                    v-model="evaluateType"
                    label="أسلوب الدخل"
                    value="evaluateType2"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-checkbox
                    v-model="evaluateType"
                    label="أسلوب التكلفة (المقاول)"
                    value="evaluateType3"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-checkbox
                    v-model="evaluateType"
                    label="طريقة البيوع المقارنة"
                    value="evaluateType1"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-checkbox
                    v-model="evaluateType"
                    label="طريقة الاستثمار رسملة الدخل"
                    value="evaluateType2"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-checkbox
                    v-model="evaluateType"
                    label="طريقة التكلفة المقاول"
                    value="evaluateType3"
                  />
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-10" />
            <div v-show="evaluateType.includes('evaluateType1')">
              <div>
                <h2>العقارات المقارنة</h2>
                <div class="table-responsive">
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>
                              #
                            </th>
                            <th>
                              نوع العقار
                            </th>
                            <th>
                              المساحة
                            </th>
                            <th>
                              نوع العملية
                            </th>
                            <th>
                              تاريخ العملية
                            </th>
                            <th>
                              السعر
                            </th>
                            <th>
                              التواصل
                            </th>
                            <th>
                              خط العرض
                            </th>
                            <th>
                              خط الطول
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <label class="v-label theme--light">المقارن 1</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_type"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_space"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-select
                                v-model="data.cm_operation_type"
                                class="mt-3"
                                :items="items"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.operation_date"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_price"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                              />
                              <!-- <v-text-field
                                type="number"
                                :value="data.cm_price | money"
                                class="mt-3"
                                single-line
                                outlined
                                @input="value => data.cm_price = value"
                              /> -->
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_mobile_number"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_latitude"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_longitude"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">المقارن 2</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_type_2"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_space_2"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-select
                                v-model="data.cm_operation_type_2"
                                class="mt-3"
                                :items="items"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.operation_date_2"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_price_2"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_mobile_number_2"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_latitude_2"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_longitude_2"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">المقارن 3</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_type_3"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_space_3"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-select
                                v-model="data.cm_operation_type_3"
                                class="mt-3"
                                :items="items"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.operation_date_3"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_price_3"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_mobile_number_3"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_latitude_3"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_longitude_3"
                                class="mt-3"
                                single-line
                                outlined
                              />
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </div>
              </div>
              <v-divider class="my-10" />
              <div>
                <!-- <h2>نوع التسوية</h2>
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    lg="4"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >اختيار نوع التسوية</label>
                    <v-select
                      :items="items"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row> -->
                <h2>جدول التسويات</h2>
                <div class="table-responsive">
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>
                              عناصر المقارنة
                            </th>
                            <th>
                              المقارن 1
                            </th>
                            <th>
                              المقارن 2
                            </th>
                            <th>
                              المقارن 3
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسوية عامل الوقت</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_time_factor_adjustment"
                                :disabled="!data.cm_price"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_time_factor_adjustment_2"
                                :disabled="!data.cm_price_2"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_time_factor_adjustment_3"
                                :disabled="!data.cm_price_3"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسوية شروط التمويل</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_settlement_financing_terms"
                                :disabled="!data.cm_price"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_settlement_financing_terms_2"
                                :disabled="!data.cm_price_2"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_settlement_financing_terms_3"
                                :disabled="!data.cm_price_3"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسوية ظروف السوق</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_settling_market_conditions"
                                :disabled="!data.cm_price"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_settling_market_conditions_2"
                                :disabled="!data.cm_price_2"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_settling_market_conditions_3"
                                :disabled="!data.cm_price_3"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light font-weight-bold">إجمالى</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_total_funding_market_adjustments"
                                disabled=""
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_total_funding_market_adjustments_2"
                                disabled=""
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_total_funding_market_adjustments_3"
                                disabled=""
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">سعر البيع بعد تسوية شروط التمويل وظروف السوق</label>
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_price_after_settling_financing_terms"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                              <!-- <v-text-field
                                disabled=""
                                :value="data.cm_price_after_settling_financing_terms | money"
                                class="mt-3"
                                single-line
                                outlined
                                @input="value => data.cm_price_after_settling_financing_terms = value"
                              /> -->
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_price_after_settling_financing_terms2"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                              <!-- <v-text-field
                                :value="data.cm_price_after_settling_financing_terms_2 | money"
                                disabled=""
                                class="mt-3"
                                single-line
                                outlined
                              /> -->
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_price_after_settling_financing_terms3"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                              <!-- <v-text-field
                                :value="data.cm_price_after_settling_financing_terms_3 | money"
                                disabled=""
                                class="mt-3"
                                single-line
                                outlined
                              /> -->
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسوية المساحة</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_space_settlement"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_space_settlement2"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_space_settlement3"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسويات أخرى</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_other_settlement"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_other_settlement2"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_other_settlement3"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">مجموع نسب التسويات</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_total_settlement"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                                disabled
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_total_settlement2"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                                disabled
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_total_settlement3"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">سعر البيع بعد التسويات</label>
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_selling_p_a_settlement"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_selling_p_a_settlement2"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_selling_p_a_settlement3"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">الأوزان النسبية للعقارات المقارنة</label>
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_relative_w_comparable_p"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_relative_w_comparable_p2"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="data.cm_relative_w_comparable_p3"
                                class="mt-3"
                                single-line
                                outlined
                                type="number"
                                suffix="%"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light">مساهمة العقارات المقارنة حسب الوزن النسبى</label>
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_contribution_comparative_p_relative_weight"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_contribution_comparative_p_relative_weight2"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                            </td>
                            <td>
                              <vuetify-money
                                v-model="data.cm_contribution_comparative_p_relative_weight3"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label class="v-label theme--light font-weight-bold">القيمة السوقية بطريقة البيوع المقارنة</label>
                            </td>
                            <td colspan="3">
                              <vuetify-money
                                v-model="data.cm_market_v_comparative_sales_method"
                                outlined
                                single-line
                                class="mt-3"
                                :options="moneyInputOptions"
                                disabled
                              />
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </div>
              </div>
            </div>
            <div v-show="evaluateType.includes('evaluateType2')">
              <v-divider class="my-10" />
              <div>
                <h2>تقييم الايجارات</h2>
                <div
                  id="income_valuation"
                  class="table-responsive"
                >
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>
                              البيان
                            </th>
                            <th>
                              عدد الوحدات
                            </th>
                            <th>
                              ايجار الوحدة
                            </th>
                            <th>
                              مجموع الايجارات
                            </th>
                            <th>
                              خسائر عدم الاشغال والتحصيل للوحدة
                            </th>
                            <th>
                              اجمالي خسائر عدم الاشغال والتحصيل
                            </th>
                            <th>
                              اجمالي الدخل الفعلي
                            </th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item) in data.income_valuation"
                            :key="item.id"
                          >
                            <td>
                              <v-text-field
                                v-model="item.unit_name"
                                label="اسم البيان"
                                single-line
                                outlined
                                hide-details=""
                              />
                            </td>
                            <td>
                              <v-text-field
                                v-model="item.unit_number"
                                label="عدد الوحدات"
                                single-line
                                outlined
                                hide-details=""
                                type="number"
                                @input="updateTotalRent(item.id)"
                              />
                            </td>
                            <td>
                              <!-- <v-text-field
                                v-model="item.unit_rent"
                                label="إيجار الوحدة"
                                single-line
                                outlined
                                hide-details=""
                                @input="updateTotalRent(item.id)"
                              /> -->
                              <vuetify-money
                                v-model="item.unit_rent"
                                outlined
                                single-line
                                :options="moneyInputOptions"
                                hide-details
                                @input="updateTotalRent(item.id)"
                              />
                            </td>
                            <td>
                              <!-- <v-text-field
                                v-model="item.total_rent"
                                label="مجموع الإيجارات"
                                single-line
                                outlined
                                hide-details=""
                                disabled
                              /> -->
                              <vuetify-money
                                v-model="item.total_rent"
                                outlined
                                single-line
                                :options="moneyInputOptions"
                                hide-details
                                disabled
                              />
                            </td>
                            <td>
                              <!-- <v-text-field
                                v-model="item.total_rent"
                                label="مجموع الإيجارات"
                                single-line
                                outlined
                                hide-details=""
                                disabled
                              /> -->
                              <vuetify-money
                                v-model="item.deduction_losses"
                                outlined
                                single-line
                                :options="moneyInputOptions"
                                hide-details
                                @input="updateTotalRent(item.id)"
                              />
                            </td>
                            <td>
                              <!-- <v-text-field
                                v-model="item.total_rent"
                                label="مجموع الإيجارات"
                                single-line
                                outlined
                                hide-details=""
                                disabled
                              /> -->
                              <vuetify-money
                                v-model="item.deduction_losses_total"
                                outlined
                                single-line
                                :options="moneyInputOptions"
                                hide-details
                                disabled
                              />
                            </td>
                            <td>
                              <!-- <v-text-field
                                v-model="item.total_rent"
                                label="مجموع الإيجارات"
                                single-line
                                outlined
                                hide-details=""
                                disabled
                              /> -->
                              <vuetify-money
                                v-model="item.final_income"
                                outlined
                                single-line
                                :options="moneyInputOptions"
                                hide-details
                                disabled
                              />
                            </td>
                            <td>
                              <v-btn
                                color="red"
                                :disabled="data.income_valuation.length === 1"
                                @click="removeItemFromIncomeValuation(item.id)"
                              >
                                <v-icon>
                                  fas fa-trash-alt
                                </v-icon>
                              </v-btn>
                            </td>
                          </tr>
                          <tr>
                            <v-btn
                              color="blue"
                              class="mx-5 my-3"
                              @click="data.income_valuation.push({id: $uuid.v4()})"
                            >
                              +
                            </v-btn>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </div>
                <!-- <v-row>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >اسم الوحدة</label>
                    <v-text-field
                      v-model="data.unit_name"
                      label="اسم الوحدة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >عدد الوحدة</label>
                    <v-text-field
                      v-model="data.unit_number"
                      label="عدد الوحدة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >ايجار الوحدات</label>
                    <v-text-field
                      v-model="data.rent_units"
                      label="ايجار الوحدات"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >شغائر الصيانة</label>
                    <v-text-field
                      v-model="data.shaghayir_maintenance"
                      label="شغائر الصيانة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >مجموع الايجارات</label>
                    <v-text-field
                      v-model="data.total_rent"
                      label="مجموع الايجارات"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >صافى الدخل</label>
                    <v-text-field
                      v-model="data.net_income"
                      label="صافى الدخل"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >اسم الوحدة</label>
                    <v-text-field
                      v-model="data.unit_name2"
                      label="اسم الوحدة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >عدد الوحدة</label>
                    <v-text-field
                      v-model="data.unit_number2"
                      label="عدد الوحدة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >ايجار الوحدات</label>
                    <v-text-field
                      v-model="data.rent_units2"
                      label="ايجار الوحدات"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >شغائر الصيانة</label>
                    <v-text-field
                      v-model="data.shaghayir_maintenance2"
                      label="شغائر الصيانة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >مجموع الايجارات</label>
                    <v-text-field
                      v-model="data.total_rent2"
                      label="مجموع الايجارات"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >صافى الدخل</label>
                    <v-text-field
                      v-model="data.net_income2"
                      label="صافى الدخل"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >اسم الوحدة</label>
                    <v-text-field
                      v-model="data.unit_name3"
                      label="اسم الوحدة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >عدد الوحدة</label>
                    <v-text-field
                      v-model="data.unit_number3"
                      label="عدد الوحدة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >ايجار الوحدات</label>
                    <v-text-field
                      v-model="data.rent_units3"
                      label="ايجار الوحدات"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >شغائر الصيانة</label>
                    <v-text-field
                      v-model="data.shaghayir_maintenance3"
                      label="شغائر الصيانة"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >مجموع الايجارات</label>
                    <v-text-field
                      v-model="data.total_rent3"
                      label="مجموع الايجارات"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="2"
                    md="3"
                    sm="6"
                  >
                    <label
                      class="d-block mb-3 font-weight-bold"
                    >صافى الدخل</label>
                    <v-text-field
                      v-model="data.net_income3"
                      label="صافى الدخل"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row> -->
              </div>
              <v-divider class="my-10" />
              <div>
                <h2>رسملة الدخل</h2>
                <v-row>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold">إجمالى الدخل السنوى</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <vuetify-money
                      v-model="data.total_annual_income"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold">خصم خسائر عدم الإشغال والتحصيل</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <!-- <v-text-field
                      v-model="data.deduction_losses"
                      single-line
                      outlined
                    /> -->
                    <vuetify-money
                      v-model="data.deduction_losses"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold">إجمالى الدخل الفعلى</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <vuetify-money
                      v-model="data.total_actual_income"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                    <!-- <v-text-field
                      v-model="data.total_actual_income"
                      single-line
                      outlined
                    /> -->
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold">ناقصا النفقات التشغيلية والرأسمالية</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <vuetify-money
                      v-model="data.m_operating_c_expenditures"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                    />
                    <!-- <v-text-field
                      v-model="data.m_operating_c_expenditures"
                      single-line
                      outlined
                    /> -->
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold">صافى الدخل التشغيلي</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <!-- <v-text-field
                      v-model="data.net_operating_income"
                      single-line
                      outlined
                    /> -->
                    <vuetify-money
                      v-model="data.net_operating_income"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold">معدل الرسملة (أ) عامل شراء السنوات</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <vuetify-money
                      v-model="data.capitalization_rate"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                    />
                    <!-- <v-text-field
                      v-model="data.capitalization_rate"
                      single-line
                      outlined
                    /> -->
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold text-danger">القيمة السوقية باستخدام طريقة رسملة الدخل</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <!-- <v-text-field
                      v-model="data.market_v_income_c_method"
                      single-line
                      outlined
                    /> -->
                    <vuetify-money
                      v-model="data.market_v_income_c_method"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
              </div>
            </div>
            <div v-show="evaluateType.includes('evaluateType3')">
              <div>
                <h2>تقييم الأرض والمبانى</h2>
                <v-row align="center">
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">الأرض</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المساحة</label>
                    <v-text-field
                      v-model="data.cm_land_space"
                      value="153"
                      single-line
                      outlined
                      type="number"
                      @input="setMultiOfSpaceAndPrice('land')"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                    <vuetify-money
                      v-model="data.cm_land_price"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setMultiOfSpaceAndPrice('land');getSpacePriceAverage()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المجموع</label>
                    <vuetify-money
                      v-model="data.cm_land_s_p_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row
                  class="mt-0"
                  align="baseline"
                >
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">المبانى</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <v-text-field
                      v-model="data.cm_building_space"
                      value="153"
                      single-line
                      outlined
                      type="number"
                      @input="setMultiOfSpaceAndPrice('building');getTotalSpace()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_building_price"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setMultiOfSpaceAndPrice('building');getSpacePriceAverage()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_building_s_p_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row
                  class="mt-0"
                  align="baseline"
                >
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">القبو</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <v-text-field
                      v-model="data.cm_basement_space"
                      value="153"
                      single-line
                      outlined
                      type="number"
                      @input="setMultiOfSpaceAndPrice('basement');getTotalSpace()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_basement_price"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setMultiOfSpaceAndPrice('basement');getSpacePriceAverage()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_basement_s_p_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row
                  class="mt-0"
                  align="baseline"
                >
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">الملاحق</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <v-text-field
                      v-model="data.cm_supplement_space"
                      single-line
                      outlined
                      type="number"
                      @input="setMultiOfSpaceAndPrice('supplement');getTotalSpace()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_supplement_price"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setMultiOfSpaceAndPrice('supplement');getSpacePriceAverage()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_supplement_s_p_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row
                  class="mt-0"
                  align="baseline"
                >
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">الأسوار</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <v-text-field
                      v-model="data.cm_fences_space"
                      type="number"
                      single-line
                      outlined
                      @input="setMultiOfSpaceAndPrice('fences');getTotalSpace()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_fences_price"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setMultiOfSpaceAndPrice('fences');getSpacePriceAverage()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_fences_s_p_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row
                  class="mt-0"
                  align="baseline"
                >
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">أخرى</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <v-text-field
                      v-model="data.cm_other_space"
                      type="number"
                      single-line
                      outlined
                      @input="setMultiOfSpaceAndPrice('other');getTotalSpace()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_other_price"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setMultiOfSpaceAndPrice('other');getSpacePriceAverage()"
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_other_s_p_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row
                  class="mt-4"
                  align="baseline"
                >
                  <v-col
                    cols="3"
                  >
                    <!-- <label class="v-label theme--light font-weight-bold">المجموع</label> -->
                  </v-col>
                  <!-- <v-col
                    cols="9"
                  >
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col> -->
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="v-label d-block mb-3 theme--light">اجمالي المساحات
                      (باستثناء الأرض والاسوار)</label>
                    <v-text-field
                      v-model="data.cm_space_total"
                      type="number"
                      single-line
                      outlined
                      disabled
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="v-label d-block mb-3 theme--light">متوسط سعر المتر</label>
                    <vuetify-money
                      v-model="data.cm_space_price_average"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="v-label d-block mb-3 theme--light">الإجمالي</label>
                    <vuetify-money
                      v-model="data.cm_method_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
              </div>
              <v-divider class="my-10" />
              <div>
                <h2>طريقة التكلفة</h2>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">قيمة الاستبدال</label>
                  </v-col>
                  <v-col
                    cols="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">القيمة</label>
                    <vuetify-money
                      v-model="data.cm_exchange_value"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setCostTotal()"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
                    <v-text-field
                      v-model="data.cm_exchange_note"
                      label="لا يوجد"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">التكاليف المباشرة</label>
                  </v-col>
                  <v-col
                    cols="6"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_direct_costs"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setCostTotal()"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="data.cm_direct_costs_note"
                      label="لا يوجد"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">التكاليف الغير المباشرة</label>
                  </v-col>
                  <v-col
                    cols="6"
                    md="3"
                  >
                    <vuetify-money
                      v-model="data.cm_indirect_costs"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      @input="setCostTotal()"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="data.cm_indirect_costs_note"
                      label="لا يوجد"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <label class="v-label theme--light font-weight-bold">الإجمالي</label>
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <vuetify-money
                      v-model="data.cm_cost_total"
                      outlined
                      single-line
                      :options="moneyInputOptions"
                      disabled
                    />
                  </v-col>
                </v-row>
              </div>
              <v-divider class="my-10" />
              <h2>ناقصا الإهلاك</h2>
              <div class="table-responsive">
                <template>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>
                            البيان
                          </th>
                          <th>
                            النسبة
                          </th>
                          <th>
                            قيمة الإهلاك
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <label class="v-label theme--light">التدهور المادى</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.cm_physical_deterioration_ratio"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                              @input="setDepreciationValueAndTotal('physical_deterioration')"
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.cm_physical_deterioration_value"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                              class="mt-3"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">التقادم الوظيفى</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.cm_occupational_limitations_ratio"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                              @input="setDepreciationValueAndTotal('occupational_limitations')"
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.cm_occupational_limitations_value"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                              class="mt-3"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">التقادم الاقتصادى</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.cm_economic_obsolescence_ratio"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                              @input="setDepreciationValueAndTotal('economic_obsolescence')"
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.cm_economic_obsolescence_value"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                              class="mt-3"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">إجمالى الإهلاك</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.cm_total_depreciation_ratio"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                              disabled
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.cm_total_depreciation_value"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                              class="mt-3"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">إهلاك المبانى</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.cm_depreciation_buildings_ratio"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                              @input="setDepreciationValue('depreciation_buildings')"
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.cm_depreciation_buildings_value"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                              class="mt-3"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">إهلاك أعمال الموقع</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.cm_depreciation_s_business_ratio"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                              @input="setDepreciationValue('depreciation_s_business')"
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.cm_depreciation_s_business_value"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                              class="mt-3"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">أرباح المطور</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.cm_developer_earnings_ratio"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                              @input="setDepreciationValue('developer_earnings')"
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.cm_developer_earnings_value"
                              class="mt-3"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light text-danger font-weight-bold">القيمة السوقية بأسلوب التكلفة</label>
                          </td>
                          <td colspan="2">
                            <vuetify-money
                              v-model="data.cm_total_market_value"
                              class="mt-3"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </div>
            </div>

            <v-divider class="my-10" />
            <div>
              <h2>الترجيح</h2>
              <div class="table-responsive">
                <template>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>
                            البيان
                          </th>
                          <th>
                            القيمة السوقية بطريقة البيوع المقارنة
                          </th>
                          <th>
                            القيمة السوقية بطريقة رسملة الدخل
                          </th>
                          <th>
                            القيمة السوقية بطريقة التكلفة
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <label class="v-label theme--light">الأوزان النسبية للطرق المستخدمة %</label>
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.weights_market_value_relative_weights_roads_used"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                            />
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.weights_market_value_income_capitalization"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                            />
                          </td>
                          <td>
                            <v-text-field
                              v-model="data.weights_market_value_cost"
                              class="mt-3"
                              single-line
                              outlined
                              type="number"
                              suffix="%"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">مساهمة الطرق المستخدمة حسب الوزن النسبى</label>
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.relative_market_value_relative_weights_roads_used"
                              class="mt-3"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.relative_market_value_income_capitalization"
                              class="mt-3"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                            />
                          </td>
                          <td>
                            <vuetify-money
                              v-model="data.relative_market_value_cost"
                              class="mt-3"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">القيمة السوقية بعد الترجيح رقماً</label>
                          </td>
                          <td colspan="3">
                            <vuetify-money
                              v-model="data.market_value_weighting_number"
                              class="mt-3"
                              outlined
                              single-line
                              :options="moneyInputOptions"
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">القيمة السوقية بعد الترجيح كتابة</label>
                          </td>
                          <td colspan="3">
                            <v-text-field
                              v-model="data.market_value_weighting_text"
                              class="mt-3"
                              single-line
                              outlined
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </div>
            </div>

            <v-divider class="my-10" />
            <div>
              <h2>المشاركون فى إعداد التقرير</h2>
              <div
                v-for="(participant, index) in participants"
                :key="'participant' + index"
              >
                <v-row
                  v-if="participant.participant"
                  align="center"
                >
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">الاسم</label>
                    <v-text-field
                      label="الاسم"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المسمى الوظيفى</label>
                    <v-text-field
                      label="المسمى الوظيفى"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">فئة العضوية</label>
                    <v-text-field
                      label="فئة العضوية"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">رقم العضوية</label>
                    <v-text-field
                      label="رقم العضوية"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-btn
                    x-large
                    class="ma-2 blue-darken-btn"
                  >
                    <v-icon left>
                      far fa-eye-slash
                    </v-icon>
                    اخفاء
                  </v-btn>
                  <v-btn
                    x-large
                    class="ma-2 error"
                    @click.prevent="removeParticipant(participant)"
                  >
                    <v-icon left>
                      fas fa-trash-alt
                    </v-icon>
                    حذف
                  </v-btn>
                </v-row>
              </div>
              <v-row
                class="mt-3"
              >
                <v-btn
                  x-large
                  class="ma-2 orange-btn"
                  @click.prevent="addParticipant()"
                >
                  <v-icon left>
                    fas fa-plus
                  </v-icon>
                  اضافة مشارك جديد
                </v-btn>
              </v-row>
            </div>
            <v-divider class="my-10" />
            <div>
              <h2>الصور الفوتوغرافية</h2>
              <!-- {{ images }} -->
              <!-- <v-row> -->
              <draggable
                v-model="images"
              >
                <transition-group
                  tag="div"
                  class="images-draggable-container"
                  name="grid"
                  type="transition"
                >
                  <div
                    v-for="(image,index) in images"
                    :key="image.id"
                    class="upload-img-container"
                  >
                    <div>
                      <img
                        :src="image.image"
                        :class="{'hidden-img': image.hidden}"
                      >
                      <button
                        class="remove-img"
                        @click.prevent="removeImage(image,index)"
                      >
                        <v-icon left>
                          fas fa-trash-alt
                        </v-icon>
                      </button>
                      <button
                        class="hide-img"
                        @click.prevent="hideImage(image , index)"
                      >
                        <v-icon
                          v-if="!image.hidden"
                          left
                        >
                          far fa-eye
                        </v-icon>
                        <v-icon
                          v-else
                          left
                        >
                          far fa-eye-slash
                        </v-icon>
                      </button>
                      <input
                        :value="index + 1"
                        type="text"
                        class="img-num text-center"
                      >
                    </div>

                  <!-- <i
                        :class="
                          element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
                        "
                        aria-hidden="true"
                        @click="element.fixed = !element.fixed"
                      />
                      hi -->
                  </div>
                </transition-group>
                <!-- <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <div>
                    <input
                      type="file"
                      @change="onFileChange(image, $event)"
                    >
                    <v-icon left>
                      far fa-image
                    </v-icon>
                  </div>
                </v-col> -->
              </draggable>
              <div
                id="upload-input-container"
                slot="footer"
                key="footer"
                class="col-sm-6 col-md-3 col-12"
              >
                <div>
                  <input
                    type="file"
                    @change="onFileChange($event)"
                  >
                  <v-icon left>
                    far fa-image
                  </v-icon>
                </div>
              </div>
              <!-- <v-col
                  v-for="(image,index) in images"
                  :key="'image'+index"
                  class="upload-img-container"
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <div
                    v-if="!image.image"
                  >
                    <input
                      type="file"
                      @change="onFileChange(image, $event)"
                    >
                    <v-icon left>
                      far fa-image
                    </v-icon>
                  </div>
                  <div v-else>
                    <img
                      :src="image.image"
                      :class="{'hidden-img': image.hidden}"
                    >
                    <button
                      class="remove-img"
                      @click.prevent="removeImage(image,index)"
                    >
                      <v-icon left>
                        fas fa-trash-alt
                      </v-icon>
                    </button>
                    <button
                      class="hide-img"
                      @click.prevent="image.hidden = !image.hidden"
                    >
                      <v-icon
                        v-if="!image.hidden"
                        left
                      >
                        far fa-eye
                      </v-icon>
                      <v-icon
                        v-else
                        left
                      >
                        far fa-eye-slash
                      </v-icon>
                    </button>
                    <input
                      v-model="imageSorting[index]"
                      type="text"
                      class="img-num"
                    >
                  </div>
                </v-col>
              </v-row> -->
            </div>
            <v-divider class="my-10" />
            <div>
              <h2>بيانات اضافية</h2>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  sm="4"
                >
                  <label class="v-label theme--light font-weight-bold">ملاحظات داخلية</label>
                </v-col>
                <v-col
                  cols="12"
                  lg="9"
                  sm="8"
                >
                  <v-text-field
                    label="ملاحظات داخلية"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  sm="4"
                >
                  <label class="v-label theme--light font-weight-bold">عملة التقييم</label>
                </v-col>
                <v-col
                  cols="12"
                  lg="9"
                  sm="8"
                >
                  <v-select
                    :items="items"
                    label="عملة التقييم"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  sm="4"
                >
                  <label class="v-label theme--light font-weight-bold">المعايير المهنية</label>
                </v-col>
                <v-col
                  cols="12"
                  lg="9"
                  sm="8"
                >
                  <v-textarea
                    v-model="ProfessionalStandards"
                    label="المعايير المهنية"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  sm="4"
                >
                  <label class="v-label theme--light font-weight-bold">اقرار بالاستقلالية وعدم تضارب المصالح</label>
                </v-col>
                <v-col
                  cols="12"
                  lg="9"
                  sm="8"
                >
                  <v-textarea
                    v-model="AcknowledgmentOfIndependence"
                    label="اقرار بالاستقلالية وعدم تضارب المصالح"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  sm="4"
                >
                  <label class="v-label theme--light font-weight-bold">القيود على الاستخدام والنشر</label>
                </v-col>
                <v-col
                  cols="12"
                  lg="9"
                  sm="8"
                >
                  <v-textarea
                    v-model="RestrictionsUsePublication"
                    label="القيود على الاستخدام والنشر"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  sm="4"
                >
                  <label class="v-label theme--light font-weight-bold">اخلاء المسئولية</label>
                </v-col>
                <v-col
                  cols="12"
                  lg="9"
                  sm="8"
                >
                  <v-textarea
                    v-model="EvacuationResponsibilaty"
                    label="اخلاء المسئولية"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  sm="4"
                >
                  <label class="v-label theme--light font-weight-bold">الافتراضات والافتراضات الخاصة ان وجدت</label>
                </v-col>
                <v-col
                  cols="12"
                  lg="9"
                  sm="8"
                >
                  <v-textarea
                    v-model="Assumptions"
                    label="الافتراضات الخاصة ان وجدت"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-10" />

            <v-row
              class="mb-10"
              align="center"
              justify="space-between"
            >
              <div>
                <v-btn
                  x-large
                  class="ma-2 orange-btn"
                  @click.prevent="participants++"
                >
                  <v-icon left>
                    fas fa-redo
                  </v-icon>
                  اعادة الى المرحلة السابقة
                </v-btn>
                <v-btn
                  x-large
                  class="ma-2"
                  color="blue"
                >
                  <v-icon left>
                    fas fa-save
                  </v-icon>
                  حفظ
                </v-btn>
                <v-btn
                  x-large
                  class="ma-2"
                  outlined
                  color="blue"
                >
                  <v-icon left>
                    far fa-paper-plane
                  </v-icon>
                  إرسال
                </v-btn>
                <v-btn
                  x-large
                  class="ma-2 light-green-btn"
                  outlined
                >
                  <v-icon left>
                    far fa-check-circle
                  </v-icon>
                  اعتماد
                </v-btn>
              </div>
              <div>
                <v-btn
                  x-large
                  class="ma-2"
                  color="black"
                >
                  تعليق
                </v-btn>
                <v-btn
                  x-large
                  class="ma-2"
                  color="error"
                >
                  الغاء
                </v-btn>
              </div>
            </v-row>
          </form>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  /* eslint-disable vue/valid-v-model */
  import Swal from 'sweetalert2'
  import { copyText } from 'vue3-clipboard'
  import { Loader } from '@googlemaps/js-api-loader'
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import staticLists from './staticData.json'
  import { uuid } from 'vue-uuid'
  import NumbersToWords from 'tafgeetjs'
  import draggable from 'vuedraggable'
  const loader = new Loader('AIzaSyACo4RXxzSABqvI3S_Q3_nQ2YIW4HfJuXI')
  const CustomersService = ServiceFactory.get('Customers')
  const EvaluationPurposeService = ServiceFactory.get('EvaluationPurpose')
  // ! TODO : change this later
  const UsersServices = ServiceFactory.get('Users')

  // const watchUs = (array, f) => {
  //   const result = {}
  //   array.forEach(item => {
  //     result[item] = function () {
  //       // eslint-disable-next-line no-new-func
  //       f(...f.arguments)
  //     }
  //   })

  //   return result
  // }

  export default {
    name: 'EvaluateTreatment',
    display: 'Transitions',
    order: 7,
    components: {
      draggable,
    },
    filters: {
      money: function (value) {
        if (!value) {
          return ''
        }
        return (+value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        // eslint-disable-next-line no-new
        // const formater = new Intl.NumberFormat('en-US', {
        //   style: 'currency',
        //   currency: 'SAR',
        // })

        // return formater.format(value)
      },
    },
    data: () => ({
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      staticLists: { ...staticLists },
      customersList: [],
      evaluationPurposeList: [],
      appraisersList: [],
      previewsList: [],
      coordinatorsList: [],
      regionsList: [],
      citesList: [],
      neighborhoodsList: [],
      appraisalFeesList: [],
      appraisalValueList: [],
      valuesUsedList: [
        {
          id: 'القيمة السوقية',
          name: 'القيمة السوقية',
        },
        {
          id: 'الإيجار السوقي',
          name: 'الإيجار السوقي',
        },
        {
          id: 'القيمة المنصفة',
          name: 'القيمة المنصفة',
        },
        {
          id: 'القيمة الاستثمارية',
          name: 'القيمة الاستثمارية',
        },
        {
          id: 'القيمة التكاملية',
          name: 'القيمة التكاملية',
        },
        {
          id: 'قيمة التصفية',
          name: 'قيمة التصفية',
        },
        {
          id: 'القيمة العادلة',
          name: 'القيمة العادلة',
        },
        {
          id: 'القيمة السوقية العادلة',
          name: 'القيمة السوقية العادلة',
        },
        {
          id: 'أخرى',
          name: 'أخرى',
        },
      ],
      feesUsedValuesList: [
        {
          id: 'الاستخدام الأعلى والأفضل',
          name: 'الاستخدام الأعلى والأفضل',
        },
        {
          id: 'الاستخدام الحالي',
          name: 'الاستخدام الحالي',
        },
        {
          id: 'التصفية المنظمة',
          name: 'التصفية المنظمة',
        },
        {
          id: 'البيع القسري',
          name: 'البيع القسري',
        },
      ],
      propTypeList: [
        {
          id: 'فيلا سكنية',
          name: 'فيلا سكنية',
        },
        {
          id: 'فيلا',
          name: 'فيلا',
        },
        {
          id: 'أرض',
          name: 'أرض',
        },
        {
          id: 'برج مكتبي',
          name: 'برج مكتبي',
        },
        {
          id: 'برج',
          name: 'برج',
        },
        {
          id: 'عماره',
          name: 'عماره',
        },
        {
          id: 'معارض',
          name: 'معارض',
        },
        {
          id: 'مواقف + مستودعات',
          name: 'مواقف + مستودعات',
        },
        {
          id: 'مستودعات',
          name: 'مستودعات',
        },
        {
          id: 'ورشة',
          name: 'ورشة',
        },
        {
          id: 'محلات',
          name: 'محلات',
        },
        {
          id: 'عمائر',
          name: 'عمائر',
        },
        {
          id: 'مبنى أرض مقهى',
          name: 'مبنى أرض مقهى',
        },
        {
          id: 'فلل',
          name: 'فلل',
        },
        {
          id: 'مدرسة',
          name: 'مدرسة',
        },
        {
          id: 'منجرة',
          name: 'منجرة',
        },
        {
          id: 'مركز تجاري',
          name: 'مركز تجاري',
        },
        {
          id: 'عدد 4 قطع أراضي فضاء',
          name: 'عدد 4 قطع أراضي فضاء',
        },
        {
          id: 'أرض فضاء',
          name: 'أرض فضاء',
        },
        {
          id: 'حوش',
          name: 'حوش',
        },
        {
          id: 'بيت شعبي',
          name: 'بيت شعبي',
        },
        {
          id: 'إستراحة',
          name: 'إستراحة',
        },
        {
          id: 'قصر',
          name: 'قصر',
        },
        {
          id: 'مرفق تعليمي',
          name: 'مرفق تعليمي',
        },
        {
          id: 'مخطط سكني تجاري',
          name: 'مخطط سكني تجاري',
        },
        {
          id: 'مصنع',
          name: 'مصنع',
        },
        {
          id: 'مجمع تجاري مكتبي',
          name: 'مجمع تجاري مكتبي',
        },
        {
          id: 'أرض وبناء',
          name: 'أرض وبناء',
        },
        {
          id: 'عمارة مكتبية',
          name: 'عمارة مكتبية',
        },
        {
          id: 'أرض مقام عليها مصنع خرسانه',
          name: 'أرض مقام عليها مصنع خرسانه',
        },
        {
          id: 'مبنى اداري',
          name: 'مبنى اداري',
        },
        {
          id: 'محطة',
          name: 'محطة',
        },
        {
          id: 'أرض وبناء',
          name: 'أرض وبناء',
        },
        {
          id: 'عمارتين سكني تجاري',
          name: 'عمارتين سكني تجاري',
        },
        {
          id: 'ارض صناعي',
          name: 'ارض صناعي',
        },
        {
          id: 'عمارة سكنية',
          name: 'عمارة سكنية',
        },
        {
          id: 'سكن عمال',
          name: 'سكن عمال',
        },
        {
          id: 'شقة',
          name: 'شقة',
        },
        {
          id: 'عمارة تجاري',
          name: 'عمارة تجاري',
        },
        {
          id: 'أرض خام',
          name: 'أرض خام',
        },
        {
          id: 'تعليمي',
          name: 'تعليمي',
        },
        {
          id: 'أرض مقام عليها فيلا',
          name: 'أرض مقام عليها فيلا',
        },
        {
          id: 'ارض مقام عليها اساسات',
          name: 'ارض مقام عليها اساسات',
        },
        {
          id: 'مــزرعــــة',
          name: 'مــزرعــــة',
        },
        {
          id: 'ارض مقام عليها اساسات',
          name: 'ارض مقام عليها اساسات',
        },
        {
          id: 'عمارة + فيلا',
          name: 'عمارة + فيلا',
        },
        {
          id: 'عمارة + فلتين',
          name: 'عمارة + فلتين',
        },
        {
          id: 'محطه',
          name: 'محطه',
        },
        {
          id: 'مبنى (مقر بنك ساب)',
          name: 'مبنى (مقر بنك ساب)',
        },
        {
          id: 'أرض زراعي',
          name: 'أرض زراعي',
        },
        {
          id: 'أرض مقام عليها محطة عظم',
          name: 'أرض مقام عليها محطة عظم',
        },
        {
          id: 'مجمع فلل',
          name: 'مجمع فلل',
        },
        {
          id: 'مستودع',
          name: 'مستودع',
        },
        {
          id: 'فندق الروضة',
          name: 'فندق الروضة',
        },
        {
          id: 'عمارة مكتبية ومعارض',
          name: 'عمارة مكتبية ومعارض',
        },
        {
          id: 'أرض مقام عليها مباني',
          name: 'أرض مقام عليها مباني',
        },
        {
          id: 'فندق',
          name: 'فندق',
        },
        {
          id: 'عمارة شقق مفروشة',
          name: 'عمارة شقق مفروشة',
        },
        {
          id: 'أرض مسورة',
          name: 'أرض مسورة',
        },
        {
          id: 'مستودع + مكاتب إداريه',
          name: 'مستودع + مكاتب إداريه',
        },
        {
          id: 'مجمع تجاري',
          name: 'مجمع تجاري',
        },
        {
          id: 'شاليه + ملعب',
          name: 'شاليه + ملعب',
        },
        {
          id: 'محلات + عمارة',
          name: 'محلات + عمارة',
        },
        {
          id: 'ارض مسورة بها مظلة',
          name: 'ارض مسورة بها مظلة',
        },
        {
          id: 'صالات عرض ومبنى اداري',
          name: 'صالات عرض ومبنى اداري',
        },
        {
          id: 'عمارتين + فلتين',
          name: 'عمارتين + فلتين',
        },
        {
          id: 'محل تجاري',
          name: 'محل تجاري',
        },
        {
          id: 'شاليه',
          name: 'شاليه',
        },
        {
          id: 'مطعم',
          name: 'مطعم',
        },
        {
          id: 'عمارة مكتبية',
          name: 'عمارة مكتبية',
        },
        {
          id: 'ارض زراعية',
          name: 'ارض زراعية',
        },
        {
          id: 'معرض سيارات',
          name: 'معرض سيارات',
        },
        {
          id: 'مبنى',
          name: 'مبنى',
        },
        {
          id: 'ارض مسوره',
          name: 'ارض مسوره',
        },
        {
          id: 'معرض',
          name: 'معرض',
        },
        {
          id: 'ارض تجارية',
          name: 'ارض تجارية',
        },
        {
          id: 'ارض سكنية',
          name: 'ارض سكنية',
        },
        {
          id: 'ارض مقام عليها مباني',
          name: 'ارض مقام عليها مباني',
        },
        {
          id: 'سكن عائلي',
          name: 'سكن عائلي',
        },
        {
          id: 'سكني تجاري',
          name: 'سكني تجاري',
        },
        {
          id: 'عمارة تجارية',
          name: 'عمارة تجارية',
        },
        {
          id: 'فيلا دبلكس',
          name: 'فيلا دبلكس',
        },
        {
          id: 'فيلا روف',
          name: 'فيلا روف',
        },
        {
          id: 'قصر سكني',
          name: 'قصر سكني',
        },
        {
          id: 'مجمع سكني',
          name: 'مجمع سكني',
        },
        {
          id: 'مخطط تحت التطوير',
          name: 'مخطط تحت التطوير',
        },
        {
          id: 'مقر شركة',
          name: 'مقر شركة',
        },
        {
          id: 'ملاحق أرضية',
          name: 'ملاحق أرضية',
        },
        {
          id: 'منتزه ترفيهي',
          name: 'منتزه ترفيهي',
        },
        {
          id: 'وحدة سكنية',
          name: 'وحدة سكنية',
        },
        {
          id: 'مجمع مدراس',
          name: 'مجمع مدراس',
        },
        {
          id: 'معارض تجارية',
          name: 'معارض تجارية',
        },
        {
          id: 'عمارة سكنية تجارية مكتبية (شقق مفروشة)',
          name: 'عمارة سكنية تجارية مكتبية (شقق مفروشة)',
        },
        {
          id: 'عمارة سكنية + مستودعات',
          name: 'عمارة سكنية + مستودعات',
        },
        {
          id: 'مجمع مكتبي',
          name: 'مجمع مكتبي',
        },
        {
          id: 'مجمع تجاري مكتبي سكني',
          name: 'مجمع تجاري مكتبي سكني',
        },
        {
          id: 'مخطط سكني تجاري',
          name: 'مخطط سكني تجاري',
        },
        {
          id: 'محلات+ سكن + استراحة',
          name: 'محلات+ سكن + استراحة',
        },
        {
          id: 'عمارة + محلات',
          name: 'عمارة + محلات',
        },
        {
          id: 'مكتب تجاري',
          name: 'مكتب تجاري',
        },
        {
          id: 'اختبار',
          name: 'اختبار',
        },
        {
          id: 'حسب الواقع',
          name: 'حسب الواقع',
        },
        {
          id: 'دور',
          name: 'دور',
        },
        {
          id: 'سوق تجاري',
          name: 'سوق تجاري',
        },
        {
          id: 'ستريب مول',
          name: 'ستريب مول',
        },
        {
          id: 'عمارة تجارية مكتبية',
          name: 'عمارة تجارية مكتبية',
        },
        {
          id: 'سكني تجاري وشقق مفروشة',
          name: 'سكني تجاري وشقق مفروشة',
        },
        {
          id: 'عمارة تجارية مكتبية + مستودع',
          name: 'عمارة تجارية مكتبية + مستودع',
        },
        {
          id: 'مزرعة صك رقم (213202004985)',
          name: 'مزرعة صك رقم (213202004985)',
        },
        {
          id: 'عماره + مستودعات',
          name: 'عماره + مستودعات',
        },
        {
          id: 'مزرعة صك رقم( 630801010713)',
          name: 'مزرعة صك رقم( 630801010713)',
        },
        {
          id: 'مقهى',
          name: 'مقهى',
        },
        {
          id: 'مباني فقط',
          name: 'مباني فقط',
        },
        {
          id: 'مزرعة ( الصك رقم 330114012614 )',
          name: 'مزرعة ( الصك رقم 330114012614 )',
        },
        {
          id: 'المزرعة صك رقم 371705005464',
          name: 'المزرعة صك رقم 371705005464',
        },
      ],
      propRatingsList: [
        {
          id: 'سكني',
          name: 'سكني',
        },
        {
          id: 'تجاري',
          name: 'تجاري',
        },
        {
          id: 'سكني تجاري',
          name: 'سكني تجاري',
        },
        {
          id: 'زراعي',
          name: 'زراعي',
        },
        {
          id: 'صناعي',
          name: 'صناعي',
        },
        {
          id: 'ورش',
          name: 'ورش',
        },
        {
          id: 'مستودعات',
          name: 'مستودعات',
        },
        {
          id: 'خام',
          name: 'خام',
        },
        {
          id: 'مرفق',
          name: 'مرفق',
        },
        {
          id: 'أخرى',
          name: 'أخرى',
        },
        {
          id: 'تعليمي',
          name: 'تعليمي',
        },
        {
          id: 'مكتبي',
          name: 'مكتبي',
        },
        {
          id: 'اخرى',
          name: 'اخرى',
        },
        {
          id: 'ماكولات بحرية',
          name: 'ماكولات بحرية',
        },
        {
          id: 'ترفيهي',
          name: 'ترفيهي',
        },
        {
          id: 'استثماري',
          name: 'استثماري',
        },
        {
          id: 'استراحات',
          name: 'استراحات',
        },
        {
          id: 'فضاء',
          name: 'فضاء',
        },
        {
          id: 'مناطق بحرية',
          name: 'مناطق بحرية',
        },
        {
          id: 'مجمع مكتبي',
          name: 'مجمع مكتبي',
        },
        {
          id: 'فندقي',
          name: 'فندقي',
        },
        {
          id: 'فندقي',
          name: 'فندقي',
        },
        {
          id: 'مستودعات - تجاري',
          name: 'مستودعات - تجاري',
        },
        {
          id: 'تجاري اداري',
          name: 'تجاري اداري',
        },
        {
          id: 'تجاري مكتبي',
          name: 'تجاري مكتبي',
        },
        {
          id: 'معارض سيارات',
          name: 'معارض سيارات',
        },
        {
          id: 'مرفق حكومي ( دفاع مدني )',
          name: 'مرفق حكومي ( دفاع مدني )',
        },
        {
          id: 'مركز إجتماعي',
          name: 'مركز إجتماعي',
        },
        {
          id: 'صناعية',
          name: 'صناعية',
        },
        {
          id: 'سكني تجاري مكتبي',
          name: 'سكني تجاري مكتبي',
        },
      ],
      cityName: '',
      neighborhoodName: '',
      trans_assignment_date: false,
      trans_evaluation_date: false,
      trans_inspection_date: false,
      trans_instrument_date: false,
      trans_building_permit_date: false,
      trans_retail_record_date: false,
      // مكونات العقار
      boards_show: false,
      dining_rooms_show: false,
      bed_room_show: false,
      Kitchens_show: false,
      toilets_show: false,
      jacuzzi_show: false,
      garden_show: false,
      maids_room_show: false,
      guard_Room_show: false,
      basement_show: false,
      halls_show: false,
      Supplements_show: false,
      elevators_show: false,
      parking_show: false,
      childrens_playground_show: false,
      swimming_pool_show: false,
      storehouse_show: false,
      data: {
        sample_id: '',
        customer_id: '',
        appraiser_id: 0,
        preview_id: 0,
        coordinator_id: 0,
        prop_street_name: '',
        evaluation_purpose_id: '',
        appraisal_fees: '',
        appraisal_value: '',
        region_id: 0,
        city_id: 0,
        neighborhood_id: 0,
        prop_Albulk_num: '',
        prop_apartment_num: '',
        prop_part_num: '',
        transaction_id: '',
        trans_number: '',
        instrument_file: '',
        attached_file: '',
        schema_file: '',
        assignment_letter_file: '',
        resident_id: '',
        reviewer_id: '',
        approved_id: '',
        trans_report_name: '',
        trans_report_phone: '',
        trans_value_basis: '',
        value_hypothesis: '',
        trans_assignment_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_evaluation_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_inspection_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_Report_type: '',
        trans_filing_the_report: '',
        trans_reference_number: '',
        trans_deposit_code_site_num_customer_num: '',
        trans_street_name: '',
        residential_plan_name: '',
        residential_plan_no: '',
        trans_Albulk_num: '',
        trans_part_num: '',
        trans_owner_name: '',
        trans_owner_phone: '',
        property_type_id: '',
        property_rating_id: '',
        trans_instrument_num: '',
        trans_instrument_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_building_permit_number: '',
        trans_building_permit_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_construction_age: '',
        trans_retail_record_num: '',
        trans_retail_record_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_construction_condition: '',
        trans_occupancy_status: '',
        trans_general_site: '',
        trans_the_design: '',
        trans_attributable: '',
        trans_neighbor: '',
        trans_streets: '',
        trans_Street_lighting: '',
        trans_electric_current: '',
        trans_insulation_type: '',
        trans_the_type_of_yard_floor: '',
        trans_reception_floor_type: '',
        trans_entrance_floor: '',
        trans_room_floor_type: '',
        trans_bolt_the_outer_doors: '',
        trans_wool_interior_doors: '',
        trans_structural_structure: '',
        trans_bishop_type: '',
        trans_boards: '',
        trans_dining_rooms: '',
        trans_bed_room: '',
        trans_kitchens: '',
        trans_toilets: '',
        trans_jacuzzi: '',
        trans_garden: '',
        trans_maids_room: '',
        trans_guard_Room: '',
        trans_basement: '',
        trans_halls: '',
        trans_supplements: '',
        trans_elevators: '',
        trans_parking: '',
        trans_children_playground: '',
        trans_swimming_pool: '',
        trans_storehouse: '',
        glass_walls: '',
        central_conditioning: '',
        double_glazing: '',
        plaster_on_the_ceiling: '',
        hidden_lighting: '',
        arabic_bath: '',
        stairs: '',
        electric_garage: '',
        ordinary_garage: '',
        portals: '',
        heaters: '',
        french_bath: '',
        trans_boards_status: '',
        trans_dining_rooms_status: '',
        trans_bed_room_status: '',
        trans_kitchens_status: '',
        trans_toilets_status: '',
        trans_jacuzzi_status: '',
        trans_garden_status: '',
        trans_maids_room_status: '',
        trans_guard_Room_status: '',
        trans_basement_status: '',
        trans_halls_status: '',
        trans_supplements_status: '',
        trans_elevators_status: '',
        trans_parking_status: '',
        trans_children_playground_status: '',
        trans_swimming_pool_status: '',
        trans_storehouse_status: '',
        glass_walls_status: '',
        central_conditioning_status: '',
        double_glazing_status: '',
        plaster_on_the_ceiling_status: '',
        hidden_lighting_status: '',
        arabic_bath_status: '',
        stairs_status: '',
        electric_garage_status: '',
        ordinary_garage_status: '',
        portals_status: '',
        heaters_status: '',
        french_bath_status: '',
        trans_other_component: '',
        additional_component_1: '',
        additional_component_2: '',
        additional_component_3: '',
        additional_component_4: '',
        additional_component_value_1: '',
        additional_component_value_2: '',
        additional_component_value_3: '',
        additional_component_value_4: '',
        finishing_condition: '',
        latitude: '',
        longitude: '',
        coordinate_type: 1,
        property_notes: '',
        property_condition: '',
        construction_condition: '',
        occupancy_status: '',
        northern_border: '',
        eastern_border: '',
        western_border: '',
        southern_border: '',
        tall_northern: '',
        tall_eastern: '',
        tall_western: '',
        tall_southern: '',
        north_facade: '',
        eastern_facade: '',
        western_facade: '',
        south_facade: '',
        masjid: '',
        masjid_note: '',
        masjid_distance: '',
        market: '',
        market_note: '',
        market_distance: '',
        medical_facility: '',
        medical_facility_note: '',
        medical_facility_distance: '',
        security_facility: '',
        security_facility_note: '',
        security_facility_distance: '',
        public_garden: '',
        public_garden_note: '',
        public_garden_distance: '',
        educational_facility: '',
        educational_facility_note: '',
        educational_facility_distance: '',
        government_office: '',
        government_office_note: '',
        government_office_distance: '',
        highway: '',
        highway_note: '',
        highway_distance: '',
        is_telephone: '',
        water_meter: '',
        water_meter_number: '',
        electric_meter: '',
        electric_meter_number: '',
        sanitation: '',
        resident_opinion: '',
        scope_research_sources_information: '',
        unfinished_n_maintenance: '',
        notes_shortcomings: '',
        important_notes: '',
        private_notes: '',
        reason_for_comment: '',
        recommendation: '',
        acknowledgment_independence: '',
        land_area: '',
        construction_age: '',
        basement_space: '',
        annexes_space: '',
        num_floors_residential_villas: '',
        conforms_building_permit: '',
        internal_preview: '',
        external_preview: '',
        review_note: '',
        trans_finishing_status: '',
        trans_finishing_internal: '',
        trans_finishing_external: '',
        cm_land_space: '',
        cm_land_price: '',
        cm_land_s_p_total: '',
        cm_building_space: '',
        cm_building_price: '',
        cm_building_s_p_total: '',
        cm_basement_space: '',
        cm_basement_price: '',
        cm_basement_s_p_total: '',
        cm_supplement_space: '',
        cm_supplement_price: '',
        cm_supplement_s_p_total: '',
        cm_fences_space: '',
        cm_fences_price: '',
        cm_fences_s_p_total: '',
        cm_other_title: '',
        cm_other_space: '',
        cm_other_price: '',
        cm_other_s_p_total: '',
        cm_method_total: '',
        cm_space_total: '',
        cm_space_price_average: '',
        cm_exchange_note: '',
        cm_exchange_value: '',
        cm_direct_costs_note: '',
        cm_direct_costs: '',
        cm_indirect_costs_note: '',
        cm_indirect_costs: '',
        cm_cost_total: '', // new
        cm_physical_deterioration_ratio: '',
        cm_physical_deterioration_value: '',
        cm_occupational_limitations_ratio: '',
        cm_occupational_limitations_value: '',
        cm_economic_obsolescence_ratio: '',
        cm_economic_obsolescence_value: '',
        cm_total_depreciation_ratio: '',
        cm_total_depreciation_value: '',
        cm_depreciation_buildings_ratio: '',
        cm_depreciation_buildings_value: '',
        cm_depreciation_s_business_ratio: '',
        cm_depreciation_s_business_value: '',
        cm_developer_earnings_ratio: '',
        cm_developer_earnings_value: '',
        cm_total_market_value: '',
        weights_market_value_relative_weights_roads_used: '',
        relative_market_value_relative_weights_roads_used: '',
        weights_market_value_income_capitalization: '',
        relative_market_value_income_capitalization: '',
        weights_market_value_cost: '',
        relative_market_value_cost: '',
        total_weights: '',
        market_value_weighting_number: '',
        market_value_weighting_text: '',
        cm_space: '',
        cm_operation_type: '',
        operation_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        cm_price: '',
        cm_type: '',
        cm_mobile_number: '',
        cm_latitude: '',
        cm_longitude: '',
        cm_space_2: '',
        cm_operation_type_2: '',
        operation_date_2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        cm_price_2: '',
        cm_type_2: '',
        cm_mobile_number_2: '',
        cm_latitude_2: '',
        cm_longitude_2: '',
        cm_space_3: '',
        cm_operation_type_3: '',
        operation_date_3: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        cm_price_3: '',
        cm_type_3: '',
        cm_mobile_number_3: '',
        cm_latitude_3: '',
        cm_longitude_3: '',
        cm_time_factor_adjustment: '',
        cm_time_factor_adjustment_2: '',
        cm_time_factor_adjustment_3: '',
        cm_settlement_financing_terms: '',
        cm_settlement_financing_terms_2: '',
        cm_settlement_financing_terms_3: '',
        cm_settling_market_conditions: '',
        cm_settling_market_conditions_2: '',
        cm_settling_market_conditions_3: '',
        cm_total_funding_market_adjustments: '',
        cm_total_funding_market_adjustments_2: '',
        cm_total_funding_market_adjustments_3: '',
        cm_price_after_settling_financing_terms: '',
        cm_price_after_settling_financing_terms2: '',
        cm_price_after_settling_financing_terms3: '',
        cm_space_settlement: '',
        cm_space_settlement2: '',
        cm_space_settlement3: '',
        cm_other_settlement: '',
        cm_other_settlement2: '',
        cm_other_settlement3: '',
        cm_total_settlement: '',
        cm_total_settlement2: '',
        cm_total_settlement3: '',
        cm_selling_p_a_settlement: '',
        cm_selling_p_a_settlement2: '',
        cm_selling_p_a_settlement3: '',
        cm_relative_w_comparable_p: '',
        cm_relative_w_comparable_p2: '',
        cm_relative_w_comparable_p3: '',
        cm_contribution_comparative_p_relative_weight: '',
        cm_contribution_comparative_p_relative_weight2: '',
        cm_contribution_comparative_p_relative_weight3: '',
        cm_market_v_comparative_sales_method: '',
        cs_settlement_table: '',
        unit_name: '',
        rent_units: '',
        unit_number: '',
        shaghayir_maintenance: '',
        total_rent: '',
        net_income: '',
        unit_name2: '',
        rent_units2: '',
        unit_number2: '',
        shaghayir_maintenance2: '',
        total_rent2: '',
        net_income2: '',
        unit_name3: '',
        rent_units3: '',
        unit_number3: '',
        shaghayir_maintenance3: '',
        total_rent3: '',
        net_income3: '',
        total_annual_income: '',
        deduction_losses: '',
        total_actual_income: '',
        m_operating_c_expenditures: '',
        net_operating_income: '',
        capitalization_rate: '',
        market_v_income_c_method: '',
        trans_report_price: '',
        trans_name_subscriber_in_report: '',
        trans_commissions_percentage: '',
        trans_commissions_amount: '',
        trans_internal_notes: '',
        trans_currency: '',
        trans_professional_standard: '',
        trans_restrictions_publication: '',
        trans_evacuation_responsibility: '',
        trans_special_assumptions: '',
        income_valuation: [
          {
            unit_name: '', // اسم الوحدة
            unit_number: '', // عدد الوحدة
            unit_rent: '', // ايجار الوحدة
            maintenance: '', // شغائر وصيانه
            total_rent: '', // مجموع الايجارات
            final_income: '', // صافي الدخل
            id: uuid.v4(),
          },
        ],
      },
      marker: { lat: 24.7468754, lng: 39.9600269 },
      center: { lat: 24.7468754, lng: 39.9600269 },
      // Real Data
      ProfessionalStandards: `طريقة استخراج القيمة: عن طريق دراسة المنطقة و تحليل أسعار العقارات التجارية والسكنية والعروض المشابهة للأرض و التكلفة للمباني بعد خصم نسبة الإهلاك.
المستندات المقدمة من طالب التقييم: هوية المالك - صك الملكية.
نطاق البحث: أسعار البيع للأرض بالحي، مدى توفر خدمات البنية التحتية و خدمات البنية الفوقية مثل المدارس والمستشفيات والحدائق وغيرها، اكتمال العمران في المنطقة المحيطة، نظام البناء في منطقة العقار.
طريقة اعتماد مسطحات البناء: عن طريق المستندات المقدمة من طالب التقييم.
مدة التقرير: تقرير التقييم صالح لمدة 90 يوما من تاريخ الاعتماد ما لم يطرأ أي تغير في منطقة العقار.
المستخدمون الآخرون بالتقرير: العميل المذكور أعلاه.
المدخلات الرئيسية: البيانات المتوفرة في الصك و رخصة البناء.
استنتاج القيمة والأسباب الرئيسية: تم استنتاج القيمة بالطريقة المذكورة أعلاه وذلك بت…`,
      AcknowledgmentOfIndependence: 'الشركة غير مسؤولة عن صحة الصكوك والفسوحات والمستندات المقدمة من الطرف الثاني (العميل) صحة التراخيص الخاصة بالعقار موضع التقييم وتحت مسؤوليته .',
      RestrictionsUsePublication: 'تعد عمليات التقييم والتقارير سرية للطرف الموجه ولمن يتم إحالتها إليه لغرض محدد مع عدم تحمل أي مسؤولية من أي نوع لأي طرف ثالث، ولا يجوز نشر هذا التقرير كاملا أو أي جزء منه أو الإشارة إليه في أي وثيقة أو بيان أو نشرة دورية أو في أي وسيلة تواصل مع أي طرف ثالث دون الحصول على موافقة مسبقة مكتوبة بالشكل والسياق الذي تظهر فيه',
      EvacuationResponsibilaty: 'يفيد فريق عمل (اسم الشركة) بأنه تم معاينة العقار و انه ليس لدينا اي مصلحة شخصية  او مادية  او  اي اهتمامات حالية او مستقبلية بالعقار موضع التقييم و ان ما تم تقديمه بالتقرير سليم وصحيح ، حي  تم رفع جميع البيانات من واقع السوق الحالي وجميع المعادلات المحددة ونتائج الاسعار المحددة والمرفقة بالتقرير مراجعة ومدققة وتم تحليلها .',
      Assumptions: `• نفترض بأن العقار ملكية مطلقة دون أي أعباء.
• تم اعتماد سعر متر الأرض بناء على العروض المشابهة المحيطة بالمنطقة وأخذ في الاعتبار ظروف السوق وعمل جدول تسويات للأرض.
• تم اعتماد القيمة السوقية للعقار بطريقة السوق ( المقارنة ).
• مصدر الملكية: صحة صور المستندات المقدمه لنا على مسؤولية العميل وتم افتراض صحتها.
• تم التقييم في ظل جائجة كورونا وهذة الفترة التعامل مع عدم اليقين في اوقات اضطراب حاله وظروف السوق.
• في 11 مارس 2020 صنفت منظمة الصحة العالمية فيروس كورونا المستجد COVID-19 بأنه وباء عالمي. مما أحدث تأثيراً واضحاً على الاقتصادات والأسواق العالمية والمحلية وبناء عليه تم اتخاذ العديد من الإجراءات الرسمية محلياً وعالمياً والتي من شأنها أن تؤثر على جميع القطاعات.`,
      participants: [
        {
          participant: true,
        },
      ],
      // Fake Data
      airRows: 1,
      airRows2: 1,
      airRows3: 1,
      airRows4: 1,
      airRows5: 1,
      airRows6: 1,
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
      ex11: false,
      ex12: false,
      ex13: false,
      ex14: false,
      ex15: false,
      ex16: false,
      select: null,
      selected: null,
      row: null,
      moneyInputOptions: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 11,
        precision: 2,
      },
      evaluateType: ['evaluateType1'],
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      // Date Inputs
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
      menu3: false,
      lat: 24.68773,
      long: 46.72185,
      // Images Section
      images: [

      ],
      imageSorting: [],
      // Map
      location: null,
      gettingLocation: false,
      errorCurLocation: null,
      // Finishing Textarea => التشطيبات
      outLux: 'الواجهات من حجر طبيعي أو دهان ذو جودة عالية، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية',
      inLux: 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من رخام فاخر، نوعية الأبواب الداخلية، نوعية العزل، نوعية الشبابيك، مكونات الجدران الخارجية تكون مزدوجة، نوعية التسليك والسباكة، نوعية الدهان الداخلي، أعمال الجبس بأشكال هندسية وجودتها، تكييف مركزي، مصعد، جودة عمال التشطيب.',
      outMed: 'الواجهات من حجر أو دهان، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية غالباً من السيراميك، مكونات الجدران الخارجية تكون مزدوجة',
      inMed: 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من السيراميك، نوعية الأبواب الداخلية، نوعية العزل، نوعية الشبابيك، ، نوعية التسليك والسباكة، نوعية الدهان الداخلي، أعمال الجبس وجودتها، التكييف منفصل (سبيلت).',
      outNorm: 'الواجهات دهان، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية غالباً من بلاط بلدي،',
      inNorm: 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من السيراميك العادي أو بلاط بلدي لفرش الموكيت، نوعية الأبواب الداخلية، لا يوجد عوازل، الشبابيك عادية جداً، نوعية التسليك والسباكة، نوعية الدهان الداخلي، لا يوجد جبس بالأسقف، نوعية التكييف شباك.',
    }),
    // mounted () {
    //   this.getMap(this.lat, this.long)
    // },
    computed: {
      dragOptions () {
        return {
          animation: 200,
          disabled: false,
        }
      },

    },
    watch: {
      'data.cm_time_factor_adjustment': function () {
        this.setTotalFunding(1)
      },
      'data.cm_settlement_financing_terms': function () {
        this.setTotalFunding(1)
      },
      'data.cm_settling_market_conditions': function () {
        this.setTotalFunding(1)
      },
      'data.cm_space_settlement': function () {
        this.setTotalFunding(1)
      },
      'data.cm_other_settlement': function () {
        this.setTotalFunding(1)
      },

      'data.cm_time_factor_adjustment_2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_settlement_financing_terms_2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_settling_market_conditions_2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_space_settlement2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_other_settlement2': function () {
        this.setTotalFunding(2)
      },

      'data.cm_time_factor_adjustment_3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_settlement_financing_terms_3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_settling_market_conditions_3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_space_settlement3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_other_settlement3': function () {
        this.setTotalFunding(3)
      },
      // change the total
      'data.cm_total_funding_market_adjustments': function () {
        this.data.cm_price_after_settling_financing_terms = +this.data.cm_price + (this.data.cm_price * this.data.cm_total_funding_market_adjustments) / 100
      },
      'data.cm_price': function () {
        this.data.cm_price_after_settling_financing_terms = +this.data.cm_price + (this.data.cm_price * this.data.cm_total_funding_market_adjustments) / 100
        this.sellingAftersettlement(1)
      },

      'data.cm_total_funding_market_adjustments_2': function () {
        this.data.cm_price_after_settling_financing_terms2 = +this.data.cm_price_2 + (this.data.cm_price_2 * this.data.cm_total_funding_market_adjustments_2) / 100
      },
      'data.cm_price_2': function () {
        this.data.cm_price_after_settling_financing_terms2 = +this.data.cm_price_2 + (this.data.cm_price_2 * this.data.cm_total_funding_market_adjustments_2) / 100
        this.sellingAftersettlement(2)
      },
      'data.cm_total_funding_market_adjustments_3': function () {
        this.data.cm_price_after_settling_financing_terms3 = +this.data.cm_price_3 + (this.data.cm_price_3 * this.data.cm_total_funding_market_adjustments_3) / 100
      },
      'data.cm_price_3': function () {
        this.data.cm_price_after_settling_financing_terms3 = +this.data.cm_price_3 + (this.data.cm_price_3 * this.data.cm_total_funding_market_adjustments_3) / 100
        this.sellingAftersettlement(3)
      },

      // سعر البيع بعد التسويات
      'data.cm_total_settlement': function () {
        this.sellingAftersettlement(1)
      },
      'data.cm_total_settlement2': function () {
        this.sellingAftersettlement(2)
      },
      'data.cm_total_settlement3': function () {
        this.sellingAftersettlement(3)
      },

      // مساهمة العقارات المقارنة حسب الوزن النسبي
      'data.cm_selling_p_a_settlement': function () {
        this.contribution_comparative_p_relative_weight(1)
      },
      'data.cm_relative_w_comparable_p': function () {
        this.contribution_comparative_p_relative_weight(1)
      },

      'data.cm_selling_p_a_settlement2': function () {
        this.contribution_comparative_p_relative_weight(2)
      },
      'data.cm_relative_w_comparable_p2': function () {
        this.contribution_comparative_p_relative_weight(2)
      },

      'data.cm_selling_p_a_settlement3': function () {
        this.contribution_comparative_p_relative_weight(3)
      },
      'data.cm_relative_w_comparable_p3': function () {
        this.contribution_comparative_p_relative_weight(3)
      },

      // القيمة السوقية بطريقة البيوع المقارنة
      'data.cm_contribution_comparative_p_relative_weight': function () {
        this.cm_market_v_comparative_sales_method()
      },
      'data.cm_contribution_comparative_p_relative_weight2': function () {
        this.cm_market_v_comparative_sales_method()
      },
      'data.cm_contribution_comparative_p_relative_weight3': function () {
        this.cm_market_v_comparative_sales_method()
      },
      // تقييم الايجارات
      'data.income_valuation': {
        handler: function (val, oldVal) {
          this.data.total_annual_income = this.data.income_valuation.reduce((p, c) => p + c.total_rent, 0)
          this.data.deduction_losses = this.data.income_valuation.reduce((p, c) => p + c.deduction_losses_total, 0)
        },
        deep: true,
      },
      'data.total_annual_income': function () {
        // إجمالي الدخل الفعلي
        this.data.total_actual_income = this.data.total_annual_income - this.data.deduction_losses
        // صافي الدخل التشغيلي
        this.data.net_operating_income = this.data.total_actual_income - this.data.m_operating_c_expenditures
      },
      'data.deduction_losses': function () {
        // إجمالي الدخل الفعلي
        this.data.total_actual_income = this.data.total_annual_income - this.data.deduction_losses
      },
      // ناقصا النفقات التشغيلية والرأسمالية
      'data.m_operating_c_expenditures': function () {
        // صافي الدخل التشغيلي
        this.data.net_operating_income = this.data.total_actual_income - this.data.m_operating_c_expenditures
      },
      'data.total_actual_income': function () {
        this.data.net_operating_income = this.data.total_actual_income - this.data.m_operating_c_expenditures
      },

      // صافي الدخل التشغيلي
      'data.net_operating_income': function () {
        this.data.market_v_income_c_method = this.data.net_operating_income * (this.data.capitalization_rate || 1)
      },
      // معدل الرسملة (أ) عامل شراء السنوات
      'data.capitalization_rate': function () {
        this.data.market_v_income_c_method = this.data.net_operating_income * (this.data.capitalization_rate || 1)
      },

      // أسلوب التكلفه
      'data.cm_land_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_building_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_basement_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_supplement_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_fences_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_other_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },

      // cm_total_market_value
      'data.cm_method_total': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_cost_total': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_developer_earnings_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_depreciation_buildings_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_depreciation_s_business_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_total_depreciation_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },

      // الترجيح
      // بطريقة البيوع المقارنة
      'data.weights_market_value_relative_weights_roads_used': function () {
        this.data.relative_market_value_relative_weights_roads_used = (this.data.weights_market_value_relative_weights_roads_used * this.data.cm_market_v_comparative_sales_method) / 100
      },
      'data.cm_market_v_comparative_sales_method': function () {
        this.data.relative_market_value_relative_weights_roads_used = (this.data.weights_market_value_relative_weights_roads_used * this.data.cm_market_v_comparative_sales_method) / 100
      },
      // بطريقة رسملة الدخل
      'data.weights_market_value_income_capitalization': function () {
        this.data.relative_market_value_income_capitalization = (this.data.weights_market_value_income_capitalization * this.data.market_v_income_c_method) / 100
      },
      'data.market_v_income_c_method': function () {
        this.data.relative_market_value_income_capitalization = (this.data.weights_market_value_income_capitalization * this.data.market_v_income_c_method) / 100
      },
      //  بطريقة التكلفة
      'data.weights_market_value_cost': function () {
        this.data.relative_market_value_cost = (this.data.weights_market_value_cost * this.data.cm_total_market_value) / 100
      },
      'data.cm_total_market_value': function () {
        this.data.relative_market_value_cost = (this.data.weights_market_value_cost * this.data.cm_total_market_value) / 100
      },
      // القيمة السوقية بعد الترجيح رقماً
      // القيمة السوقية بعد الترجيح كتابة
      'data.relative_market_value_cost': function () {
        const total = +this.data.relative_market_value_cost + +this.data.relative_market_value_income_capitalization + +this.data.relative_market_value_relative_weights_roads_used
        this.data.market_value_weighting_number = total
        this.data.market_value_weighting_text = (isNaN(total) || total <= 0) ? '' : new NumbersToWords(total, 'SAR').parse()
      },
      'data.relative_market_value_income_capitalization': function () {
        const total = +this.data.relative_market_value_cost + +this.data.relative_market_value_income_capitalization + +this.data.relative_market_value_relative_weights_roads_used
        this.data.market_value_weighting_number = total
        this.data.market_value_weighting_text = (isNaN(total) || total <= 0) ? '' : new NumbersToWords(total, 'SAR').parse()
      },
      'data.relative_market_value_relative_weights_roads_used': function () {
        const total = +this.data.relative_market_value_cost + +this.data.relative_market_value_income_capitalization + +this.data.relative_market_value_relative_weights_roads_used
        this.data.market_value_weighting_number = total
        this.data.market_value_weighting_text = (isNaN(total) || total <= 0) ? '' : new NumbersToWords(total, 'SAR').parse()
      },
    },
    mounted () {
      // this.getCurrentLocation()
      this.getCustomers()
      this.getEvaluationPurpose()
      // ! TODO : change this later with proper method
      this.getUsers()
    },
    methods: {
      // test
      getTotalSpace: function () {
        this.data.cm_space_total = Number.parseFloat(+this.data.cm_building_space + +this.data.cm_basement_space + +this.data.cm_supplement_space + +this.data.cm_other_space).toFixed(2)
      },
      getSpacePriceAverage: function () {
        let n = 0
        if (+this.data.cm_land_price > 0) {
          n++
        }
        if (+this.data.cm_fences_price > 0) {
          n++
        }
        if (+this.data.cm_building_price > 0) {
          n++
        }
        if (+this.data.cm_basement_price > 0) {
          n++
        }
        if (+this.data.cm_supplement_price > 0) {
          n++
        }
        if (+this.data.cm_other_price > 0) {
          n++
        }
        console.log(n)
        this.data.cm_space_price_average = (+this.data.cm_land_price + +this.data.cm_other_price + +this.data.cm_fences_price + +this.data.cm_building_price + +this.data.cm_basement_price + +this.data.cm_supplement_price) / n
      },
      // ! TODO : cheange this with proper endpoint
      getUsers: async function () {
        const { data } = await UsersServices.getAllItems()
        console.log(data)
        // appraisersList: [],
        // previewsList: [],
        // coordinatorsList: [],
        const usersList = data.data.map(({ id, name }) => {
          return ({
            id,
            name,
          })
        })

        this.appraisersList = usersList
        this.previewsList = usersList
        this.coordinatorsList = usersList
      },
      // get current customers
      getCustomers: async function () {
        // console.log('hi')
        const { data } = await CustomersService.getAllItems()
        this.customersList = data.data.map((customer) => {
          return ({
            id: customer.id,
            name: customer.cs_name,
          })
        })
        // console.log(this.customersList)
        // console.log(await CustomersService.getAllItems())
        // console.log(items)
      },
      // EvaluationPurpose
      getEvaluationPurpose: async function () {
        const { data } = await EvaluationPurposeService.getAllItems()
        this.evaluationPurposeList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      // Get Cureent Location
      getCurrentLocation: function () {
        // do we support geolocation
        if (!('geolocation' in navigator)) {
          this.errorCurLocation = 'Geolocation is not available.'
          return
        }
        this.gettingLocation = true
        // get position
        navigator.geolocation.getCurrentPosition(pos => {
          this.gettingLocation = false
          // this.location = pos
          this.data.latitude = pos.coords.latitude
          this.data.longitude = pos.coords.longitude
          // make the center of the make equal to the lat and long of the current location
          this.$refs.vPlusMap.$mapPromise.then((map) => {
            map.panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          })
          this.center.lat = this.data.latitude
          this.center.lng = this.data.longitude
          // this.getMap(this.location.coords.latitude, this.location.coords.longitude)
        }, err => {
          this.gettingLocation = false
          this.errorCurLocation = err.message
        })
      },
      updateCoordinates: function (location) {
        this.data.latitude = (location.latLng.lat() || 0).toFixed(6)
        this.data.longitude = (location.latLng.lng() || 0).toFixed(6)
      },
      updateCenter: function () {
        this.center.lng = +this.data.longitude
        this.center.lat = +this.data.latitude
        this.$refs.vPlusMap.$mapPromise.then((map) => {
          map.panTo({ lat: +this.data.latitude, lng: +this.data.longitude })
        })
      },
      changeLatAndLong: function () {
        this.$refs.vPlusMap.$mapPromise.then((map) => {
          map.panTo({ lat: +this.data.latitude, lng: +this.data.longitude })
        })
        this.data.latitude = (+this.data.latitude || 0).toFixed(6)
        this.data.longitude = (+this.data.longitude || 0).toFixed(6)
        this.center.lng = +this.data.longitude
        this.center.lat = +this.data.latitude
      },
      // Get Location debendes on 2 inputs
      getMap: function (x, y) {
        loader.load().then(function (google) {
          // Regular Map
          var center = new google.maps.LatLng(x, y) // Center
          const mapOptions = {
            zoom: 13,
            center: center,
            mapId: '2bf1cba222371325',
            scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
            disableDefaultUI: true, // a way to quickly hide all controls
            zoomControl: true,
          }
          // eslint-disable-next-line no-new
          var map = new google.maps.Map(
            document.getElementById('map'),
            mapOptions
          )
          // eslint-disable-next-line no-new
          new google.maps.Marker({
            position: center,
            map,
            title: 'Hello World!',
          })
        })
      },
      // Copy Lat & Long of map
      doCopy: function () {
        copyText(this.data.latitude + ',' + this.data.longitude, undefined, (error, event) => {
          if (error) {
            alert('Can not copy')
            console.log(error)
          } else {
            // alert('Copied')
            Swal.fire({
              title: 'تم النسخ',
              icon: 'success',
              timer: 1000,
              showCancelButton: false,
              showConfirmButton: false,
            })
          }
        })
      },
      // Show Image After Upload
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        // var image = new Image()
        const item = { hidden: false, image: false, id: uuid.v4() }
        const images = this.images
        var reader = new FileReader()
        reader.onload = (e) => {
          item.image = e.target.result
        }
        reader.readAsDataURL(file)
        images.push(item)
        images.sort((a, b) => {
          if (a.hidden === true && b.hidden === false) {
            return 1
          } else if (b.hidden === true && a.hidden === false) {
            return -1
          }
          return 0
        })

        // console.log(images.map(item => { return ({ ...item, image: '' }) }))

        this.images = images
      },
      removeImage: function (item, index) {
        item.image = false
        this.images.splice(index, 1)
        // Remove sort of image
        this.imageSorting.splice(index, 1)
      },
      hideImage: function (image, index) {
        //  const imageIndex = this.images.findIndex(image => image.id === id)
        this.images[index].hidden = !this.images[index].hidden
        this.images.sort((a, b) => {
          if (a.hidden === true && b.hidden === false) {
            return 1
          } else if (b.hidden === true && a.hidden === false) {
            return -1
          }
          return 0
        })
        // this.images.push(this.images.splice(index, 1)[0])
      },
      // Adding & Remove Participant
      addParticipant: function () {
        this.participants.push({ participant: true })
      },
      removeParticipant: function (item) {
        item.participant = false
      },

      // cm_total_funding_market_adjustments
      setTotalFunding: function (n) {
        switch (n) {
          case 1:
            this.data.cm_total_funding_market_adjustments = +this.data.cm_time_factor_adjustment + +this.data.cm_settlement_financing_terms + +this.data.cm_settling_market_conditions
            this.data.cm_total_settlement = +this.data.cm_space_settlement + +this.data.cm_other_settlement + +this.data.cm_time_factor_adjustment + +this.data.cm_settlement_financing_terms + +this.data.cm_settling_market_conditions
            break
          case 2:
            this.data.cm_total_funding_market_adjustments_2 = +this.data.cm_time_factor_adjustment_2 + +this.data.cm_settlement_financing_terms_2 + +this.data.cm_settling_market_conditions_2
            this.data.cm_total_settlement2 = +this.data.cm_space_settlement2 + +this.data.cm_other_settlement2 + +this.data.cm_time_factor_adjustment_2 + +this.data.cm_settlement_financing_terms_2 + +this.data.cm_settling_market_conditions_2
            break
          case 3:
            this.data.cm_total_funding_market_adjustments_3 = +this.data.cm_time_factor_adjustment_3 + +this.data.cm_settlement_financing_terms_3 + +this.data.cm_settling_market_conditions_3
            this.data.cm_total_settlement3 = +this.data.cm_space_settlement3 + +this.data.cm_other_settlement3 + +this.data.cm_time_factor_adjustment_3 + +this.data.cm_settlement_financing_terms_3 + +this.data.cm_settling_market_conditions_3
            break
        }
      },
      // سعر البيع بعد التسويات
      sellingAftersettlement: function (n) {
        switch (n) {
          case 1:
            this.data.cm_selling_p_a_settlement = +this.data.cm_price * (this.data.cm_total_settlement / 100)
            break
          case 2:
            this.data.cm_selling_p_a_settlement2 = +this.data.cm_price_2 * (this.data.cm_total_settlement2 / 100)
            break
          case 3:
            this.data.cm_selling_p_a_settlement3 = +this.data.cm_price_3 * (this.data.cm_total_settlement3 / 100)
            break
        }
      },
      // مساهمة العقارات المقارنة حسب الوزن النسبي
      contribution_comparative_p_relative_weight: function (n) {
        switch (n) {
          case 1:
            this.data.cm_contribution_comparative_p_relative_weight = +this.data.cm_selling_p_a_settlement * (this.data.cm_relative_w_comparable_p / 100)
            break
          case 2:
            this.data.cm_contribution_comparative_p_relative_weight2 = +this.data.cm_selling_p_a_settlement2 * (this.data.cm_relative_w_comparable_p2 / 100)
            break
          case 3:
            this.data.cm_contribution_comparative_p_relative_weight3 = +this.data.cm_selling_p_a_settlement3 * (this.data.cm_relative_w_comparable_p3 / 100)
            break
        }
      },
      cm_market_v_comparative_sales_method: function () {
        this.data.cm_market_v_comparative_sales_method = +this.data.cm_contribution_comparative_p_relative_weight + +this.data.cm_contribution_comparative_p_relative_weight2 + +this.data.cm_contribution_comparative_p_relative_weight3
      },

      // تقييم الايجارات
      removeItemFromIncomeValuation: function (id) {
        this.data.income_valuation = this.data.income_valuation.filter(item => {
          if (item.id !== id) {
            return item
          }
        })
      },
      updateTotalRent: function (id) {
        this.data.income_valuation = this.data.income_valuation.map(item => {
          if (item.id === id) {
            const totalRent = +item.unit_number * +item.unit_rent
            const deductionLossesTotal = +item.unit_number * (+item.deduction_losses || 0)
            return ({
              ...item,
              total_rent: totalRent,
              deduction_losses_total: deductionLossesTotal,
              final_income: totalRent - deductionLossesTotal,
            })
          }
          return item
        })
      },

      // تقييم الارض والمباني
      setMultiOfSpaceAndPrice: function (name) {
        this.data[`cm_${name}_s_p_total`] = this.data[`cm_${name}_space`] * this.data[`cm_${name}_price`]
      },

      // أسلوب التكلفه
      setCostTotal: function () {
        this.data.cm_cost_total = +this.data.cm_exchange_value + +this.data.cm_direct_costs + +this.data.cm_indirect_costs
      },

      //
      setDepreciationValueAndTotal: function (name) {
        this.data[`cm_${name}_value`] = (this.data[`cm_${name}_ratio`] * this.data.cm_cost_total) / 100

        this.data.cm_total_depreciation_ratio = +this.data.cm_physical_deterioration_ratio + +this.data.cm_occupational_limitations_ratio + +this.data.cm_economic_obsolescence_ratio
        this.data.cm_total_depreciation_value = +this.data.cm_physical_deterioration_value + +this.data.cm_occupational_limitations_value + +this.data.cm_economic_obsolescence_value
      },

      setDepreciationValue: function (name) {
        this.data[`cm_${name}_value`] = (this.data[`cm_${name}_ratio`] * this.data.cm_cost_total) / 100
      },
    },
  }
</script>

<style lang="scss" scoped>
.pdf-container{
  display: block;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  width: 160px;
  padding: 15px;
  border-radius: 10px;
  text-decoration: none;
}
.pdf-container i{
  font-size: 40px;
  margin-left: 10px;
  color: #ccc;
}
.time-chip span {
  font-size: 15px;
}
.form-container {
  margin-top: 50px;
}
.form-container h2 {
  font-size: 25px;
  color: #37a8ff;
  margin-bottom: 25px;
}
label {
  font-size: 13px;
}
#map{
  height: 400px;
}
.align-items-center{
  align-items: center
}
.justify-content-end{
  justify-content: end
}
.orange-btn{
  background-color: #FDCA40 !important;
  color: #000 !important;
}
.light-green-btn{
  background-color: #4DC334 !important;
  color: #fff !important;
}
.table-responsive{
  overflow-x: auto;
}
thead{
  background: #F0F2F3;
}
th{
  color: #000 !important;
  font-size: 11px !important;
  font-weight: 700 !important;
}
td{
  white-space: nowrap;
  min-width: 100px;
}
.blue-darken-btn{
  background-color: #061058 !important;
  color: #fff !important;
}
.orange-btn{
  background-color: #FDCA40;
}
.images-draggable-container {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-gap: 0.2em;
  direction: ltr;
}
.upload-img-container  {
  display: flex;
}
.upload-img-container > div, #upload-input-container > div{
  width: 100%;
  height: 120px;
  background: #f9f9f9;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.upload-img-container > div > i , #upload-input-container > div> i{
  font-size: 60px;
}
input[type='file']{
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  z-index: 99999;
  cursor: pointer;
}
img {
  width: 100%;
}
.hidden-img{
  opacity: .4;
}
.remove-img{
  position: absolute;
  top: 5px;
  left: 5px;
  background: #fff;
  border-radius: 5px;
  padding: 4px;
  box-shadow: 0px 2px 7px rgba(0,0,0,.2);
}
.remove-img i{
  margin: auto;
  color: #dc3545!important;
}
.hide-img{
  position: absolute;
  top: 5px;
  left: 40px;
  background: #fff;
  border-radius: 5px;
  padding: 4px;
  box-shadow: 0px 2px 7px rgba(0,0,0,.2);
}
.hide-img i{
  margin: auto;
  color: #3772FF!important;
}
.img-num{
  position: absolute;
  width: 30px;
  top: 5px;
  right: 5px;
  background: #fff;
  border-radius: 5px;
  padding: 4px 8px;
  box-shadow: 0px 2px 7px rgba(0,0,0,.2);
}
.img-num:focus{
  outline: 0;
}
#income_valuation thead {
  background: unset;
}
#income_valuation td, #income_valuation th {
  border-bottom: none;
}
#income_valuation tr:hover {
  background: unset;
}
#income_valuation tr td {
  padding-bottom: 1em;
}
.text-danger {
    color: #dc3545!important;
}
</style>
<style>
/* .grid-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
} */
</style>
