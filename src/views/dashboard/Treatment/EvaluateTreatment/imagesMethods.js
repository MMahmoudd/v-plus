import { uuid } from 'vue-uuid'
export default {
      createImage (file) {
        const item = { status: '1', image: false, id: uuid.v4(), sort_number: 1, type: 'add' }
        const images = this.data.images
        const reader = new FileReader()
        reader.onload = (e) => {
        //   console.log(e.target.result, 'onload')
          item.image = e.target.result
          images.push(item)
          // TODO : Do it in a another function
          images.sort((a, b) => {
            if (+a.status === 0 && +b.status === 1) {
              return 1
            } else if (+b.status === 0 && +a.status === 1) {
              return -1
            }
            return 0
          })

          this.data.images = images
        }
        reader.readAsDataURL(file)
      },
      removeImage: function (item, index) {
        if (item.image_url) {
          this.data.images_ids_deleted.push(+item.media_id)
        }
        // item.image = false
        this.data.images.splice(index, 1)
        // Remove sort of image
        // this.imageSorting.splice(index, 1)
      },
      hideImage: function (image, index) {
        //  const imageIndex = this.images.findIndex(image => image.id === id)
        this.data.images[index].status = this.data.images[index].status === '1' ? '0' : '1'
        // if (this.data.images[index].image_url) {
        this.data.images[index].type = 'edit'
        console.log(this.data.images[index])
        // }
        // TODO : Do it in a another function
        this.data.images.sort((a, b) => {
          if (+a.status === 0 && +b.status === 1) {
            return 1
          } else if (+b.status === 0 && +a.status === 1) {
            return -1
          }
          return 0
        })
        // this.images.push(this.images.splice(index, 1)[0])
      },
      downloadImage: async function (image) {
        const img = await window.fetch(image.image_url)
        const imageBlog = await img.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const path = image.image_url.split('/')
        const imageName = path[path.length - 1]
        const link = document.createElement('a')
        link.target = '_blank'
        link.href = imageURL
        link.download = imageName + '.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      openImageDialog: function (image) {
          this.currentImage = image
          this.currentImageUrl = image.image_url || image.image
          this.imageDialog = true
        // eslint-disable-next-line camelcase
        // eslint-disable-next-line no-unused-vars
      },
      onSaveDialog: function (image) {
        if (this.currentImage.media_id) {
            this.data.images_ids_deleted.push(+this.currentImage.media_id)
        }
          this.imageDialog = false
          this.data.images = this.data.images.map(img => {
              if (img.id === this.currentImage.id) {
                  return ({ status: '1', image, id: uuid.v4(), sort_number: 1, type: 'add' })
                }
                return img
            })
          this.currentImageUrl = ''
          this.currentImage = ''
      },
      onCloseDialog: function () {
        this.imageDialog = false
        this.currentImageUrl = ''
        this.currentImage = ''
      },
      onFileChange (files) {
        console.log({ files })
        if (!files.length) {
          return
        }
        this.createImages(files)
      },
      createImages (files) {
        files.forEach(this.createImage)
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
        this.onFileChange(dataTransfer.files)
        e.preventDefault()
        e.stopPropagation()
      },
}
