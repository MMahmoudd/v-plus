<template>
  <v-container>
    <v-card>
      <v-form
        :disabled="!permissions.update || !permissions.add"
        @submit.prevent="submitForm()"
      >
        <v-row
          justify="space-between"
          align="center"
          class="px-10 pt-4"
        >
          <span>مصاريف سنة</span>
        </v-row>
        <v-row
          justify="space-between"
          align="center"
          class="px-7 pt-4"
        >
          <v-col
            cols="12"
            md="3"
            class="pb-0 pb-0 pl-1"
          >
            <v-text-field
              v-model="year"
              class="mb-0"
              type="number"
              label="ادخل السنة"
              dense
              outlined
            />
          </v-col>
          <v-col
            cols="6"
            md="5"
            class="mb-0 mt-0 pt-0 pr-0"
          >
            <v-btn
              class="time-chip"
              color="primary"
              label
              text-color="white"
              @click="fetchAllItems(year)"
            >
              <span>أذهب</span>
            </v-btn>
          </v-col>
          <v-col
            cols="6"
            md="4"
            class="text-left mt-0 pt-0"
          >
            <v-btn
              class="time-chip"
              color="primary"
              label
              text-color="white"
              type="submit"
              :disabled="disabled || !permissions.update || !permissions.add"
            >
              <v-icon
                left
                small
              >
                mdi-content-save
              </v-icon>
              <span>حفظ التعديلات</span>
            </v-btn>
          </v-col>
        </v-row>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر يناير</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Jan"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Jan"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Jan"
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Jan"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر فبراير</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Feb"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Feb"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Feb"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Feb"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر مارس</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Mar"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Mar"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Mar"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Mar"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر ابريل</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Apr"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Apr"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Apr"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Apr"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر مايو</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_May"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_May"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_May"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_May"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر يونيو</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Jun"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Jun"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Jun"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Jun"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر يوليو</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Jul"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Jul"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Jul"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Jul"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر اغسطس</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Aug"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Aug"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Aug"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Aug"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر سبتمبر</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Sept"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Sept"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Sept"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Sept"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر اكتوبر</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Oct"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Oct"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Oct"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Oct"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر نوفمبر</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Nov"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Nov"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Nov"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Nov"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <div
          class="mt-10 mx-10"
        >
          <h2>شهر ديسمبر</h2>
          <v-row class="mt-2">
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <label
                class="d-block mb-3 font-weight-bold"
              >اجمالي المصاريف الثابتة</label>
              <v-text-field
                v-model="dataOfYear.total_fixed_Dec"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف الثابتة"
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
              >إجمالي المصاريف المتغيرة</label>
              <v-text-field
                v-model="dataOfYear.total_static_Dec"
                :disabled="disabled"
                type="number"
                label="إجمالي المصاريف المتغيرة"
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
              >أجمالي مصاريف الشهر</label>
              <v-text-field
                v-model="total_month_Dec"
                disabled
                type="number"
                label="أجمالي المصاريف الشهر"
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
              <label class="d-block mb-3 font-weight-bold">ملاحظات</label>
              <v-textarea
                v-model="dataOfYear.note_Dec"
                :disabled="disabled"
                label="ملاحظات"
                rows="3"
                single-line
                outlined
              />
            </v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>

        <h2 class="mx-9 primary--text">
          أجمالي مصاريف السنة
        </h2>
        <v-row class="mx-6 mt-4">
          <v-col
            cols="12"
            lg="3"
            md="4"
          >
            <label
              class="d-block mb-3 font-weight-bold"
            >اجمالي مصاريف الثابتة</label>
            <v-text-field
              v-model="totalFixed"
              type="number"
              disabled
              label="إجمالي المصاريف الثابتة"
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
            >إجمالي مصاريف المتغيرة</label>
            <v-text-field
              v-model="totalStatic"
              type="number"
              disabled
              label="إجمالي المصاريف المتغيرة"
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
            <label class="d-block mb-3 font-weight-bold">أجمالي مصاريف السنة</label>
            <v-text-field
              v-model="totalYear"
              type="number"
              disabled
              label="أجمالي مصاريف السنة"
              single-line
              outlined
            />
          </v-col>

          <v-col
            cols="12"
            lg="3"
            md="4"
            sm="6"
            class="d-flex align-center"
          >
            <v-btn
              class="time-chip mr-auto"
              color="primary"
              label
              text-color="white"
              type="submit"
              :disabled="disabled || !permissions.update || !permissions.add"
            >
              <v-icon
                left
                small
              >
                mdi-content-save
              </v-icon>
              <span>حفظ التعديلات</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
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
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const ExpenseService = ServiceFactory.get('Expense')
  export default {
    data: () => ({
      permissions: {},
      loading: false,
      disabled: true,
      year: null,
      dataOfYear: {
        total_static_Jan: null,
        total_fixed_Jan: null,
        total_month_Jan: null,
        note_Jan: '',
        total_static_Feb: null,
        total_fixed_Feb: null,
        total_month_Feb: null,
        note_Feb: '',
        total_static_Mar: null,
        total_fixed_Mar: null,
        total_month_Mar: null,
        note_Mar: '',
        total_static_Apr: null,
        total_fixed_Apr: null,
        total_month_Apr: null,
        note_Apr: '',
        total_static_May: null,
        total_fixed_May: null,
        total_month_May: null,
        note_May: '',
        total_static_Jun: null,
        total_fixed_Jun: null,
        total_month_Jun: null,
        note_Jun: '',
        total_static_Jul: null,
        total_fixed_Jul: null,
        total_month_Jul: null,
        note_Jul: '',
        total_static_Aug: null,
        total_fixed_Aug: null,
        total_month_Aug: null,
        note_Aug: '',
        total_static_Sept: null,
        total_fixed_Sept: null,
        total_month_Sept: null,
        note_Sept: '',
        total_static_Oct: null,
        total_fixed_Oct: null,
        total_month_Oct: null,
        note_Oct: '',
        total_static_Nov: null,
        total_fixed_Nov: null,
        total_month_Nov: null,
        note_Nov: '',
        total_static_Dec: null,
        total_fixed_Dec: null,
        total_month_Dec: null,
        note_Dec: '',
        year: '',
        id: 0,
      },
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
    }),
    computed: {
      total_month_Jan: function () {
        return +this.dataOfYear.total_static_Jan + +this.dataOfYear.total_fixed_Jan
      },
      total_month_Feb: function () {
        return +this.dataOfYear.total_static_Feb + +this.dataOfYear.total_fixed_Feb
      },
      total_month_Mar: function () {
        return +this.dataOfYear.total_static_Mar + +this.dataOfYear.total_fixed_Mar
      },
      total_month_Apr: function () {
        return +this.dataOfYear.total_static_Apr + +this.dataOfYear.total_fixed_Apr
      },
      total_month_May: function () {
        return +this.dataOfYear.total_static_May + +this.dataOfYear.total_fixed_May
      },
      total_month_Jun: function () {
        return +this.dataOfYear.total_static_Jun + +this.dataOfYear.total_fixed_Jun
      },
      total_month_Jul: function () {
        return +this.dataOfYear.total_static_Jul + +this.dataOfYear.total_fixed_Jul
      },
      total_month_Aug: function () {
        return +this.dataOfYear.total_static_Aug + +this.dataOfYear.total_fixed_Aug
      },
      total_month_Sept: function () {
        return +this.dataOfYear.total_static_Sept + +this.dataOfYear.total_fixed_Sept
      },
      total_month_Oct: function () {
        return +this.dataOfYear.total_static_Oct + +this.dataOfYear.total_fixed_Oct
      },
      total_month_Nov: function () {
        return +this.dataOfYear.total_static_Nov + +this.dataOfYear.total_fixed_Nov
      },
      total_month_Dec: function () {
        return +this.dataOfYear.total_static_Dec + +this.dataOfYear.total_fixed_Dec
      },
      totalStatic: function () {
        return +this.dataOfYear.total_static_Jan + +this.dataOfYear.total_static_Feb + +this.dataOfYear.total_static_Mar + +this.dataOfYear.total_static_Apr + +this.dataOfYear.total_static_May + +this.dataOfYear.total_static_Jun + +this.dataOfYear.total_static_Jul + +this.dataOfYear.total_static_Aug + +this.dataOfYear.total_static_Sept + +this.dataOfYear.total_static_Oct + +this.dataOfYear.total_static_Nov + +this.dataOfYear.total_static_Dec
      },
      totalFixed: function () {
        return +this.dataOfYear.total_fixed_Jan + +this.dataOfYear.total_fixed_Feb + +this.dataOfYear.total_fixed_Mar + +this.dataOfYear.total_fixed_Apr + +this.dataOfYear.total_fixed_May + +this.dataOfYear.total_fixed_Jun + +this.dataOfYear.total_fixed_Jul + +this.dataOfYear.total_fixed_Aug + +this.dataOfYear.total_fixed_Sept + +this.dataOfYear.total_fixed_Oct + +this.dataOfYear.total_fixed_Nov + +this.dataOfYear.total_fixed_Dec
      },
      totalYear: function () {
        return +this.totalStatic + +this.totalFixed
      },
    },
    mounted () {
      this.permissions = this.can('المصروفات')
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          total_static_Jan: this.dataOfYear.total_static_Jan,
          total_fixed_Jan: this.dataOfYear.total_fixed_Jan,
          total_month_Jan: this.total_month_Jan,
          note_Jan: this.dataOfYear.note_Jan,
          total_static_Feb: this.dataOfYear.total_static_Feb,
          total_fixed_Feb: this.dataOfYear.total_fixed_Feb,
          total_month_Feb: this.total_month_Feb,
          note_Feb: this.dataOfYear.note_Feb,
          total_static_Mar: this.dataOfYear.total_static_Mar,
          total_fixed_Mar: this.dataOfYear.total_fixed_Mar,
          total_month_Mar: this.total_month_Mar,
          note_Mar: this.dataOfYear.note_Mar,
          total_static_Apr: this.dataOfYear.total_static_Apr,
          total_fixed_Apr: this.dataOfYear.total_fixed_Apr,
          total_month_Apr: this.total_month_Apr,
          note_Apr: this.dataOfYear.note_Apr,
          total_static_May: this.dataOfYear.total_static_May,
          total_fixed_May: this.dataOfYear.total_fixed_May,
          total_month_May: this.total_month_May,
          note_May: this.dataOfYear.note_May,
          total_static_Jun: this.dataOfYear.total_static_Jun,
          total_fixed_Jun: this.dataOfYear.total_fixed_Jun,
          total_month_Jun: this.total_month_Jun,
          note_Jun: this.dataOfYear.note_Jun,
          total_static_Jul: this.dataOfYear.total_static_Jul,
          total_fixed_Jul: this.dataOfYear.total_fixed_Jul,
          total_month_Jul: this.total_month_Jul,
          note_Jul: this.dataOfYear.note_Jul,
          total_static_Aug: this.dataOfYear.total_static_Aug,
          total_fixed_Aug: this.dataOfYear.total_fixed_Aug,
          total_month_Aug: this.total_month_Aug,
          note_Aug: this.dataOfYear.note_Aug,
          total_static_Sept: this.dataOfYear.total_static_Sept,
          total_fixed_Sept: this.dataOfYear.total_fixed_Sept,
          total_month_Sept: this.total_month_Sept,
          note_Sept: this.dataOfYear.note_Sept,
          total_static_Oct: this.dataOfYear.total_static_Oct,
          total_fixed_Oct: this.dataOfYear.total_fixed_Oct,
          total_month_Oct: this.total_month_Oct,
          note_Oct: this.dataOfYear.note_Oct,
          total_static_Nov: this.dataOfYear.total_static_Nov,
          total_fixed_Nov: this.dataOfYear.total_fixed_Nov,
          total_month_Nov: this.total_month_Nov,
          note_Nov: this.dataOfYear.note_Nov,
          total_static_Dec: this.dataOfYear.total_static_Dec,
          total_fixed_Dec: this.dataOfYear.total_fixed_Dec,
          total_month_Dec: this.total_month_Dec,
          note_Dec: this.dataOfYear.note_Dec,
          year: this.dataOfYear.year,
          id: this.dataOfYear.id,
        }
        if (this.dataOfYear.id > 0) {
          this.updateContent(this.year, formData)
        } else {
          delete formData.id
          formData.year = this.year
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await ExpenseService.addExpense(data)
        if (item.success === true) {
          this.successMessage = 'تمت الاضافة بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.go('/expenses')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (id, data) {
        this.disabled = false
        this.loading = false
        const item = await ExpenseService.updateExpense(id, data)
        if (item.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.go('/expenses')
          }, 1500)
        } else {
          this.errorMessage('يوجد مشكلة في التعديل')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchAllItems (year) {
        this.dataLoading = true
        const items = await ExpenseService.fetchOneItem(year)
        console.log('items.data', items)
        if (items.success === true) {
          this.dataOfYear = items.data
          this.disabled = false
        } else if (items.status === false) {
          this.disabled = false
        }
        this.dataLoading = false
      },
    },
  }
</script>
