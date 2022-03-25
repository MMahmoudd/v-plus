<template>
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
              v-model="data.email"
              name="email"
              type="email"
              outlined
              :rules="[rules.required]"
              placeholder="البريد الإلكتروني"
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
                    إرسال الكود
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
        <div class="image">
          <img
            src="../../assets/login.png"
            alt="background"
          >
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
  import { required, email, password } from 'vuelidate/lib/validators'

  import { ServiceFactory } from '../../services/ServiceFactory'
  const profileService = ServiceFactory.get('Profile')

  export default {
    name: 'ForgotPassword',
    validations: {
      email: { required, email },
      password: { required, password },
    },
    data () {
      return {
        successMessage: '',
        errorMessage: '',
        formValid: false,
        isValid: true,
        isLoading: false,
        show1: false,
        data: {
          email: '',
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
          if (this.data.email) {
            this.formValid = true
          } else {
            this.formValid = false
          }
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
          const { data } = await profileService.forgotPassword({ email: this.data.email })
          const { message, success } = data
          if (success) {
            this.setAndClean('successMessage', message, 2000)
            setTimeout(() => {
              this.$router.push('/enter-code')
            }, 1500)
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
  .v-card{
    max-width: 70% ;
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
    .form-content{
      width: 50%;
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
</style>
