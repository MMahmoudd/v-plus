<template>
  <v-container>
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        {{ this.$route.query.edit ? `معاملة رقم ${data.transaction_id}` : 'معاملة جديدة' }}
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
                  md="6"
                >
                  <v-file-input
                    chips
                    multiple
                    counter
                    show-size
                    label="الصك"
                    @change="handleFileUpload( $event , 'instrument_file')"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                  <v-chip
                    v-if="this.$route.query.edit && data.instrument_file"
                    small
                    label
                    color="primary"
                  >
                    <a
                      target="_blank"
                      :href="'https://taqeeem.millennium.sa/' + data.instrument_file "
                    >{{ 'https://taqeeem.millennium.sa/' + data.instrument_file }}</a>
                  </v-chip>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-file-input
                    chips
                    multiple
                    counter
                    show-size
                    label="المخطط"
                    @change="handleFileUpload( $event , 'attached_file')"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                  <v-chip
                    v-if="this.$route.query.edit && data.attached_file"
                    small
                    label
                    color="primary"
                  >
                    <a
                      target="_blank"
                      :href="'https://taqeeem.millennium.sa/' + data.attached_file "
                    >{{ 'https://taqeeem.millennium.sa/' + data.attached_file }}</a>
                  </v-chip>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-file-input
                    chips
                    multiple
                    counter
                    show-size
                    label="خطاب التكليف"
                    @change="handleFileUpload( $event , 'assignment_letter_file')"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                  <v-chip
                    v-if="this.$route.query.edit && data.assignment_letter_file"
                    link
                    small
                    label
                    color="primary"
                  >
                    <a :href="'https://taqeeem.millennium.sa/' + data.assignment_letter_file"> {{ 'https://taqeeem.millennium.sa/' + data.assignment_letter_file }}</a>
                  </v-chip>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-file-input
                    chips
                    multiple
                    counter
                    show-size
                    label="الأرشيف"
                    @change="handleFileUpload( $event , 'schema_file')"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                  <v-chip
                    v-if="this.$route.query.edit && data.schema_file"
                    small
                    label
                    color="primary"
                  >
                    <a
                      target="_blank"
                      :href="'https://taqeeem.millennium.sa/' + data.schema_file "
                    >{{ 'https://taqeeem.millennium.sa' + data.schema_file }}</a>
                  </v-chip>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>إسناداً إلى</h2>
              <v-row>
                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label class="d-block mb-3 font-weight-bold">المقيم</label>
                  <v-select
                    v-model="data.resident_id"
                    :items="appraisersList"
                    item-text="name"
                    item-value="id"
                    label="المقيم"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label class="d-block mb-3 font-weight-bold">المراجع</label>
                  <v-select
                    v-model="data.reviewer_id"
                    :items="previewsList"
                    item-text="name"
                    item-value="id"
                    label="المراجع"
                    single-line
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label class="d-block mb-3 font-weight-bold">المعتمد</label>
                  <v-select
                    v-model="data.approved_id"
                    :items="coordinatorsList"
                    item-text="name"
                    item-value="id"
                    label="المعتمد"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-10" />

            <div>
              <h2>نطاق العمل</h2>
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

              <h2>نفاصيل العقار</h2>
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

                <!-- <v-col
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
                </v-col> -->
                <!--
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
                </v-col> -->
              </v-row>
              <!-- <v-divider class="my-10" /> -->
              <!-- If Raghie Module -->
              <!-- <div v-if="this.$route.params.id == 1">
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
              </div> -->
              <!-- If Not Raghie Module -->
              <!-- <div v-else>
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
              </div> -->
            </div>

            <v-divider class="my-10" />

            <!-- <div>
              <h2>احداثيات العقار</h2>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <div id="map" />
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
                    <v-btn
                      x-large
                      class="ma-2 light-green-btn"
                      @click.prevent="getMap(data.latitude,data.longitude)"
                    >
                      <v-icon left>
                        fas fa-map-marker-alt
                      </v-icon>
                      تحديد الموقع
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div> -->
            <v-row
              class="mb-10"
              align="center"
              justify="space-between"
            >
              <div>
                <v-btn
                  x-large
                  class="ma-2"
                  color="blue"
                  @click="save"
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

    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  // import Swal from 'sweetalert2'
  // import { copyText } from 'vue3-clipboard'
  // import { Loader } from '@googlemaps/js-api-loader'
  import staticLists from './staticData.json'
  // const loader = new Loader('AIzaSyACo4RXxzSABqvI3S_Q3_nQ2YIW4HfJuXI')

  const CustomersService = ServiceFactory.get('Customers')
  const EvaluationPurposeService = ServiceFactory.get('EvaluationPurpose')
  // ! TODO : change this later
  const UsersServices = ServiceFactory.get('Users')
  const RegionsServices = ServiceFactory.get('Regions')
  const CitesServices = ServiceFactory.get('Cites')
  const NeighborhoodsServices = ServiceFactory.get('Neighborhoods')
  const PropertyRatingsServices = ServiceFactory.get('PropertyRatings')
  const PropertyTypesServices = ServiceFactory.get('PropertyTypes')

  const TransactionsServices = ServiceFactory.get('Transactions')

  export default {
    name: 'NewTreatment',

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
        cm_exchange_note: '',
        cm_exchange_value: '',
        cm_direct_costs_note: '',
        cm_direct_costs: '',
        cm_indirect_costs_note: '',
        cm_indirect_costs: '',
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
      },
      airRows: 1,
      airRows2: 1,
      airRows3: 1,
      airRows4: 1,
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
      tableParticipants: 1,
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
      menu4: false,
    }),
    computed: {
      updateCitesList: function () {
        // const citesList = [];
        const data = this.citesList.filter((city) => {
          if (city.regionId === this.data.region_id) {
            return city
          }
        })
        return data
      },
      updateNeighborhoodsList: function () {
        const data = this.neighborhoodsList.filter((neighborhood) => {
          if (neighborhood.cityId === this.data.city_id) {
            return neighborhood
          }
        })
        return data
      },
    },
    mounted () {
      // this.getCurrentLocation()
      if (this.$route.query.edit) {
        this.fetchOneItem(this.$route.query.edit)
      }
      this.getCustomers()
      this.getEvaluationPurpose()
      // ! TODO : change this later with proper method
      this.getUsers()
      this.getRegions()
      // ! TODO : move these to "watch" when get cites by region id id avaliable
      this.getCites()
      // ! TODO : move these to "watch" when get Neighborhoods by city id id avaliable
      this.getNeighborhoods()

      this.getPropertyRatings()
      this.getPropertyTypes()
    },
    created () {
      console.log(this.$route.query.edit)
      this.data.sample_id = this.$route.params.id
    },
    methods: {
      // get one item
      fetchOneItem: async function (id) {
        const { data } = await TransactionsServices.fetchOneItem(id)
        this.data = data
      },
      // files
      handleFileUpload: function (files, name) {
        this.data[name] = files[0]
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
      },
      // add city
      addCity: async function (cityName, regionId) {
        await CitesServices.addCity(cityName, regionId)
        this.getCites()
        this.cityName = ''
      },
      // add Neighborhood
      addNeighborhood: async function (neighborhoodName, cityId) {
        await NeighborhoodsServices.addNeighborhood(neighborhoodName, cityId)
        this.getNeighborhoods()
        this.neighborhoodName = ''
      },
      // EvaluationPurpose
      getEvaluationPurpose: async function () {
        const { data } = await EvaluationPurposeService.getAllItems()
        this.evaluationPurposeList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },

      // Placess
      getRegions: async function () {
        const { data } = await RegionsServices.getAllItems()
        this.regionsList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      getCites: async function () {
        const { data } = await CitesServices.getAllItems()
        this.citesList = data.data.map((city) => ({
          id: city.id,
          name: city.name,
          regionId: city.region_id,
        }))
      },
      getNeighborhoods: async function () {
        const { data } = await NeighborhoodsServices.getAllItems()
        this.neighborhoodsList = data.data.map((neighborhood) => ({
          id: neighborhood.id,
          name: neighborhood.name,
          cityId: neighborhood.city_id,
        }))
      },
      // property ratings
      getPropertyRatings: async function () {
        const { data } = await PropertyRatingsServices.getAllItems()
        this.propRatingsList = data.data.map((pr) => {
          return {
            id: pr.id,
            name: pr.name,
          }
        })
      },
      // property types
      getPropertyTypes: async function () {
        const { data } = await PropertyTypesServices.getAllItems()
        this.propTypeList = data.data.map((pt) => {
          return {
            id: pt.id,
            name: pt.name,
          }
        })
      },
      // submit
      save: async function () {
        const formData = new FormData()
        for (const key in this.data) {
          formData.append(key, this.data[key])
        }
        let response
        // const response = TransactionsServices.addOneItem(formData)

        if (this.$route.query.edit) {
          response = await TransactionsServices.updateOneItem(this.$route.query.edit, formData)
        } else {
          response = await TransactionsServices.addOneItem(formData)
        }

        if (response.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Treatments')
          }, 1500)
        } else {
          this.errorMessage = 'يوجد مشكلة في التعديل'
          this.errorSnackbar = true
        }
      },
      // Get Location debendes on 2 inputs
      // getMap: function (x, y) {
      //   loader.load().then(function (google) {
      //     // Regular Map
      //     const center = new google.maps.LatLng(x, y) // Center
      //     const mapOptions = {
      //       zoom: 13,
      //       center: center,
      //       mapId: '2bf1cba222371325',
      //       scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
      //       disableDefaultUI: true, // a way to quickly hide all controls
      //       zoomControl: true,
      //     }
      //     // eslint-disable-next-line no-new
      //     const map = new google.maps.Map(
      //       document.getElementById('map'),
      //       mapOptions
      //     )
      //     // eslint-disable-next-line no-new
      //     new google.maps.Marker({
      //       position: center,
      //       map,
      //       title: 'Hello World!',
      //     })
      //   })
      // },
      // // Get Cureent Location
      // getCurrentLocation: function () {
      //   // do we support geolocation
      //   if (!('geolocation' in navigator)) {
      //     this.errorCurLocation = 'Geolocation is not available.'
      //     return
      //   }
      //   this.gettingLocation = true
      //   // get position
      //   navigator.geolocation.getCurrentPosition(pos => {
      //     this.gettingLocation = false
      //     this.location = pos
      //     this.data.latitude = this.location.coords.latitude
      //     this.data.longitude = this.location.coords.longitude
      //     this.getMap(this.location.coords.latitude, this.location.coords.longitude)
      //   }, err => {
      //     this.gettingLocation = false
      //     this.errorCurLocation = err.message
      //   })
      // },
    },
  }
</script>

<style lang="scss" scoped>
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

.v-chip__content a {
  text-decoration: none;
  color:white;
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
.orange-btn{
  background-color: #FDCA40 !important;
  color: #000 !important;
}
</style>
