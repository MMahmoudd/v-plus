<template>
  <v-text-field
    ref="inputRef"
    type="text"
    outlined
    single-line
    :disabled="disabled"
    :hide-details="hideDetails"
  />
</template>

<script>
  import { useCurrencyInput } from 'vue-currency-input'
  import { watch } from '@vue/composition-api'
  export default {
    name: 'CurrencyInput',
    props: {
      // eslint-disable-next-line vue/require-default-prop
      value: Number, // Vue 2: value
      // eslint-disable-next-line vue/require-default-prop
      options: {
        type: Object,
        default: () => ({ currency: 'usd', locale: 'en-US', currencyDisplay: 'hidden', precision: true, hideGroupingSeparatorOnFocus: false }),
      },
      disabled: {
        type: [Boolean, String],
        default: false,
      },
      hideDetails: {
        type: [Boolean, String],
        default: false,
      },
    },
    setup (props) {
      const { inputRef, setValue } = useCurrencyInput(props.options)

      watch(
        () => props.value, // Vue 2: props.value
        (value) => {
          setValue(value)
        }
      )

      //   watch(
      //     () => props.options,
      //     (options) => {
      //       setOptions(options)
      //     }
      //   )
      return { inputRef }
    },
  }
</script>
