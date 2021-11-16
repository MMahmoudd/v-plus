<template>
  <v-container class="price_offers">
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        العملاء
      </h1>
      <v-btn
        class="ma-2 time-chip"
        color="blue"
        label
        text-color="white"
      >
        <v-icon left>
          mdi-account-plus
        </v-icon>
        <span>اضافة عميل</span>
      </v-btn>
    </v-row>
    <v-row class="table_container">     <v-col cols="12">
        </v-col>
    </v-row>
        </v-container>
</template>

<script>
  export default {}
</script>

<style scss>
.price_offers{
  padding: 2rem 3rem;
}
.table_container{
  height: 40rem;
  background: white;
  width: 100%;
}
</style>
