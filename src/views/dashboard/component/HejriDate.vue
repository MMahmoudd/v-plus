<template>
  <div>
    <v-menu
      ref="menu"
      v-model="hejriCallender"
      :close-on-content-click="false"
      :return-value.sync="computedDate"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :id="id"
          outlined
          single-line
          clearable
          :value="computedDate"
          prepend-icon="mdi-calendar"
          placeholder="YYYY/MM/DD Format"
          hint="YYYY/MM/DD Format"
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker
        :value="value"
        :element="id"
        calendar="hijri"
        locale="ar-sa"
        format="YYYY-MM-DD HH:mm"
        @change="value => handleChange(value)"
        @input="hejriCallender = false"
      />
    </v-menu>
  </div>
</template>
<script>
  import { format } from 'date-fns/esm'
  import { uuid } from 'vue-uuid'
  // import moment from 'moment-hijri'

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
    }),
    computed: {
      computedDate () {
        return new Date(this.value).toLocaleDateString('ar-sa')
      },
    },
    mounted () {
      this.id = uuid.v4()
    },
    methods: {
      handleChange (value) {
        this.$emit('input', format(new Date(value), 'yyyy-MM-dd HH:mm'))
      },
    },
  }
</script>
