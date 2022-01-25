<template>
  <v-dialog
    v-model="showModal"
    width="900"
    persistent
  >
    <v-card>
      <v-card-title class="text-right link-form-title">
        <h3 class="card-title">
          {{ type === 'edit' ? 'تحديث' : 'إضافة' }}
        </h3>
        <v-btn
          text
          icon
          @click.prevent="$emit('update:showModal', false)"
        >
          <v-icon
            dark
            right
          >
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
                sm="12"
              >
                <label class="d-block mb-3 font-weight-bold">اسم الرابط</label>
                <v-text-field
                  v-model="data.name"
                  label="الاسم"
                  single-line
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="8"
                sm="12"
              >
                <label class="d-block mb-3 font-weight-bold">Link URL</label>
                <v-text-field
                  v-model="data.link"
                  placeholder="https://example.com"
                  single-line
                  outlined
                  dir="ltr"
                />
              </v-col>
            <!-- <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    single-line
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    اختر النموذج
                  </v-btn>
                </template>
                <v-list>
                  <template v-for="sample in samplesList">
                    <v-list-item
                      v-show="sample.status === '1'"
                      :key="sample.id"
                    >
                      <v-list-item-title>
                        <router-link :to="sample.path">
                          {{ sample.name }}
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu> -->
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          x-large
          class="ma-2 py-4"
          color="blue"
          @click.prevent="save"
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
          <span class="mr-1">{{ type === 'add' ? 'إضافة' : 'تحديث' }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const LinksServices = ServiceFactory.get('Links')

  export default {
    name: 'LinkForm',
    props: {
      showModal: { type: Boolean, required: true, default: false },
      type: { type: String, required: true, default: 'add' },
      // eslint-disable-next-line vue/require-default-prop
      id: { type: Number, required: false },
      linkData: { type: Object, required: false, default: () => ({}) },
      items: { type: Array, required: true, default: () => ([]) },
    },
    data: () => ({
      data: {
        name: '',
        link: '',
      },
    }),
    watch: {
      id: {
        handler () {
          if (this.type === 'edit') {
            this.data = this.linkData
          } else {
            this.data = {
              name: '',
              link: '',
            }
          }
        },
      },
      type: {
        handler () {
          if (this.type === 'edit') {
            this.data = this.linkData
          } else {
            this.data = {
              name: '',
              link: '',
            }
          }
        },
      },
    },
    methods: {
      save: async function () {
        try {
          if (this.type === 'add') {
            const { data } = await LinksServices.addOneItem(this.data)
            this.$emit('update:items', [...this.items, { ...data, is_active: 1, is_deleting: false, is_loading: false }])
            // console.log(this.items)
          } else {
            // eslint-disable-next-line camelcase
            const { name, link } = this.data
            const { data } = await LinksServices.updateOneItem(this.data.id, { name, link })
            this.$emit('update:items', this.items.map(item => item.id !== this.data.id ? item : { ...data, is_deleting: false, is_loading: false }))
            console.log(data)
          }
        } catch (err) {
          if (this.type === 'add') {

          } else {

          }
        } finally {
          this.$emit('update:showModal', false)
        }
      },
    },
  }
</script>
<style scoped>
.link-form-title button.v-btn .v-icon{
    position: relative !important;
    left: unset !important;
    right: unset !important;
    top: unset !important;
    bottom: unset !important;
    font-size: 25px !important;
}

.link-form-title {
      display: flex !important;
    justify-content: space-between;
}

.link-form-title button.v-btn {
    background-color: transparent !important;
}
</style>
