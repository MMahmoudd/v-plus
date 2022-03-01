<template>
  <div
    class="table_title"
    style="display:flex;justify-content:space-between;align-items:center;"
  >
    <span>
      {{ title }}
    </span>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        :value="value"
        type="number"
        label="السنة"
        outlined
        single-line
        style="display:inline-flex;width:300px;"
        hide-details
        dense
        :disabled="loading"
        @input="v => onInput(v)"
      />
      <v-btn
        class="time-chip"
        color="primary"
        label
        text-color="white"
        type="submit"
        :disabled="loading"
      >
        اذهب
      </v-btn>
    </v-form>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      onSubmit: Function,
      loading: Boolean,
      value: String,
    },
    methods: {
      onInput: function (v) {
        this.$emit('input', v)
      },
    },
  }
</script>
