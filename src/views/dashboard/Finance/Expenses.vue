<template>
  <v-container>
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
