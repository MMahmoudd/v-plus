<template>
  <v-app class="login-layout">
    <v-container
      id="regular-tables"
      tag="section"
    >
      <v-row>
        <v-card
          class="col-12"
          raised
        >
          <div class="form-content">
            <div class="header">
              <img
                src="../../assets/logos.png"
                alt="logo"
                class="logo"
              >
              <span>Valuation Plus <small style="font-size:12px">إصدار تجريبي</small></span>
            </div>

            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="data.code"
                name="code"
                type="text"
                outlined
                :rules="[rules.required]"
                placeholder="الكود"
              />
              <v-text-field
                v-model="data.new_password"
                name="new_password"
                outlined
                placeholder="كلمة السر الجديدة"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              />
              <v-text-field
                v-model="data.new_password_confirmation"
                name="new_password_confirmation"
                outlined
                placeholder="تأكيد كلمة السر"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
              />
              <v-card-actions>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mr-4 submit"
                      v-bind="attrs"
                      type="submit"
                      :loading="isLoading"
                      :disabled="!formValid"
                      v-on="on"
                    >
                      إرسال
                    </v-btn>
                  </template>
                  <span>إرسال</span>
                </v-tooltip>
              </v-card-actions>
            </v-form>
            <template v-if="errorMessage">
              <v-alert
                type="error"
                color="#ff5252"
              >
                {{ errorMessage }}
              </v-alert>
            </template>
            <template v-if="successMessage">
              <v-alert
                type="success"
                color="#4caf50"
              >
                {{ successMessage }}
              </v-alert>
            </template>
          </div>
          <div class="image d-none d-lg-block">
            <img
              src="../../assets/login.png"
              alt="background"
            >
          </div>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
  import { required, string, password } from 'vuelidate/lib/validators'

  import { ServiceFactory } from '../../services/ServiceFactory'
  const profileService = ServiceFactory.get('Profile')

  export default {
    name: 'ResetPassword',
    validations: {
      code: { required, string },
      new_password: { required, password },
      new_password_confirmation: { required, password },
    },
    data () {
      return {
        successMessage: '',
        errorMessage: '',
        formValid: false,
        isValid: true,
        isLoading: false,
        show1: false,
        show2: false,
        data: {
          code: '',
          new_password: '',
          new_password_confirmation: '',
        },
        rules: {
          required: value => !!value || 'مطلوب',
        },
      }
    },
    computed: {

    },
    watch: {
      data: {
        handler (val) {
          for (const key in val) {
            if (!this.data[key]) {
              this.formValid = false
              return
            }
          }
          this.formValid = true
        },
        deep: true,
      },
    },
    methods: {
      async handleSubmit () {
        this.isLoading = true
        try {
          /**
           * message
           * success
           */
          const { data } = await profileService.resetPassword(this.data)
          const { message, success } = data
          if (success) {
            this.setAndClean('successMessage', message, 2000)

            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)
          } else {
            throw new Error(message)
          }
        } catch (error) {
          const errorMessage = error.response.data.error || error.message
          this.setAndClean('errorMessage', errorMessage, 2000)
        } finally {
          this.isLoading = false
        }
      },

      /**
       * value : string
       * after : numbers
       */
      setAndClean (key, value, after) {
        this[key] = value

        setTimeout(() => {
          this[key] = undefined
        }, after || 1000)
      },
    },
  }
</script>
<style lang="scss">
.login-layout {
  direction: ltr;
}
  .v-card{
    max-width: 90% ;
    max-height: fit-content;
    margin: auto;
    display: flex;
    align-items: center;
    padding: 0;
    border-radius: 15px !important;
    background-color: #fff !important;
    transform: translate(0%, 25%);
    .image{
      width: 50%;
      img{
      width: 100%;
      }
    }
    .form-content {
      width: 100%;
    }
    .submit{
      left: 50%;
      transform: translate(-50%, 0%);
      background-color: #E9BB70 !important;
      color: #fff;
    }
    .header{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      background-color: #E6E8E6;
      padding: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span{
      font-size: 20px;
      margin-left: 10px;
    }
    }
    .d-flex{
      justify-content: space-between;
      display: flex;
    }
    .v-form{
      padding: 20px;
      input{
        min-height: 40px !important;
      }
      .vue-tel-input{
        margin: 15px 0;
        &:focus-within{
            box-shadow: unset !important;
            border-color: unset !important;
        }
      }
      v-text-field{
        border-radius: 3px;
        border: 1px solid #bbb;
        text-align: left;
      }
      // .v-input{
      //   &:focus{
      //       box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
      //       border-color: #66afe9;
      //   }
      // }
      .v-text-field--outlined.v-input--has-state fieldset{
        border: 1px solid #bbb;
        &:focus{
          outline: none;
        }
      }
      .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details{
        &:focus{
          border: 1px solid #bbb;
              outline: none;
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
            border-color: #66afe9;
        }
      }
      .v-label{
          left: 0px !important;
          right: auto !important;
        }
    }
    input:-internal-autofill-selected {
      background-color: #fff !important;
    }
    .v-list-item{
      background-color: #00000008;
      padding:10px 20px;
    }
    .v-avatar{
      margin: 0 15px;
    }

    .forgot-password-link {
      display: flex;
      justify-content: center;

      a {
        text-decoration: none;
      }
    }
  }
   @media screen  {
    @media (min-width: 1264px) {
      .v-application .form-content {
        width: 50% !important;
      }
      .v-application .v-card {
        width: 70% !important;
      }
    }

    @media (max-width: 1264px) {
      .form-content {
        padding: 15px 0px;
      }
    }
  }
</style>
