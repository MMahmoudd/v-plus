<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        روابط هامة
        <v-spacer />
        <v-spacer />

        <v-btn
          class="mx-2"
          color="blue"
          @click.stop="handleClickCreate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.872"
            height="15.872"
            viewBox="0 0 15.872 15.872"
          >
            <g
              id="Group_2679"
              data-name="Group 2679"
              transform="translate(1.243 1.242)"
            >
              <path
                id="Path_2458"
                data-name="Path 2458"
                d="M10,12.475a2.968,2.968,0,0,0,4.24,0l3.392-3.392a3,3,0,1,0-4.24-4.24l-.424.424"
                transform="translate(-4.882 -3.964)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                id="Path_2459"
                data-name="Path 2459"
                d="M12.475,9.84a2.968,2.968,0,0,0-4.24,0L4.843,13.233a3,3,0,0,0,4.24,4.24l.424-.424"
                transform="translate(-3.965 -4.722)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </g>
          </svg>
          <span class="mr-1">إضافة رابط جديد</span>
        </v-btn>
      </v-card-title>
      <v-container fluid>
        <v-row class="mt-2">
          <!-- for loop here -->
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <div :class="{'link-wrapper' : true, 'link-deleting' : deletedIndex === item.id }">
              <v-btn
                class="mx-0 name"
                @click="handleClickEdit(item.id)"
              >
                {{ item.name }}
              </v-btn>
              <div class="link_actions">
                <v-btn
                  text
                  icon
                  color="blue lighten-2"
                  :class="{'status-button' : true, 'status-button-loading' : editedIndex === item.id}"
                  @click="updateStatus(item)"
                >
                  <svg
                    v-if="item.status === true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.8"
                    height="16.8"
                    viewBox="0 0 20.8 16.8"
                    aria-label="link is visible"
                  >
                    <g
                      id="Group_3433"
                      data-name="Group 3433"
                      transform="translate(-383.6 -821.1)"
                    >
                      <circle
                        id="Ellipse_127"
                        data-name="Ellipse 127"
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(392 826.5)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                      <path
                        id="Path_2481"
                        data-name="Path 2481"
                        d="M12,19Q6,19,2,12,6,5,12,5t10,7a21.406,21.406,0,0,1-1.311,2.033"
                        transform="translate(382 816.5)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                      <path
                        id="Path_2482"
                        data-name="Path 2482"
                        d="M15,19l2,2,4-4"
                        transform="translate(382 816.5)"
                        fill="none"
                        stroke="#3772ff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                    </g>
                  </svg>
                  <svg
                    v-if="item.status === false"
                    id="eNGKD0HTOI91"
                    width="20.8"
                    height="16.8"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 20.8 16.8"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    aria-label="link is hidden"
                  ><g transform="translate(-383.6-821.1)"><circle
                    r="2"
                    transform="translate(394 828.5)"
                    fill="none"
                    stroke="#000"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /><path
                    d="M12,19Q6,19,2,12Q6,5,12,5t10,7c-.398329.701837-.836028,1.380587-1.311,2.033"
                    transform="translate(382 816.5)"
                    fill="none"
                    stroke="#000"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /><line
                    x1="-2.17225"
                    y1="2.55825"
                    x2="2.82775"
                    y2="-2.44175"
                    transform="translate(399.240932 833.847064)"
                    fill="none"
                    stroke="#dd0808"
                    stroke-width="0.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /><line
                    x1="-2.17225"
                    y1="2.55825"
                    x2="2.82775"
                    y2="-2.44175"
                    transform="matrix(1 0 0-1 399.240932 834.008417)"
                    fill="none"
                    stroke="#dd0808"
                    stroke-width="0.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /></g></svg>
                </v-btn>
                <v-btn
                  text
                  icon
                  color="red lighten-2"
                  @click="handleClickDelete(item)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.8"
                    height="18.8"
                    viewBox="0 0 16.8 18.8"
                    aria-label="delete link"
                  >
                    <g
                      id="Group_3432"
                      data-name="Group 3432"
                      transform="translate(-385.6 -981.1)"
                    >
                      <line
                        id="Line_97"
                        data-name="Line 97"
                        x2="16"
                        transform="translate(386 985.5)"
                        fill="none"
                        stroke="#df2935"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                      <line
                        id="Line_98"
                        data-name="Line 98"
                        y2="6"
                        transform="translate(392 989.5)"
                        fill="none"
                        stroke="#df2935"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                      <line
                        id="Line_99"
                        data-name="Line 99"
                        y2="6"
                        transform="translate(396 989.5)"
                        fill="none"
                        stroke="#df2935"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                      <path
                        id="Path_2468"
                        data-name="Path 2468"
                        d="M5,7,6,19a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2L19,7"
                        transform="translate(382 978.5)"
                        fill="none"
                        stroke="#df2935"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                      <path
                        id="Path_2469"
                        data-name="Path 2469"
                        d="M9,7V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V7"
                        transform="translate(382 978.5)"
                        fill="none"
                        stroke="#df2935"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.8"
                      />
                    </g>
                  </svg>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <link-form v-bind.sync="modalData" />
    <v-dialog
      v-model="deleteDailog"
      width="500"
    >
      <v-card
        class="text-center delete-dailog"
      >
        <base-material-card
          title="تأكيد حذف"
          color="error"
          class="pt-12 delete-dailog-title"
        >
          <v-card-text class="mt-2">
            هل انت متأكد من حذف {{ LinkDetails.name }} ؟
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green"
              :loading="loading"
              :disabled="disabled"
              @click="deleteLink(LinkDetails)"
            >
              حذف
            </v-btn>
            <v-btn
              color="error"
              @click="deleteDailog = false"
            >
              اغلاق
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      <div v-html="successMessage" />
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import LinkForm from './Form.vue'
  const LinksServices = ServiceFactory.get('Links')
  export default {
    name: 'LinksList',
    components: {
      LinkForm,
    },
    data: (vm) => ({
      permissions: {},
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      status_button_loading: {},
      items: [
        { name: 'Link 1', link: 'https://google.com', status: false, id: 1 },
        { name: 'Link 2', link: 'https://google.com', status: true, id: 2 },
        { name: 'Link 3', link: 'https://google.com', status: true, id: 3 },
        { name: 'Link 4', link: 'https://google.com', status: true, id: 4 },
        { name: 'Link 5', link: 'https://google.com', status: true, id: 5 },
      ],
      loading: false,
      deleteDailog: false,
      LinkDetails: {},
      editedIndex: -1,
      deletedIndex: -1,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
      modalData: {
        showModal: false,
        type: 'add',
      },
    }),
    watch: {
      options: {
        handler () {
        //   this.fetchAllItems()
        },
      },
    },
    mounted () {
      this.fetchAllItems()
      this.permissions = this.can('تخصيص المعاملة')
    },
    methods: {
      confirmDeleteUser (userData) {
        this.userDetails = userData
        this.deleteDailog = true
      },
      handleClickCreate () {
        this.modalData.type = 'add'
        this.modalData.showModal = true
      },
      handleClickEdit (id) {
        this.modalData.type = 'edit'
        this.modalData.id = id
        this.modalData.linkData = { ...this.items.find(item => item.id === id) }
        this.modalData.showModal = true
      },
      handleClickDelete (item) {
        this.deleteDailog = true
        this.LinkDetails = item
      },
      updateStatus (item) {
        this.editedIndex = item.id
        setTimeout(() => {
          item.status = item.status !== true
          this.editedIndex = -1
          this.successSnackbar = true
          this.successMessage = `تم تغيير حالة "${item.name}" إلى <strong>${item.status === true ? 'إظهار' : 'إخفاء'}</strong>`
        }, 5000)
      },
      async fetchAllItems () {
        const { data } = await LinksServices.getAllItems()
        console.log(data)
      },
      async deleteLink (currentItem) {
        this.deleteDailog = false
        this.deletedIndex = currentItem.id

        setTimeout(() => {
          this.items = this.items.filter(item => item.id !== currentItem.id)
          this.successSnackbar = true
          this.successMessage = `تم حذف "${currentItem.name}" بنجاح`
          this.deletedIndex = -1
        }, 3000)
      },
    //   async deleteUser (userDetails) {
    //     this.loading = true
    //     this.disabled = true
    //     const deleteUsers = await CitiesService.deleteOneItem(userDetails.id)
    //     if (deleteUsers.success === true) {
    //       this.deleteDailog = false
    //       this.successMessage = 'تم الحذف بنجاح'
    //       this.successSnackbar = true
    //       setTimeout(() => {
    //         this.editedIndex = this.items.indexOf(userDetails)
    //         this.items.splice(this.editedIndex, 1)
    //       }, 500)
    //     } else {
    //       this.errorMessage('يوجد مشكلة')
    //       this.errorSnackbar = true
    //     }
    //     this.disabled = false
    //     this.loading = false
    //   },
    },
  }
</script>
<style scoped>
.link-wrapper {
    border: 1px solid #D9D8DF;
    border-radius: 8px;
    box-shadow: 0px 8px 10px #04040412;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.link-wrapper > .name {
    background-color: #3772FF !important;
    border-radius: 8px !important;
    box-shadow: 0px 0px 1px 2px #3772ff;
}

.status-button-loading, .link-deleting {
    animation: opacity 1s infinite;
    pointer-events: none;
}

.delete-dailog button.v-btn {
    border-radius: 8px !important;
}
.delete-dailog .delete-dailog-title {
    font-family: 'Cairo', sans-serif !important;
}
@keyframes opacity {
    from {
        opacity: 1;
    }

    to {
        opacity: 0.4;
    }
}
</style>
