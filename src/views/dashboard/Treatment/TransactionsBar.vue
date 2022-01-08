<template>
  <v-app-bar
    id="transaction-bar"
    ref="bar"
    app
    fixed
    flat
    height="75"
    right="75"
    style="backgroud:red"
    class="fixed-top-transaction"
  >
    <vue-slick-carousel
      :dots="false"
      :nav="false"
      :mouse-drag="false"
      :auto-width="true"
    >
      <span
        v-for="(item,index) in list"
        :key="index"
        class="item-slider"
        @click="handleScroll(item.ref)"
      >{{ item.name }}</span>
    </vue-slick-carousel>
  </v-app-bar>
</template>
<script>
    //   import carousel from 'vue-owl-carousel'
  import VueSlickCarousel from 'vue-slick-carousel-rtl'
  //   import 'vue-slick-carousel-rtl/dist/vue-slick-carousel.css'

  export default {
    name: 'TransactionsBar',
    components: { VueSlickCarousel },
    props: {
      list: {
        type: Object,
        default: () => ({}),
      },
    },
    mounted () {
      const appBar = this.$root.$el.querySelector('#app-bar').clientHeight
      this.$refs.bar.$el.style.top = appBar + 'px'
      console.log(typeof this.$refs, Object.keys(this.$refs), this.$refs)
      console.log(this.$refs.bar)
    },
    methods: {
      handleScroll: function (ref) {
        const container = this.$root.$el.querySelector(`#item-${ref}`)
        container.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      },
    },
  }
</script>
<style scoped>
.fixed-top-transaction {
}
span.item-slider {
    display: inline-block;
    padding: 9px 9px;
    background: #bdbbbb;
    border-radius: 5px;
}

</style>
<style>
.owl-item {
    margin: 0px 4px !important;
}
</style>
