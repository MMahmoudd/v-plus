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
              src="../assets/logos.png"
              alt="logo"
              class="logo"
            >
            <span>Valuation Plus</span>
          </div>
          <v-form @submit.prevent="loginSubmit()">
            <v-text-field
              v-model="userLogin.email"
              type="email"
              outlined
              :rules="[rules.required]"
              :placeholder="$t('login.userName')"
            />
            <v-text-field
              v-model="userLogin.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              counter
              outlined
              minlength="8"
              :placeholder="$t('login.password')"
              @click:append="show1 = !show1"
            />
          </v-form>
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-4 submit"
                  v-bind="attrs"
                  :class="{'is-loading': isLoading}"
                  :disabled="formValid"
                  v-on="on"
                  @click="loginSubmit"
                >
                  {{ $t('login.login') }}
                </v-btn>
              </template>
              <span>{{ $t('login.login') }}</span>
            </v-tooltip>
          </v-card-actions>
          <template v-if="loginErrorMessage">
            <v-alert
              type="error"
              color="#ff5252"
            >
              {{ loginErrorMessage }}
            </v-alert>
          </template>
        </div>
        <div class="image">
          <img
            src="../assets/login.png"
            alt="background"
          >
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { required, email, password } from 'vuelidate/lib/validators'
  export default {
    validations: {
      email: { required, email },
      password: { required, password },
    },
    data () {
      return {
        formValid: false,
        isValid: true,
        show1: false,
        userLogin: {
          email: '',
          password: '',
        },
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.login.isLoading,
        loginErrorMessage: state => state.login.loginErrorMessage,
        loginSuccessful: state => state.login.loggingIn,
      }),
    },
    watch: {
      userLogin: {
        handler (val) {
          if (this.userLogin.email && this.userLogin.password) {
            this.formValid = false
          } else {
            this.formValid = true
          }
        },
        deep: true,
      },
    },
    methods: {
      gotohomepage () {
        window.location.href = '/'
      },
      ...mapActions([
        'doLogin',
      ]),
      loginSubmit () {
        if (!this.formValid) {
          this.doLogin({
            email: this.userLogin.email,
            password: this.userLogin.password,
          })
        }
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
  }
</style>
