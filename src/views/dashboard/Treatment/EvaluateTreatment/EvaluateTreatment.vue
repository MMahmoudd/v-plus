<template>
  <v-container>
    <!-- <transactions-bar :list="scrollItems" /> -->
    <v-row
      justify="space-between"
      align="center"
      :class="{'mx-0 mt-4':true , 'disable_all' : data.status=== 3}"
    >
      <h1 class="font-weight-bold">
        معاملة رقم {{ data.transaction_id }}
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
            <!-- <h2>الملاحق</h2> -->

            <!-- <v-divider class="my-10" /> -->

            <v-expansion-panels
              v-model="panel"
              accordion
              multiple
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-1">
                    الملاحق
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row class="my-3">
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">الصك</label>
                      <v-row>
                        <v-col
                          v-for="(f, index) in data.instrument_files"
                          :key="f.id"
                          cols="12"
                          sm="5"
                        >
                          <div class="pdf-container">
                            <a
                              :href="f.original_url"
                              target="_blank"
                            >
                              <v-icon>
                                fas fa-file
                              </v-icon>
                              {{ f.file_name }}
                            </a>
                            <v-icon
                              x-small
                              color="red"
                              @click="deleteFile(f.id, 'instrument_files', index)"
                            >
                              mdi mdi-close-circle
                            </v-icon>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">المخطط</label>
                      <div class="pdf-container">
                        <a
                          v-show="data.attached_files.length > 0"
                          :href="data.attached_files[0].original_url"
                          target="_blank"
                        >
                          <v-icon>
                            fas fa-file
                          </v-icon>
                          {{ data.attached_files[0].name }}
                        </a>
                        <v-icon
                          x-small
                          color="red"
                        >
                          mdi mdi-close-circle
                        </v-icon>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">خطاب التكليف</label>

                      <v-row>
                        <v-col
                          v-for="(f, index) in data.assignment_letter_files"
                          :key="f.id"
                          cols="12"
                          sm="5"
                        >
                          <div class="pdf-container">
                            <a
                              :href="f.original_url"
                              target="_blank"
                            >
                              <v-icon>
                                fas fa-file
                              </v-icon>
                              {{ f.file_name }}
                            </a>
                            <v-icon
                              x-small
                              color="red"
                              @click="deleteFile(f.id, 'assignment_letter_files', index)"
                            >
                              mdi mdi-close-circle
                            </v-icon>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <label class="d-block mb-3 font-weight-bold">الأرشيف</label>
                      <v-row>
                        <v-col
                          v-for="(f, index) in data.schema_files"
                          :key="f.id"
                          cols="12"
                          sm="5"
                        >
                          <div class="pdf-container">
                            <a
                              :href="f.original_url"
                              target="_blank"
                            >
                              <v-icon>
                                fas fa-file
                              </v-icon>
                              {{ f.file_name }}
                            </a>
                            <v-icon
                              x-small
                              color="red"
                              @click="deleteFile(f.id, 'schema_files', index)"
                            >
                              mdi mdi-close-circle
                            </v-icon>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-2">
                    نطاق العمل
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col
                      cols="12"
                      lg="3"
                      md="4"
                    >
                      <label class="d-block mb-3 font-weight-bold">النموذج</label>
                      <v-select
                        v-model="data.sample_id"
                        :items="samplesList"
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
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <v-divider class="my-10" /> -->
              <!-- @change="handleOpenPanel(3)" -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-3">
                    تفاصيل العقار
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
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
                        v-model="data.trans_Albulk_num"
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
                      >رمز العقار / رقم الموقع / رقم العميل</label>
                      <v-text-field
                        v-model="data.trans_deposit_code_site_num_customer_num"
                        label="رمز العقار / رقم الموقع / رقم العميل"
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
                  <!-- {{ isSelfBulding }} -->
                  <!-- If Raghie Module -->
                  <div v-if="isSelfBulding">
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
                              v-model="data.additional_component_3"
                              readonly
                              v-bind="attrs"
                              single-line
                              outlined
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="data.additional_component_3"
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
                          v-model="data.additional_component_1"
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
                          v-model="data.additional_component_2"
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
                          v-model="data.additional_component_value_1"
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
                          v-model="data.additional_component_4"
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
                    <v-divider class="my-10" />
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
                    <!-- <v-row>
                  <v-col
                    cols="12"
                    lg="3"
                    md="4"
                  >
                    <label class="d-block font-weight-bold">مميزات العقار</label>
                  </v-col>
                </v-row> -->
                    <!-- <v-row class="mt-0">
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
                </v-row> -->
                    <v-row class="mt-10">
                      <v-col
                        cols="12"
                        lg="3"
                        md="4"
                      >
                        <label class="d-block font-weight-bold">نوع التكييف</label>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        lg="3"
                        md="4"
                      >
                        <label class="d-block">النوع</label>
                      </v-col>
                      <v-col
                        cols="12"
                        lg="3"
                        md="4"
                      >
                        <label class="d-block ">مركب</label>
                      </v-col>
                      <v-col
                        cols="12"
                        lg="3"
                        md="4"
                      >
                        <label class="d-block">غير مركب</label>
                      </v-col>
                    </v-row>
                    <v-row
                      v-for="t in data.transactions_conditioners"
                      :key="t.type"
                    >
                      <v-col
                        cols="12"
                        lg="3"
                        md="4"
                      >
                        <v-checkbox
                          class="check-label"
                          :label="t.type"
                          color="info"
                          :true-value="true"
                          :false-value="false"
                          value=""
                          hide-details
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        lg="3"
                        md="4"
                      >
                        <v-text-field
                          v-model.number="t.compound"
                          hide-details=""
                          single-line
                          outlined
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        lg="3"
                        md="4"
                      >
                        <v-text-field
                          v-model.number="t.not_compound"
                          hide-details=""
                          single-line
                          outlined
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <h2>تقييم الإنجاز</h2> -->
              <v-expansion-panel
                v-show="isSelfBulding"
              >
                <v-expansion-panel-header><h2>تقييم الإنجاز</h2></v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="d-flex align-items-center">
                    <template>
                      <div class="text-center">
                        <v-btn
                          class="ma-2"
                          rounded
                          :outlined="data.achievement.status !== '1'"
                          color="dark"
                          :dark="data.achievement.status === '1'"
                          @click.prevent="changeAchievmentStatus('1')"
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
                          :outlined="data.achievement.status !== '2'"
                          color="dark"
                          :dark="data.achievement.status === '2'"
                          @click.prevent="changeAchievmentStatus('2')"
                        >
                          النسبة المئوية
                        </v-btn>
                      </div>
                    </template>
                    <template>
                      <div style="margin-right:auto; width:30%">
                        <label
                          class="d-block mb-3 font-weight-bold"
                        >قيمة العقار الحالية</label>
                        <v-text-field
                          v-model="data.achievement.prop_current_price"
                          single-line
                          outlined
                          hide-details
                          :disabled="data.achievement.status === '1'"
                        />
                      </div>
                    </template>
                  </div>
                  <!-- {{ data.achievement.stages }} -->
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
                                نسبة الإنجاز
                              </th>
                              <th>
                                قيمة الإنجاز
                              </th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(p,index) in data.achievement.stages"
                              :key="p.id"
                            >
                              <td>
                                <label class="v-label theme--light">م{{ index + 1 }}</label>
                              </td>
                              <td>
                                <v-text-field
                                  v-model="p.details"
                                  class="mt-3"
                                  single-line
                                  outlined
                                />
                              </td>
                              <td>
                                <v-text-field
                                  v-model="p.pc_to_cost"
                                  :error="isPcToCostError"
                                  :error-messages="isPcToCostError && 'لا يمكن أن يتجاوز المجموع 100%'"
                                  class="mt-3"
                                  single-line
                                  outlined
                                  type="number"
                                  suffix="%"
                                  :disabled="data.achievement.status === '1'"
                                  @input="changePcToCost(p.id,index)"
                                  @change="data.achievement.stages[index].pc_to_cost = (+data.achievement.stages[index].pc_to_cost).toFixed(2)"
                                />
                              </td>
                              <td>
                                <v-text-field
                                  v-model="p.cost"
                                  class="mt-3"
                                  single-line
                                  outlined
                                  :disabled="data.achievement.status === '2'"
                                  @input="changeCost(p.id)"
                                />
                              </td>
                              <td>
                                <v-text-field
                                  v-model="p.pc_of_completion"
                                  class="mt-3"
                                  single-line
                                  outlined
                                  type="number"
                                  suffix="%"
                                  @input="changeCost(p.id)"
                                />
                              </td>
                              <td>
                                <v-text-field
                                  v-model="p.achievement_value"
                                  class="mt-3"
                                  single-line
                                  outlined
                                  disabled
                                />
                              </td>
                              <td>
                                <v-btn
                                  color="red"
                                  :disabled="data.achievement.stages.length === 1"
                                  @click="removeStage(p.id)"
                                >
                                  <v-icon>
                                    fas fa-trash-alt
                                  </v-icon>
                                </v-btn>
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
                    @click.prevent="addNewStage()"
                  >
                    <v-icon left>
                      fas fa-plus
                    </v-icon>
                    اضافة مرحلة جديدة
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <v-divider class="my-10" /> -->

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-4">
                    احداثيات العقار
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
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
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2
                    id="item-5"
                  >
                    وصف العقار
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
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
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-6">
                    حدود واطوال العقار
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
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
                          disabled
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
                          label=""
                          single-line
                          outlined
                          disabled
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
                          disabled
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
                          label=""
                          single-line
                          outlined
                          disabled
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
                          disabled
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
                          label=""
                          single-line
                          outlined
                          disabled
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
                          disabled
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
                          single-line
                          outlined
                          disabled
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
                          disabled
                        />
                      </v-col>
                    <!-- <v-col
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
                </v-col> -->
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <h2>معلومات رخصة البناء</h2> -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-7">
                    معلومات رخصة البناء
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
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
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <h2>مكونات العقار</h2> -->
              <v-expansion-panel v-show="!isSelfBulding">
                <v-expansion-panel-header>
                  <h2 id="item-8">
                    مكونات العقار
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
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
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <h2>تصنيف مستوى تشطيبات البناء</h2> -->

              <v-expansion-panel v-show="!isSelfBulding">
                <v-expansion-panel-header>
                  <h2 id="item-9">
                    تصنيف مستوى تشطيبات البناء
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-radio-group
                    v-model="data.trans_finishing_status_external"
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
                        value="1"
                        name="outsideFinishing"
                      />
                      <v-textarea
                        v-model="data.trans_finishing_external[0]"
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
                        value="2"
                        name="outsideFinishing"
                      />
                      <v-textarea
                        v-model="data.trans_finishing_external[1]"
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
                        value="3"
                        name="outsideFinishing"
                      />
                      <v-textarea
                        v-model="data.trans_finishing_external[2]"
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
                        class="mr-0"
                        label="بدون تشطيب خارجى"
                        value="4"
                        name="outsideFinishing"
                      />
                    </v-col>
                  </v-radio-group>
                  <v-radio-group
                    v-model="data.trans_finishing_status"
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
                        value="1"

                        name="insideFinishing"
                      />
                      <v-textarea
                        v-model="data.trans_finishing_internal[0]"
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
                        value="2"
                        name="insideFinishing"
                      />
                      <v-textarea
                        v-model="data.trans_finishing_internal[1]"
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
                        value="3"
                        name="insideFinishing"
                      />
                      <v-textarea
                        v-model="data.trans_finishing_internal[2]"
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
                        label="بدون تشطيب داخلى"
                        value="4"
                        name="insideFinishing"
                      />
                    </v-col>
                  </v-radio-group>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <h2>الخدمات والمرافق المتوفرة بالبناء</h2> -->
              <v-expansion-panel v-show="!isSelfBulding">
                <v-expansion-panel-header>
                  <h2 id="item-10">
                    الخدمات والمرافق المتوفرة بالبناء
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-checkbox
                        v-model="data.is_telephone"
                        label="هاتف"
                        true-value="1"
                        false-value="0"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-checkbox
                        v-model="data.sanitation"
                        label="صرف صحى"
                        true-value="1"
                        false-value="0"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-checkbox
                        v-model="data.water_meter"
                        label="مياه"
                        true-value="1"
                        false-value="0"
                      />
                      <v-row
                        v-for="(item, index) in data.water_meter_number"
                        :key="item.id"
                        align="end"
                      >
                        <!-- <v-col
                      cols="12"
                      sm="6"
                    >
                      <label
                        class="d-block mb-3 font-weight-bold"
                      >رقم العداد</label>
                      <v-text-field
                        v-model="data.water_meter_number"
                        class="d-inline"
                        label="رقم العداد"
                        single-line
                        outlined
                      />
                    </v-col> -->
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <label
                            class="d-block mb-3 font-weight-bold"
                          >رقم العداد</label>
                          <v-text-field
                            v-model="item.number"
                            class="d-inline"
                            label="رقم العداد"
                            single-line
                            outlined
                            hide-details=""
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-btn
                            color="error"
                            depressed
                            @click.prevent="delete_meter('water' , index)"
                          >
                            <v-icon left>
                              mdi-plus
                            </v-icon>
                            حذف
                          </v-btn>
                        </v-col>
                        <!-- <v-col
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
                    </v-col> -->
                      </v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <label
                          class="d-block font-weight-bold"
                          @click.prevent="add_meter('water')"
                        >
                          <v-icon left> mdi-plus </v-icon>
                          إضافة رقم عداد جديد
                        </label>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-checkbox
                        v-model="data.electric_meter"
                        label="كهرباء"
                        true-value="1"
                        false-value="0"
                      />
                      <v-row
                        v-for="(item, index) in data.electric_meter_number"
                        :key="item.id"
                        align="end"
                      >
                        <!-- <v-col
                      cols="12"
                      sm="6"
                    >
                      <label
                        class="d-block mb-3 font-weight-bold"
                      >رقم العداد</label>
                      <v-text-field
                        v-model="data.water_meter_number"
                        class="d-inline"
                        label="رقم العداد"
                        single-line
                        outlined
                      />
                    </v-col> -->
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <label
                            class="d-block mb-3 font-weight-bold"
                          >رقم العداد</label>
                          <v-text-field
                            v-model="item.number"
                            class="d-inline"
                            label="رقم العداد"
                            single-line
                            outlined
                            hide-details=""
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-btn
                            color="error"
                            depressed
                            @click.prevent="delete_meter('electric' , index)"
                          >
                            <v-icon left>
                              mdi-plus
                            </v-icon>
                            حذف
                          </v-btn>
                        </v-col>
                        <!-- <v-col
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
                    </v-col> -->
                      </v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <label
                          class="d-block font-weight-bold"
                          @click.prevent="add_meter('electric')"
                        >
                          <v-icon left> mdi-plus </v-icon>
                          إضافة رقم عداد جديد
                        </label>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- <h2>المحيط المؤثر للعقار</h2> -->
              <v-expansion-panel v-show="!isSelfBulding">
                <v-expansion-panel-header>
                  <h2 id="item-11">
                    المحيط المؤثر للعقار
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
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
                        label=""
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
                        label=""
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
                        label=""
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
                        label=""
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
                        label=""
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
                        label=""
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
                        label=""
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
                        label=""
                        single-line
                        outlined
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <h2>أسلوب او طريقة التقييم المستخدمة</h2> -->
              <v-expansion-panel v-show="!isSelfBulding">
                <v-expansion-panel-header>
                  <h2 id="item-12">
                    أسلوب او طريقة التقييم المستخدمة
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <template v-if="!isSelfBulding">
                    <div>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          lg="4"
                        >
                          <v-checkbox
                            v-model="data.evaluation_criteria"
                            label="أسلوب السوق"
                            value="1"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          lg="4"
                        >
                          <v-checkbox
                            v-model="data.evaluation_criteria"
                            label="أسلوب الدخل"
                            value="2"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          lg="4"
                        >
                          <v-checkbox
                            v-model="data.evaluation_criteria"
                            label="أسلوب التكلفة (المقاول)"
                            value="3"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          lg="4"
                        >
                          <v-checkbox
                            v-model="data.evaluation_criteria"
                            label="طريقة البيوع المقارنة"
                            value="1"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          lg="4"
                        >
                          <v-checkbox
                            v-model="data.evaluation_criteria"
                            label="طريقة الاستثمار رسملة الدخل"
                            value="2"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          lg="4"
                        >
                          <v-checkbox
                            v-model="data.evaluation_criteria"
                            label="طريقة التكلفة المقاول"
                            value="3"
                          />
                        </v-col>
                      </v-row>
                    </div>
                    <v-divider class="my-10" />
                    <div v-show="data.evaluation_criteria.includes('1')">
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
                    <div v-show="data.evaluation_criteria.includes('2')">
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
                    <div v-show="data.evaluation_criteria.includes('3')">
                      <div>
                        <h2>تقييم الأرض والمبانى</h2>
                        <v-row align="center">
                          <v-col
                            cols="12"
                            md="3"
                          />
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <label class="d-block mb-3 font-weight-bold">المساحة</label>
                          </v-col>
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                          </v-col>
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <label class="d-block mb-3 font-weight-bold">المجموع</label>
                          </v-col>
                        </v-row>
                        <v-row
                          v-for="(b,i) in data.transactions_buildings"
                          :key="i"
                          align="center"
                        >
                          <v-col
                            cols="12"
                            md="3"
                          >
                            <label class="v-label theme--light font-weight-bold">
                              {{ b.building_type }}
                              <v-btn
                                v-if="b.building_type === 'دور أول'"
                                text
                                icon
                                color="blue lighten-2"
                                @click="addNewFloor(i)"
                              >
                                <v-icon>
                                  fas fa-plus
                                </v-icon>
                              </v-btn>
                              <v-btn
                                v-if="b.building_type.includes('دور مكرر')"
                                text
                                icon
                                color="red lighten-2"
                                @click="removeNewFloor(i)"
                              >
                                <v-icon>
                                  fas fa-minus
                                </v-icon>
                              </v-btn>
                            </label>
                          </v-col>
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <v-text-field
                              v-model="b.space"
                              value="153"
                              single-line
                              outlined
                              type="number"
                              hide-details
                              @input="setMultiOfSpaceAndPrice(b.id||b.__uuid)"
                            />
                          </v-col>
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <vuetify-money
                              v-model.number="b.price"
                              outlined
                              single-line
                              :options="{
                                locale: 'en-US',
                                prefix: '',
                                suffix: '',
                                length: 11,
                                precision: 2,
                              }"
                              hide-details
                              @input="setMultiOfSpaceAndPrice(b.id||b.__uuid)"
                            />
                          </v-col>
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <vuetify-money
                              v-model="b.total"
                              outlined
                              single-line
                              :options="{
                                locale: 'en-US',
                                prefix: '',
                                suffix: '',
                                length: 11,
                                precision: 2,
                              }"
                              disabled
                              hide-details
                            />
                          </v-col>
                        </v-row>

                        <!-- END -->
                        <!-- <v-row align="center">
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
                  </v-row> -->
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
                              @input="setCostTotal(index)"
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

                    <div v-show="data.evaluation_criteria.length > 1">
                      <v-divider class="my-10" />
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
                  </template>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- <h2>الصور الفوتوغرافية</h2> -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-13">
                    الصور الفوتوغرافية
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <!-- {{ data.images }} -->
                    <!-- <v-row> -->
                    <draggable
                      v-model="data.images"
                      @change="dragChange($event)"
                      @update="dargUpdate($event)"
                    >
                      <transition-group
                        tag="div"
                        class="images-draggable-container"
                        name="grid"
                        type="transition"
                      >
                        <div
                          v-for="(image,index) in data.images"
                          :key="image.id"
                          class="upload-img-container"
                        >
                          <div>
                            <img
                              v-if="image.image"
                              :src="image.image"
                              :class="{'hidden-img': image.status !== '1' }"
                            >
                            <img
                              v-else-if="image.image_url"
                              :src="image.image_url"
                              :class="{'hidden-img': image.status !== '1' }"
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
                                v-if="image.status === '1'"
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
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <h2>بيانات اضافية</h2> -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 id="item-14">
                    بيانات اضافية
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
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
                          v-model="data.trans_internal_notes"
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
                          v-model="data.trans_currency"
                          :items="transCurrencyList"
                          item-text="name"
                          item-value="id"
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
                          v-model="data.trans_professional_standard"
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
                          v-model="data.acknowledgment_independence"
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
                          v-model="data.trans_restrictions_publication"
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
                          v-model="data.trans_evacuation_responsibility"
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
                          v-model="data.trans_special_assumptions"
                          label="الافتراضات الخاصة ان وجدت"
                          single-line
                          outlined
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- <v-divider class="my-10" /> -->

            <!-- <v-divider class="my-10" /> -->

            <!-- <v-divider class="my-10" />

            <v-divider
              v-show="!isSelfBulding"
              class="my-10"
            /> -->

            <!-- <div v-show="!isSelfBulding">
              <h2>تصنيف مستوى تشطيبات البناء</h2>
            </div> -->

            <!-- <v-divider
              v-show="!isSelfBulding"
              class="my-10"
            />
            <v-divider
              v-show="!isSelfBulding"
              class="my-10"
            /> -->
            <!-- <v-divider
              v-show="!isSelfBulding"
              class="my-10"
            /> -->
            <!-- <div>
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
            <v-divider class="my-10" /> -->

            <!-- <v-divider class="my-10" />
            <v-divider class="my-10" /> -->
            <v-row
              class="mb-10"
              align="center"
              justify="space-between"
            >
              <div>
                <v-btn
                  v-if="data.status === 3 || data.status === 4"
                  x-large
                  class="ma-2 orange-btn"
                  :disabled="dataLoading"
                  :loading="buttonsLoading.back"
                  @click="openDialog('back')"
                >
                  <v-icon left>
                    fas fa-redo
                  </v-icon>
                  اعادة الى المرحلة السابقة
                </v-btn>
                <v-btn
                  v-if="data.status === 1 || data.status === 2 || data.status === 3 || data.status === 4 "
                  x-large
                  class="ma-2"
                  color="blue"
                  :disabled="dataLoading"
                  :loading="buttonsLoading.save"
                  @click="save('save')"
                >
                  <v-icon left>
                    fas fa-save
                  </v-icon>
                  حفظ
                </v-btn>
                <v-btn
                  v-if="data.status < 4"
                  x-large
                  class="ma-2"
                  outlined
                  color="blue"
                  :disabled="dataLoading"
                  :loading="buttonsLoading.send"
                  @click="openDialog('send')"
                >
                  <v-icon left>
                    far fa-paper-plane
                  </v-icon>
                  إرسال
                </v-btn>
                <v-btn
                  v-show="data.status === 4"
                  x-large
                  class="ma-2 light-green-btn"
                  outlined
                  :disabled="dataLoading"
                  :loading="buttonsLoading.approve"
                  @click="openDialog('approve')"
                >
                  <v-icon left>
                    far fa-check-circle
                  </v-icon>
                  اعتماد
                </v-btn>
              </div>
              <div>
                <v-btn
                  v-show="data.status === 1 || data.status === 3 || data.status === 4"
                  x-large
                  class="ma-2"
                  color="black"
                  :disabled="dataLoading"
                  :loading="buttonsLoading.suspend"
                  @click="openDialog('suspend')"
                >
                  تعليق
                </v-btn>
                <v-btn
                  v-show="data.status === 7"
                  x-large
                  class="ma-2"
                  color="black"
                  :disabled="dataLoading"
                  :loading="buttonsLoading.cancelSuspend"
                  @click="openDialog('cancelSuspend')"
                >
                  إلغاء التعليق
                </v-btn>
                <v-btn
                  v-show="data.status === 1 || data.status === 3 || data.status === 4"
                  x-large
                  class="ma-2"
                  color="error"
                  :disabled="dataLoading"
                  :loading="buttonsLoading.cancel"
                  @click="openDialog('cancel')"
                >
                  الغاء
                </v-btn>
              </div>
            </v-row>
          </form>
        </div>
      </v-container>
      <!-- {{ buttonsDialog }} -->
      <v-dialog v-model="buttonsDialog.show">
        <v-card>
          <v-card-title class="text-h5">
            {{ buttonsDialog.title }}
          </v-card-title>

          <v-card-text>
            {{ buttonsDialog.body }}
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="red darken-1"
              text
              @click="buttonsDialog.show = false"
            >
              إلغاء
            </v-btn>

            <v-btn
              :color="buttonsDialog.saveButton.color"
              :class="buttonsDialog.saveButton.class"
              text
              @click="buttonsDialog.saveButton.action"
            >
              <v-icon v-if="buttonsDialog.saveButton.icon !== ''">
                {{ buttonsDialog.saveButton.icon }}
              </v-icon>
              {{ buttonsDialog.saveButton.text }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="successSnackbar"
        left
        bottom
        color="green"
      >
        {{ successMessage }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script src="./script.js">
</script>

<style lang="scss" scoped>
.pdf-container{
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  width: 160px;
  padding: 15px;
  border-radius: 10px;
}

.pdf-container a {
  width: 100px;
  display: inline-block;
    text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
.v-expansion-panels {
  margin-bottom: 30px !important;
}

.v-expansion-panel-content {
  margin-top:10px !important;
}
.v-expansion-panel-header {
  padding: 20px 24px !important;
}
/* .grid-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
} */
</style>
