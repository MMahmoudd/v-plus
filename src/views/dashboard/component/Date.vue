<template>
  <v-menu
    v-model="status"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="value"
        :class="extraClass"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        single-line
        outlined
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="value"
      @input="inputDate"
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
          return (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
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
      inputDate (value) {
        this.$emit('input', format(value, 'yyyy-MM-dd'))
        this.status = false
      },
    },
  }
</script>
