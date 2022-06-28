<template>
  <v-menu
    v-model="status"
    :close-on-content-click="true"
    transition="scale-transition"
    offset-x
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="value"
        :class="extraClass"
        prepend-icon="mdi-calendar"
        placeholder="YYYY-MM-DD Format"
        hint="YYYY-MM-DD Format"
        v-bind="attrs"
        single-line
        outlined
        @change="inputDate"
        v-on="on"
      />
    </template>
    <v-date-picker
      :value="value"
      @input="changeDate"
    />
  </v-menu>
</template>

<script>
  import { format } from 'date-fns'

  export default {
    name: 'CustomDate',
    props: {
      value: {
        type: String,
        default: () => {
          return ''
        },
        required: true,
      },
      extraClass: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      status: false,
      innerDate: '',
    }),
    watch: {
      value: {
        handler (newVal) {
          if (newVal === 'Invalid Date') {
            this.$emit('input', '')
            return
          }
          if (newVal.length > 10) {
            this.$emit('input', format(new Date(newVal), 'yyyy-MM-dd'))
          } else if (String(newVal) === 'null' ||
            typeof newVal === 'undefined') {
            this.$emit('input', '')
          }
        },
      },
    },
    beforeMount () {
      if (this.value.length > 10) {
        this.$emit('input', format(new Date(this.value), 'yyyy-MM-dd'))
      }
    },
    methods: {
      changeDate (value) {
        this.$emit('input', value)
      },
      inputDate (value) {
        this.innerDate = value
        try {
          const newValue = new Date(this.innerDate)
          if (!String(newValue).includes('Invalid')) {
            this.$emit('input', format(newValue, 'yyyy-MM-dd'))
          }
        } catch (err) {

        }
        this.status = false
      },
    },
  }
</script>
