<template>
  <div>
    <div class="wrapper">
      <div class="cropper_wrapper">
        <vue-cropper
          ref="cropper"
          :src="currentImage"
          alt="Source Image"
          preview="#preview"
        />
      </div>
      <div class="preview-area">
        <div id="preview" />
      </div>
    </div>
    <div class="actions_wrapper">
      <div class="image_actions mt-2 mb-5">
        <v-btn
          color="blue-grey"
          rounded
          @click="rotate(-90)"
        >
          تدوير لليمين
          <v-icon
            dark
            class="mr-1"
          >
            mdi mdi-restore
          </v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          rounded
          @click="rotate(90)"
        >
          تدوير لليسار
          <v-icon class="mr-1">mdi mdi-reload</v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          rounded
          @click="zoom(0.1)"
        >
        تقريب
          <v-icon class="mr-1">mdi mdi-magnify-plus-outline </v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          rounded
          @click="zoom(-0.1)"
        >
        إبعاد
          <v-icon class="mr-1">mdi mdi-magnify-minus-outline </v-icon>
        </v-btn>
      </div>
      <div class="actions">
        <v-btn
          color="primary"
          @click="save()"
        >
          حفظ
        </v-btn>
        <v-btn
          color="error"
          @click="close()"
        >
          إغلاق
        </v-btn>
      </div>
      <img
        v-if="cropImg"
        :src="cropImg"
      >
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropperjs'
  import 'cropperjs/dist/cropper.css'

  export default {
    name: 'ImageCropper',
    components: {
      VueCropper,
    },
    props: {
      imgSrc: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      cropImg: '',
      data: null,
    }),
    computed: {
      currentImage () {
        return this.imgSrc
      },
    },
    watch: {
      imgSrc: function (v) {
        if (v) {
          this.$refs.cropper.replace(v)
        } else {
          this.reset()
        }
      },
    },
    methods: {
      save  () {
        this.$emit('save', this.$refs.cropper.getCroppedCanvas().toDataURL())
        this.reset()
      },
      close () {
        this.$emit('close')
        this.reset()
      },
      cropImage () {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      },
      flipX () {
        const dom = this.$refs.flipX
        let scale = dom.getAttribute('data-scale')
        scale = scale ? -scale : -1
        this.$refs.cropper.scaleX(scale)
        dom.setAttribute('data-scale', scale)
      },
      flipY () {
        const dom = this.$refs.flipY
        let scale = dom.getAttribute('data-scale')
        scale = scale ? -scale : -1
        this.$refs.cropper.scaleY(scale)
        dom.setAttribute('data-scale', scale)
      },
      getCropBoxData () {
        this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4)
      },
      getData () {
        this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4)
      },
      move (offsetX, offsetY) {
        this.$refs.cropper.move(offsetX, offsetY)
      },
      reset () {
        this.$refs.cropper.reset()
      },
      rotate (deg) {
        this.$refs.cropper.rotate(deg)
      },
      setCropBoxData () {
        if (!this.data) return
        this.$refs.cropper.setCropBoxData(JSON.parse(this.data))
      },
      setData () {
        if (!this.data) return
        this.$refs.cropper.setData(JSON.parse(this.data))
      },
      setImage (e) {
        const file = e.target.files[0]
        if (file.type.indexOf('image/') === -1) {
          alert('Please select an image file')
          return
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader()
          reader.onload = (event) => {
            this.imgSrc = event.target.result
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result)
          }
          reader.readAsDataURL(file)
        } else {
          alert('Sorry, FileReader API not supported')
        }
      },
      showFileChooser () {
        this.$refs.input.click()
      },
      zoom (percent) {
        this.$refs.cropper.relativeZoom(percent)
      },

    },
  }
</script>
<style>
.wrapper {
direction: ltr;
display: flex;
flex-direction: row-reverse;
}
.cropper_wrapper {
    border-left: 2px solid #333;
    padding-left: 5px;
}
.preview-area {
    min-width:200px;
    margin-right: 5px;
}
.preview-area {}
#preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden !important;
}

.actions {
    display: flex;
    flex-direction: row-reverse;
}

.actions_wrapper {
    margin-top: 10px;
}

.white--text {
    color: white !important;
}

.image_actions {
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
}
</style>
