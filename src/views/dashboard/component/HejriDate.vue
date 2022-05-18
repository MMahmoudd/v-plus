<template>
  <div>
    <v-text-field
      :id="id"
      outlined
      single-line
      type="text"
      :value="computedDate"
      placeholder="select date"
      prepend-icon="mdi-calendar"
      readonly
    />

    <date-picker
      :value="value"
      :element="id"
      calendar="hijri"
      locale="ar-sa"
      format="YYYY-MM-DD HH:mm"
      @change="value => handleChange(value)"
    />
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
