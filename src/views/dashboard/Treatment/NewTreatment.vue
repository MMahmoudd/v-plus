<template>
    <v-container>
        <v-row justify='space-between' align='center' class="mx-0 mt-4">
            <h1>معاملة رقم 1920215841</h1>
            <v-chip class="ma-2 time-chip" color="blue" label text-color="white">
                <v-icon left> mdi-clock-time-four-outline </v-icon>
                <span>تاريخ المعاملة</span>
            </v-chip>
        </v-row>
        <v-card class="form-container">
            <v-container>
                <div>
                    <form>
                        <div>
                            <h2>الملحقات</h2>
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="الصك"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="المخطط"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="خطاب التكليف"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="الأرشيف"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                            </v-row>
                        </div>
                        <hr>
                        <div>
                            <h2>إسناداً إلى</h2>
                            <v-row>
                                <v-col
                                    class="d-flex"
                                    cols="12"
                                    md="4"
                                >
                                    <v-select
                                    :items="items"
                                    label="المقيم"
                                    :error-messages="selectErrors"
                                    outlined
                                    ></v-select>
                                </v-col>
                                <v-col
                                    class="d-flex"
                                    cols="12"
                                    md="4"
                                >
                                    <v-select
                                    :items="items"
                                    label="المراجع"
                                    :error-messages="selectErrors"
                                    outlined
                                    ></v-select>
                                </v-col>
                                <v-col
                                    class="d-flex"
                                    cols="12"
                                    md="4"
                                >
                                    <v-select
                                    :items="items"
                                    label="المعتمد"
                                    :error-messages="selectErrors"
                                    outlined
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </div>
                    </form>
                </div>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    name: 'NewTreatment',

    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
    }),

    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
    },

    methods: {
    //   submit () {
    //     this.$v.$touch()
    //   },
    //   clear () {
    //     this.$v.$reset()
    //     this.name = ''
    //     this.email = ''
    //     this.select = null
    //     this.checkbox = false
    //   },
    },
  }
</script>

<style lang="scss" scoped>
hr{
    margin: 40px 0;
    border-top: 1px solid #eee;
}
.time-chip span{
    font-size: 15px;
}
.form-container{
    margin-top: 50px;
}
.form-container h2{
    font-size: 25px;
    color: #37A8FF;
    margin-bottom: 25px
}
</style>
