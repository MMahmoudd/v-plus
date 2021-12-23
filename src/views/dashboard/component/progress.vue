
<template>
  <div class="progress-container">
    <vue-ellipse-progress
      :progress="progress"
      :color="gradient"
      empty-color="#8ec5fc"
      color-fill="#ffffff9e"
      :size="70"
      empty-thickness="10%"
      line="round"
      :legend="false"
      legend-class="legend-custom-style"
      :no-data="false"
      :loading="false"
      font-color="white"
      :half="false"
      :gap="1"
      dot="8 blue"
      reverse
      font-size="5rem"
    >
      <p
        slot="legend-caption"
        style="margin-bottom:0px;"
      >
        <img
          src="../../../assets/download-pdf.png"
          style="width:40px;height:40px;"
        >
      </p>
    </vue-ellipse-progress>
  </div>
</template>
<script>
  export default {
    name: 'CustomProgress',
    props: {
      progress: {
        type: Number,
        default: 0,
      },
    },
    data: () => ({
      gradient: {
        radial: false,
        colors: [
          {
            color: '#6546f7',
            offset: '0',
            opacity: '1',
          },
          {
            color: 'lime',
            offset: '100',
            opacity: '0.6',
          },
        ],
      },
    }),
  }
</script>
<style scoped>
.progress-container {
    position: fixed;
    bottom: 30px;
    left: 20px;
    z-index: 99999999;
}
</style>
