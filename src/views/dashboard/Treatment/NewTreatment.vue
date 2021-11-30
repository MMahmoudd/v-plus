<template>
  <v-container>
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        معاملة جديدة
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
                    v-model="data.appraiser_id"
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
                    v-model="data.preview_id"
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
                    v-model="data.coordinator_id"
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
                    v-model="data.prop_evaluation_report_user"
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
                    v-model="data.prop_evaluation_report_phone"
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
                    v-model="data.appraisal_fees"
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
                    v-model="data.appraisal_value"
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
                    v-model="data.commissioning_date"
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
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ التقييم</label>
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

                <v-col
                  cols="12"
                  lg="3"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >تاريخ المعاينة</label>
                  <v-menu
                    v-model="menu3"
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
                      @input="menu3 = false"
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
                    :items="items"
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
                    v-model="data.deposit_code"
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
                    v-model="data.prop_street_name"
                    label="اسم الشارع"
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
                  >اسم المخطط</label>
                  <v-text-field
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
                    v-model="data.prop_apartment_num"
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
                    v-model="data.prop_Albulk_num"
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
                    v-model="data.prop_part_num"
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
                    v-model="data.prop_owner_name"
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
                    v-model="data.prop_owner_phone"
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
                    v-model="data.prop_instrument_num"
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
                  <v-text-field
                    v-model="data.prop_instrument_date"
                    label="تاريخ الصك"
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
                  >رقم رخصة البناء</label>
                  <v-text-field
                    v-model="data.prop_building_clearance_num"
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
                  <v-text-field
                    v-model="data.prop_building_end"
                    label="تاريخ رخصة البناء"
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
                  >عمر البناء</label>
                  <v-text-field
                    v-model="data.construction_age"
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
                    v-model="data.prop_retail_record_num"
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
                  <v-text-field
                    v-model="data.prop_retail_record_date"
                    label="تاريخ محضر التجزئة"
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
                  >حالة البناء</label>
                  <v-text-field
                    v-model="data.construction_condition"
                    label="حالة البناء"
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
                  <v-text-field
                    v-model="data.occupancy_status"
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
                      :items="items"
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
                      :items="items"
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
                      :items="items"
                      label="المنسوب"
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
                      :items="items"
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
                      :items="items"
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
                      :items="items"
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
                      :items="items"
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
                    <v-text-field
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
                      :items="items"
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
                      :items="items"
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
                      :items="items"
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
                      :items="items"
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
                      :items="items"
                      label="الهيكل الانشائى"
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
                      :items="items"
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
                      v-model="ex1"
                      class="check-label"
                      label="حوائط زجاجية"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex2"
                      class="check-label"
                      label="زجاج مزدوج"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex3"
                      class="check-label"
                      label="جبس فى السقف"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex4"
                      class="check-label"
                      label="إضاءة مخفية"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex5"
                      class="check-label"
                      label="مصاعد"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex5"
                      class="check-label"
                      label="حمام عربى"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex7"
                      class="check-label"
                      label="سلالم"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex8"
                      class="check-label"
                      label="كراج كهربائى"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex9"
                      class="check-label"
                      label="كراج عادى"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex10"
                      class="check-label"
                      label="بوابات"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex11"
                      class="check-label"
                      label="سخانات"
                      color="info"
                      value=""
                      hide-details
                    />
                  </div>
                  <div class="mr-3">
                    <v-checkbox
                      v-model="ex12"
                      class="check-label"
                      label="حمام افرنجى"
                      color="info"
                      value=""
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
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const CustomersService = ServiceFactory.get('Customers')
  const EvaluationPurposeService = ServiceFactory.get('EvaluationPurpose')
  // ! TODO : change this later
  const UsersServices = ServiceFactory.get('Users')
  const RegionsServices = ServiceFactory.get('Regions')
  const CitesServices = ServiceFactory.get('Cites')
  const NeighborhoodsServices = ServiceFactory.get('Neighborhoods')
  const PropertyRatingsServices = ServiceFactory.get('PropertyRatings')
  const PropertyTypesServices = ServiceFactory.get('PropertyTypes')

  export default {
    name: 'NewTreatment',

    data: () => ({
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
      data: {
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
    methods: {
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
