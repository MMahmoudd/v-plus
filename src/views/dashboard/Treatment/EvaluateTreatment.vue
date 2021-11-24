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
                  sm="6"
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
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم مستخدم التقرير</label>
                  <v-text-field
                    label="اسم مستخدم التقرير"
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
                  >جوال مستخدم التقرير</label>
                  <v-text-field
                    label="جوال مستخدم التقرير"
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
                  >الغرض من التقييم</label>
                  <v-select
                    :items="items"
                    label="الغرض من التقييم"
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
                  >أساس القيمة</label>
                  <v-select
                    :items="items"
                    label="أساس القيمة"
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
                  >فرضية القيمة</label>
                  <v-select
                    :items="items"
                    label="فرضية القيمة"
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
                  >تاريخ التكليف</label>
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
                  lg="3"
                  md="4"
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رمز إيداع التقرير</label>
                  <v-text-field
                    label="رمز إيداع التقرير"
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
                  sm="6"
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
                  <v-text-field
                    label="اسم المنطقة"
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
                  >اسم المدينة</label>
                  <v-text-field
                    label="اسم المدينة"
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
                  <label class="d-block mb-3 font-weight-bold">اسم الحى</label>
                  <v-text-field
                    label="اسم الحى"
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
                  >اسم الشارع</label>
                  <v-text-field
                    label="اسم الشارع"
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
                  sm="6"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >رقم المخطط</label>
                  <v-text-field
                    label="رقم المخطط"
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
                  >رقم البلوك</label>
                  <v-text-field
                    label="رقم البلوك"
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
                  >رقم القطعة</label>
                  <v-text-field
                    label="رقم القطعة"
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
                  >استخدام العقار</label>
                  <v-select
                    :items="items"
                    label="استخدام العقار"
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
                  >نوع العقار</label>
                  <v-select
                    :items="items"
                    label="نوع العقار"
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
                  >اسم المالك</label>
                  <v-text-field
                    label="اسم المالك"
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
                  >جوال المالك</label>
                  <v-text-field
                    label="جوال المالك"
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
                  <label class="d-block mb-3 font-weight-bold">رقم الصك</label>
                  <v-text-field
                    label="رقم الصك"
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
                  >تاريخ الصك</label>
                  <v-text-field
                    label="تاريخ الصك"
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
                  >رقم رخصة البناء</label>
                  <v-text-field
                    label="رقم رخصة البناء"
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
                  >تاريخ رخصة البناء</label>
                  <v-text-field
                    label="تاريخ رخصة البناء"
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
                  >عمر البناء</label>
                  <v-text-field
                    label="عمر البناء"
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
                  >رقم محضر التجزئة</label>
                  <v-text-field
                    label="رقم محضر التجزئة"
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
                  >تاريخ محضر التجزئة</label>
                  <v-text-field
                    label="تاريخ محضر التجزئة"
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
                  >حالة البناء</label>
                  <v-select
                    :items="items"
                    label="حالة البناء"
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
                  >حالة الأشغال</label>
                  <v-select
                    :items="items"
                    label="حالة الأشغال"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  sm="6"
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
                  cols="8"
                  sm="4"
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
                  cols="4"
                  sm="2"
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
                  sm="6"
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
                  cols="8"
                  sm="4"
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
                  cols="4"
                  sm="2"
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
                  sm="6"
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
                  cols="8"
                  sm="4"
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
                  cols="4"
                  sm="2"
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
                  sm="6"
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
                  cols="8"
                  sm="4"
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
                  cols="4"
                  sm="2"
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
                  sm="6"
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

            <v-divider class="my-10" />

            <div>
              <h2>احداثيات العقار</h2>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <div id="map" />
                </v-col>
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
                    v-model="long"
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
                    v-model="lat"
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
                      @click.prevent="getMap(lat,long)"
                    >
                      <v-icon left>
                        fas fa-map-marker-alt
                      </v-icon>
                      موقعى
                    </v-btn>
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
                    label="1525"
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
                    :items="items"
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
                    :items="items"
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
                    :items="items"
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
                    :items="items"
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
                    label="1525"
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
                    label="1525"
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
                    label="1525"
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
                    label="1525"
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
                    label="5"
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
                    v-model="row"
                    row
                  >
                    <v-radio
                      label="نعم"
                      value="radio-1"
                    />
                    <v-radio
                      label="لا"
                      value="radio-2"
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
                    v-model="row"
                    row
                  >
                    <v-radio
                      label="من داخل العقار"
                      value="radio-1"
                    />
                    <v-radio
                      label="من خارج العقار"
                      value="radio-2"
                    />
                    <v-radio
                      label="من الداخل والخارج"
                      value="radio-3"
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
                    label="5"
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
                    label="4"
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
                    label="4"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                    label="5"
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
                v-model="row"
                row
              >
                <v-col
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <v-radio
                    class="mb-2"
                    label="تشطيب فاخر"
                    value="radio-1"
                    name="tash"
                  />
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيبات خارجية</label>
                  <v-textarea
                    name="input-7-1"
                    single-line
                    outlined
                  />
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيبات داخلية</label>
                  <v-textarea
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
                    class="mb-2"
                    label="تشطيب متوسط"
                    value="radio-2"
                    name="tash"
                  />
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيبات خارجية</label>
                  <v-textarea
                    name="input-7-1"
                    single-line
                    outlined
                  />
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيبات داخلية</label>
                  <v-textarea
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
                    class="mb-2"
                    label="تشطيب عادى"
                    value="radio-3"
                    name="tash"
                  />
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيبات خارجية</label>
                  <v-textarea
                    name="input-7-1"
                    single-line
                    outlined
                  />
                  <label
                    class="d-block mb-3 font-weight-bold text-right"
                  >تشطيبات داخلية</label>
                  <v-textarea
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
                    class="mb-2"
                    label="بدون تشطيب"
                    value="radio-4"
                    name="tash"
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
            <div v-show="evaluateType == 'evaluateType1'">
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
                              <v-select
                                class="mt-3"
                                :items="items"
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
                            <td>
                              <v-text-field
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
                              <v-select
                                class="mt-3"
                                :items="items"
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
                            <td>
                              <v-text-field
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
                              <v-select
                                class="mt-3"
                                :items="items"
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
              </div>
              <v-divider class="my-10" />
              <div>
                <h2>نوع التسوية</h2>
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
                </v-row>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسوية شروط التمويل</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">% إجمالى تسويات التمويل والسوق</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">سعر البيع بعد تسوية شروط التمويل وظروف السوق</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسوية المساحة</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">تسويات أخرى</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">مجموع نسب التسويات</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">سعر البيع بعد التسويات</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">الأوزان النسبية للعقارات المقارنة</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">مساهمة العقارات المقارنة حسب الوزن النسبى</label>
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
                          <tr>
                            <td>
                              <label class="v-label theme--light">القيمة السوقية بطريقة البيوع المقارنة</label>
                            </td>
                            <td colspan="3">
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
              </div>
            </div>
            <div v-show="evaluateType == 'evaluateType2'">
              <div>
                <h2>تقييم الايجارات</h2>
                <v-row>
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
                      label="صافى الدخل"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
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
                    <v-text-field
                      single-line
                      outlined
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
                    <v-text-field
                      single-line
                      outlined
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
                    <v-text-field
                      single-line
                      outlined
                    />
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
                    <v-text-field
                      single-line
                      outlined
                    />
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
                    <v-text-field
                      single-line
                      outlined
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
                    <v-text-field
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    sm="4"
                  >
                    <label class="v-label theme--light font-weight-bold">القيمة السوقية باستخدام طريقة رسملة الدخل</label>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="9"
                    sm="8"
                  >
                    <v-text-field
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
              </div>
            </div>
            <div v-show="evaluateType == 'evaluateType3'">
              <div>
                <h2>تقييم الأرض والمبانى</h2>
                <v-row>
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
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المجموع</label>
                    <v-text-field
                      value="153"
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
                    <label class="v-label theme--light font-weight-bold">المبانى</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المساحة</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المجموع</label>
                    <v-text-field
                      value="153"
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
                    <label class="v-label theme--light font-weight-bold">القبو</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المساحة</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المجموع</label>
                    <v-text-field
                      value="153"
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
                    <label class="v-label theme--light font-weight-bold">الملاحق</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المساحة</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المجموع</label>
                    <v-text-field
                      value="153"
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
                    <label class="v-label theme--light font-weight-bold">الأسوار</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المساحة</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المجموع</label>
                    <v-text-field
                      value="153"
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
                    <label class="v-label theme--light font-weight-bold">أخرى</label>
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المساحة</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">سعر المتر</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="4"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المجموع</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="3"
                  >
                    <label class="v-label theme--light font-weight-bold">المجموع</label>
                  </v-col>
                  <v-col
                    cols="9"
                  >
                    <v-text-field
                      value="153"
                      single-line
                      outlined
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
                    <label class="d-block mb-3 font-weight-bold">قيمة الاستبدال</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">ملاحظات اضافية</label>
                    <v-text-field
                      label="ملاحظات اضافية"
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
                    <label class="d-block mb-3 font-weight-bold">التكاليف المباشرة</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">ملاحظات اضافية</label>
                    <v-text-field
                      label="ملاحظات اضافية"
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
                    <label class="d-block mb-3 font-weight-bold">التكاليف الغير المباشرة</label>
                    <v-text-field
                      value="153"
                      single-line
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <label class="d-block mb-3 font-weight-bold">ملاحظات اضافية</label>
                    <v-text-field
                      label="ملاحظات اضافية"
                      single-line
                      outlined
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
                            #
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">التقادم الوظيفى</label>
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">التقادم الاقتصادى</label>
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">إجمالى الإهلاك</label>
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">إهلاك المبانى</label>
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">إهلاك أعمال الموقع</label>
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">أرباح المطور</label>
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">القيمة السوقية بأسلوب التكلفة</label>
                          </td>
                          <td colspan="2">
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
                            #
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">مساهمة الطرق المستخدمة حسب الوزن النسبى</label>
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
                        <tr>
                          <td>
                            <label class="v-label theme--light">القيمة السوقية بعد الترجيح رقماً</label>
                          </td>
                          <td colspan="3">
                            <v-text-field
                              class="mt-3"
                              single-line
                              outlined
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label class="v-label theme--light">القيمة السوقية بعد الترجيح كتابة</label>
                          </td>
                          <td colspan="3">
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
              <v-row>
                <v-col
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
                    <img :src="image.image">
                    <button
                      class="remove-img"
                      @click.prevent="removeImage(image,index)"
                    >
                      <v-icon left>
                        fas fa-trash-alt
                      </v-icon>
                    </button>
                    <input
                      v-model="imageSorting[index]"
                      type="text"
                      class="img-num"
                    >
                  </div>
                </v-col>
              </v-row>
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
  import Swal from 'sweetalert2'
  import { copyText } from 'vue3-clipboard'
  import { Loader } from '@googlemaps/js-api-loader'
  const loader = new Loader('AIzaSyACo4RXxzSABqvI3S_Q3_nQ2YIW4HfJuXI')

  export default {
    name: 'EvaluateTreatment',
    data: () => ({
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
      evaluateType: 'evaluateType1',
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
      images: [
        {
          image: false,
        },
      ],
      imageSorting: [],
    }),

    mounted () {
      this.getMap(this.lat, this.long)
    },
    methods: {
      // Copy Lat & Long of map
      doCopy: function () {
        copyText(this.lat + ',' + this.long, undefined, (error, event) => {
          if (error) {
            alert('Can not copy')
            console.log(error)
          } else {
            // alert('Copied')
            Swal.fire({
              title: 'Copied!',
              icon: 'success',
              timer: 2000,
            })
            console.log(event)
          }
        })
      },
      // Show Map with Marker
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
      // Show Image After Upload
      onFileChange (item, e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(item, files[0])
      },
      createImage (item, file) {
        // var image = new Image()
        var reader = new FileReader()
        reader.onload = (e) => {
          item.image = e.target.result
        }
        reader.readAsDataURL(file)
        this.images.push({ image: false })
      },
      removeImage: function (item, index) {
        item.image = false
        this.images.splice(index, 1)
        // Remove sort of image
        this.imageSorting.splice(index, 1)
      },
      // Adding & Remove Participant
      addParticipant: function () {
        this.participants.push({ participant: true })
      },
      removeParticipant: function (item) {
        item.participant = false
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
.upload-img-container > div{
  width: 100%;
  height: 120px;
  background: #f9f9f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.upload-img-container > div > i{
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
.img-num{
  position: absolute;
  width: 25px;
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
</style>
