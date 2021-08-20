<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  />
</template>

<script>
  export default {
    name: 'Dashboard',

    data () {
      return {
      }
    },
    created () {
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
<style lang="scss">
  h1{
    font-weight: 300;
  }
</style>
