<template>
  <div
    :class="`
      drop-zone
      v-input
      theme--light
      v-text-field v-text-field--is-booted
      v-file-input ${imgs_drag_status === 'over' ? 'drop-zone-over': ''}
      ${value ? 'v-input--is-label-active v-input--is-dirty' : ''}
      `
    "
    @click.stop="handleClick"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div class="v-input__prepend-outer">
      <div class="v-input__icon v-input__icon--prepend">
        <button
          type="button"
          aria-label="prepend icon"
          class="v-icon notranslate v-icon--link mdi mdi-paperclip theme--light"
        />
      </div>
    </div>
    <div class="v-input__control">
      <div class="v-input__slot">
        <div class="v-text-field__slot">
          <label
            for="input-2396"
            :class="`v-label theme--light ${value ? 'v-label--active' : ''}`"
            style="left: auto; right: 0px; position: absolute"
          >{{ label }}</label>

          <div
            v-if="Array.isArray(value)"
            class="v-file-input__text"
          >
            <span
              v-for="(file, index) in value"
              :key="index"
              class="v-chip v-chip--label theme--light v-size--small primary"
            ><span class="v-chip__content">
              {{ file.name }} <span
                class="delete-icon"
                @click.stop="handleClickChip(index)"
              >x</span>
            </span></span>
          </div>
          <div
            v-else-if="value"
            class="v-file-input__text"
          >
            <span
              class="v-chip v-chip--label theme--light v-size--small primary"
            ><span class="v-chip__content">
              {{ value.name }}  <span
                class="delete-icon"
                @click.stop="handleClickChip(1)"
              >x</span>
            </span></span>
          </div>

          <input
            ref="input"
            type="file"
            multiple="multiple"
            @change="handleInputChange"
          >
        </div>
        <div class="v-input__append-inner">
          <div />
        </div>
      </div>
      <div class="v-text-field__details">
        <div class="v-messages theme--light">
          <div class="v-messages__wrapper" />
        </div>
        <div
          v-if="Array.isArray(value)"
          class="v-counter theme--light"
        >
          {{ value.length }} ملفات
        </div>
        <div
          v-else
          class="v-counter theme--light"
        />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'InputFile',
    props: {
      value: {
        default: () => ([]),
        type: [Array, String, File, FileList],
      },
      // eslint-disable-next-line vue/require-default-prop
      change: {
        type: Function,
      },
      label: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      imgs_drag_status: null,
    }),
    methods: {
      handleClick () {
        this.$refs.input.click()
      },
      handleInputChange () {
        this.$emit('change', this.$refs.input.files)
      },
      handleClickChip (index) {
        this.$emit('delete', index)
      },
      handleDragEnter: function (e) {
        this.imgs_drag_status = 'enter'
        e.preventDefault()
        e.stopPropagation()
      },
      handleDragLeave: function (e) {
        this.imgs_drag_status = 'leave'
        e.preventDefault()
        e.stopPropagation()
      },
      handleDragOver: function (e) {
        this.imgs_drag_status = 'over'
        e.preventDefault()
        e.stopPropagation()
      },
      handleDrop: function (e) {
        this.imgs_drag_status = 'drop'
        const dataTransfer = e.dataTransfer
        this.$emit('change', dataTransfer.files)
        e.preventDefault()
        e.stopPropagation()
      },
    },
  }
</script>
<style scoped>
.drop-zone.drop-zone-over{
    box-shadow: 0px 0px 1px 1px blue !important;
}
.delete-icon {
    color: #ca3a3a;
    font-weight: bold;
    font-size: 18px;
    margin: 2px;
    padding: 3px;
    background: #f1f1f1;
    cursor: pointer;
}
</style>
