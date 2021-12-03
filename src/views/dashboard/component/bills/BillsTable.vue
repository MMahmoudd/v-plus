<template>
  <v-data-table
    :loading="dataLoading"
    :headers="headers"
    :search="search"
    :items="items"
    :items-per-page="20"
    :footer-props="{
      'items-per-page-options': [5, 10, 20, 40, 50],
    }"
    :options.sync="options"
    :server-items-length="total"
    :page-count="numberOfPages"
    class="custom_table_class mt-8"
    @fetchAllItems="fetchAllItems"
  >
    <template v-slot:[`item.color_e`]="{ item }">
      <p class="color_primary">
        {{ item.color_e }}
      </p>
    </template>
    <template v-slot:top>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="Dessert name"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.calories"
                    label="Calories"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.fat"
                    label="Fat (g)"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.carbs"
                    label="Carbs (g)"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.protein"
                    label="Protein (g)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="closeDelete"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
            >
              OK
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- </v-toolbar> -->
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="mr-2"
              v-bind="attrs"
              color="primary"
              v-on="on"
            >
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list>
            <v-list-item @click="editItem(item)">
              <v-icon class="ml-2">
                mdi-pencil
              </v-icon>
              تعديل
            </v-list-item>
            <!-- <v-list-item @click="editItem(item)">
              <v-icon class="ml-2">
                mdi-cash
              </v-icon>
              <span> مطالبة مالية</span>
            </v-list-item> -->
            <v-list-item
              color="primary"
              @click="deleteItem(item)"
            >
              <v-icon
                color="danger"
                class="ml-2"
              >
                mdi-trash-can-outline
              </v-icon>
              <span class="color_danger"> حذف </span>
            </v-list-item>
            <v-list-item @click="editItem(item)">
              <v-icon class="ml-2">
                mdi-printer
              </v-icon>
              <span>طباعة </span>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon> -->
    </template>
  </v-data-table>
</template>

<script>
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  import moment from 'moment'
  const CustomersService = ServiceFactory.get('Customers')

  export default {
    data: () => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      items: [],
      loading: false,
      deleteDailog: false,
      userDetails: {},
      editedIndex: -1,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
      // asdasdasd
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'أسم العميل',
          align: 'start',
          sortable: false,
          value: 'cs_name',
        },
        { text: 'المبلغ', value: 'cs_type' },
        { text: 'التاريخ', value: 'cs_phone' },
        { text: 'الدفعات', value: 'cs_email' },
        { text: 'الحالة', value: 'protein' },
        { text: '', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {},

    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const items = await CustomersService.getAllItems(
          itemsPerPage,
          page,
          pageNumber
        )
        console.log('Users', items)
        items.data.data.map((item) => {
          item.created_at = moment(item.created_at).format('YYYY-MM-DD hh:mm a')
        })
        this.items = items.data.data
        this.total = items.total
        this.dataLoading = false
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>
.custom_table_class {
  box-shadow: 0px 21px 30px #0000000d;
  border-radius: 20px;
  opacity: 1;
}

.custom_table_class table {
  border-collapse: separate;
  border-spacing: 0px 1.4rem !important;
  margin: 0rem;
  padding: 1rem;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  font-weight: bold;
}
.custom_table_class td {
  font-weight: bold;
}
.custom_table_class thead th {
  background-color: #f0f2f5;
}
.custom_table_class thead th:first-child {
  border-radius: 0px 39px 39px 0;
  border-bottom: none;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: 0px;
}
.custom_table_class thead th:last-child {
  border-radius: 6rem 0rem 0rem 6em;
}
.custom_table_class tbody tr {
  background-color: rgb(255, 255, 255);
}
.custom_table_class tbody td {
  background-color: rgb(255, 255, 255);
  border-top: 2px solid #f0f2f5 !important;
  margin-top: 1rem;
  border-bottom: 2px solid #f0f2f5 !important;
}
.custom_table_class tbody tr td:first-child {
  border-radius: 0rem 5rem 5rem 0rem;
  border: 3px solid #f0f2f5;
  border-left: none;
  background-color: rgb(255, 255, 255);
}
.custom_table_class tbody tr td:last-child {
  border-radius: 6rem 0rem 0rem 6em;
  border: 3px solid #f0f2f5;
  border-right: none;
  border-bottom: 0;
  border-top: 2px solid #f0f2f5;
}
</style>
