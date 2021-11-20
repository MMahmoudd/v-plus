<template>
<<<<<<< Updated upstream
  <v-container class="customers_container">
    dddddd
    <v-container class="price_offers">
      <v-row
        justify="space-between"
        align="center"
        class="mx-0 mt-4"
      >
        <h1 class="font-weight-bold">
          العملاء
        </h1>
        <v-btn
          class=" time-chip"
          color="blue"
          label
          text-color="white"
          @click="dialog=!dialog"
        >
          <v-icon left>
            mdi-account-plus
          </v-icon>
          <span>اضافة عميل</span>
        </v-btn>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1 table_container mt-9"
      >
        <template v-slot:top>
          <!-- <v-toolbar
          flat
        > -->
          <!-- <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          /> -->
          <!-- <v-spacer /> -->
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>
            </template> -->
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
          <v-icon
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
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
      >>>>>>> a022fef3c5375048e846846f40695042bad044b7
    </v-container>
=======
  <v-container class="price_offers">
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        العملاء
      </h1>
      <v-btn
        class="time-chip"
        color="primary"
        label
        text-color="white"
        @click="dialog = !dialog"
      >
        <v-icon left>
          mdi-account-plus
        </v-icon>
        <span>اضافة عميل</span>
      </v-btn>
    </v-row>

    <my-custom-table />
>>>>>>> Stashed changes
  </v-container>
</template>

<script>
  export default {
    components: {
      MyCustomTable: () => import('../component/MyCustomTable.vue'),
    },
    data: () => ({}),

    computed: {},

    methods: {},
  }
</script>

<style>
.price_offers {
  padding: 2rem 3rem;
}
</style>
