<template>
  <v-select
    :items="items"
    class="mx-2"
    item-text="name"
    item-value="id"
    :label="label"
    outlined
    required
    multiple
    :value="value"
    @change="(value) => {change(value); onChange()}"
  >
    <template v-slot:prepend-item>
      <v-list-item
        ripple
        @mousedown.prevent
        @click="toggle"
      >
        <v-list-item-action>
          <v-icon :color="value.length > 0 ? 'indigo darken-4' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            اختيار الكل
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2" />
    </template>
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item.name }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text text-caption"
      >
        (+{{ value.length - 1 }} آخرين)
      </span>
    </template>
  </v-select>
</template>

<script>
  export default {
    name: 'MultiSelect',
    props: {
      items: {
        type: Array,
        required: true,
        default: () => ([]),
      },
      value: {
        type: Array,
        required: true,
        default: () => ([]),
      },
      label: {
        type: String, default: '', required: true,
      },
      onChange: {
        type: Function, default: () => {}, required: false,
      },
    },
    computed: {
      selectedAll () {
        return (this.value || []).length === (this.items || []).length
      },
      selectedSome () {
        return (this.value || []).length > 0 && !this.selectedAll
      },
      icon () {
        if (this.selectedAll) return 'mdi-close-box'
        if (this.selectedSome) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },
    methods: {
      change (value) {
        this.$emit('input', value)
      },
      toggle () {
        this.$nextTick(() => {
          if (this.selectedAll) {
            this.$emit('input', [])
          } else {
            this.$emit('input', this.items.map(item => item.id))
          }
        })
      },
    },
  }
</script>
