<template>
  <div>
    <v-menu
      ref="menu"
      v-model="hejriCallender"
      :close-on-content-click="false"
      :return-value.sync="computedDate"
      transition="scale-transition"
      offset-x
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :id="id"
          outlined
          single-line
          clearable
          :value="focus ? innerDate :computedDate"
          prepend-icon="mdi-calendar"
          placeholder="YYYY/MM/DD Format"
          hint="YYYY/MM/DD Format"
          v-bind="attrs"
          @click:clear="handleClear"
          @focus="focus= true"
          @blur="focus=false"
          @input="handleInput"
          v-on="on"
        />
      </template>
      <v-date-picker
        :close-on-content-click="true"
        class="hijri-date"
        :value="value"
        :element="id"
        calendar="hijri"
        locale="ar-sa"
        format="YYYY-MM-DD HH:mm"
        transition="scale-transition"
        offset-y
        min-width="auto"
        @change="value => handleChange(value)"
      />
    </v-menu>
  </div>
</template>
<script>
  import { format } from 'date-fns/esm'
  import { uuid } from 'vue-uuid'
  import moment from 'moment-hijri'

  export default {
    name: 'HijriDate',
    props: {
      value: {
        type: [Date, String],
        default: '',
      },
    },
    data: () => ({
      hejriCallender: false,
      id: '',
      innerDate: '',
      focus: false,
    }),
    computed: {
      computedDate () {
        const copmputed = new Date(this.value).toLocaleDateString('ar-sa')
        return copmputed.includes('Invalid') ? '' : copmputed
      },
    },
    mounted () {
      this.id = uuid.v4()
    },
    methods: {
      handleClear () {
        this.$emit('input', '')
      },
      handleInput (value) {
        try {
          const m = moment(value, 'iYYYY/iM/iD')
          this.$emit('input', format(new Date(m.format('YYYY/M/D')), 'yyyy-MM-dd HH:mm'))
        } catch (err) {

        }
      },
      handleChange (value) {
        this.$emit('input', format(new Date(value), 'yyyy-MM-dd HH:mm'))

        // console.log(m)
      },
    },
  }
</script>
<style>
.hijri-date.v-card.v-picker--date {
  margin-top: 0px !important;
}
</style>
