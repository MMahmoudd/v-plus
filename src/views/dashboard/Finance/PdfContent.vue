<template>
  <div id="pdf-content">
    <div class="container-header">
      test
      <div class="html2pdf__page-break" />
    </div>
  </div>
</template>
<script>
  // import defaultValues from './defaultValuesForPdf.js'

  export default {
    name: 'PdfContent',
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
    },
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap');
#pdf-content {
  width: 90%;
  margin: 30px auto;
}
.first {
  margin-top: 30px;
}
.last {
  margin-bottom: 30px;
}
.container-header {
  width:97%;
  margin: auto;
  direction: rtl;
  text-align: right;
}
.container-header h1 {
  font-size: 28px;
}
.container-header .color {
  color: #187F7B;
}
.container-header .sub-header {
  direction: rtl;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-top:10px;
  margin-bottom:10px;
}
.container-header .sub-header h2 {
  font-size: 20px;
}
.container-header .sub-header h3 {
  font-size: 16px;
  color: #57585A;
}
.not-empty {
  min-height: 60px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #57585A;
  margin-bottom: 30px;
}
*:not(.v-icon){
    font-family: 'Baloo Bhaijaan 2', cursive;
  font-weight: normal;

}
table {
  width:100%;
  direction: rtl;
}
table.table-fixed {
  table-layout: fixed;
}
table, th, td {
  border: 1px solid #ccc;
  border-collapse: collapse;
}
table:not(:first-child), table:not(:first-child) th {
  border-top: unset;
}
.colspan td {
  padding: 3px;
}
td {
  padding: 10px;
}
tbody td {
  text-align: center;
}
table thead, .thead {
  background: #187F7B;
  color: #fff;
}
table thead.diff {
  background: #57585A;
  color: #fff;
}
table thead .header {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
table thead th {
  text-align: right;
  font-size:18px;
}
table tbody.has-fields tr td.field {
  background: #F3F5F5;
}

.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.text-align-center .v-input--checkbox {
  display: inline-block;
}

.checkbox-label {
  color: #333;
}
</style>
