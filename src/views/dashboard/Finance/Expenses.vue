<template>
  <v-container>
    <v-row
      justify="space-between"
      align="center"
      class="mx-10 mt-4"
    >
      <span>اضافة مصاريف سنة</span>
    </v-row>
    <v-row
      justify="space-between"
      align="center"
      class="mx-7 mt-4"
    >
      <v-col
        cols="12"
        md="3"
        class="mb-0 pb-0 pl-1"
      >
        <v-text-field
          class="mb-0"
          label="إجمالي المصاريف المتغيرة"
          single-line
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
          @click="dialog = !dialog"
        >
          <span> أذهب</span>
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
          @click="dialog = !dialog"
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
      v-for="n in 8"
      :key="n.index"
      class="mt-10 mx-10"
    >
      <h2>الشهر</h2>
      <v-row class="mt-2">
        <v-col
          cols="12"
          lg="3"
          md="4"
        >
          <label
            class="d-block mb-3 font-weight-bold"
          >إجمالي المصاريف الثابتة</label>
          <v-text-field
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
          >أجمالي المصاريف الشهر</label>
          <v-text-field
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
          <v-text-field
            label="ملاحظات"
            single-line
            outlined
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />
    </div>
  </v-container>
</template>

<script>
  export default {}
</script>

<style></style>
