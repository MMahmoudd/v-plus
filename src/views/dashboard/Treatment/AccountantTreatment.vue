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
              <h2>التفاصيل المالية</h2>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >السعر</label>
                  <v-text-field
                    label="السعر"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row
                align="center"
              >
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >اسم المشارك فى التقرير</label>
                  <v-text-field
                    label="اسم المشارك فى التقرير"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="5"
                  md="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >العمولات</label>
                  <v-text-field
                    label="مبلغ"
                    single-line
                    outlined
                  />
                </v-col>
                <v-col
                  cols="2"
                  md="1"
                >
                  أو
                </v-col>
                <v-col
                  cols="5"
                  md="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >-</label>
                  <v-text-field
                    label="% نسبة"
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-divider class="my-10" />

              <v-row
                class="mb-10"
              >
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
              </v-row>
            </div>
          </form>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'NewTreatment',

    data: () => ({
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
    }),
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
</style>
