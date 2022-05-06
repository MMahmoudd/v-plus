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
            <!-- logo -->
            <div class="header">
              <img
                src="../assets/logos.png"
                alt="logo"
                class="logo"
              >
              <span>Valuation Plus <small style="font-size:12px">إصدار تجريبي</small></span>
            </div>

            <v-form @submit.prevent="loginSubmit()">
              <v-text-field
                v-model="userLogin.email"
                name="email"
                type="email"
                outlined
                :rules="[rules.required]"
                placeholder="أسم المستخدم"
                @change="onEmailChange"
              />

              <v-select
                v-model="userLogin.facility_id"
                :items="facilities"
                item-text="name"
                item-value="id"
                outlined
              />

              <v-text-field
                v-model="userLogin.password"
                name="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                counter
                outlined
                minlength="8"
                placeholder="كلمة المرور"
                :disabled="!userLogin.email || !userLogin.facility_id"
                @click:append="show1 = !show1"
              />
              <v-card-actions>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mr-4 submit"
                      v-bind="attrs"
                      type="submit"
                      :class="{'is-loading': isLoading}"
                      :disabled="!formValid"
                      v-on="on"
                    >
                      تسجيل دخول"
                    </v-btn>
                  </template>
                  <span>تسجيل دخول"</span>
                </v-tooltip>
              </v-card-actions>
            </v-form>

            <div class="forgot-password-link">
              <router-link to="/forgot-password">
                هل نسيت كلمة السر؟
              </router-link>
            </div>
            <template v-if="loginErrorMessage">
              <v-alert
                type="error"
                color="#ff5252"
              >
                {{ loginErrorMessage }}
              </v-alert>
            </template>
          </div>
          <!-- right image -->
          <div class="image d-none d-lg-block">
            <img
              src="../assets/login.png"
              alt="background"
            >
          </div>
        <!-- end right image -->
        </v-card>
      </v-row>
    </v-container>
  </v-app>
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
        list: [],
        formValid: false,
        isValid: true,
        show1: false,
        userLogin: {
          email: '',
          password: '',
          facility_id: '',
        },
        rules: {
          required: value => !!value || 'مطلوب.',
          min: v => v.length >= 8 || '8 حروف على الأقل',
        },
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.login.isLoading,
        loginErrorMessage: state => state.login.loginErrorMessage,
        loginSuccessful: state => state.login.loggingIn,
        facilities: state => state.login.facilities,
      }),
    },
    watch: {
      userLogin: {
        handler (val) {
          if (this.userLogin.email && this.userLogin.password) {
            this.formValid = true
          } else {
            this.formValid = false
          }
        },
        deep: true,
      },
      facilities: {
        handler (n, o) {
          this.list = n
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
        'getFacilities',
      ]),
      loginSubmit () {
        if (this.formValid) {
          this.doLogin({
            email: this.userLogin.email,
            password: this.userLogin.password,
            facility_id: this.userLogin.facility_id,
          })
        }
      },
      onEmailChange (value) {
        this.getFacilities(value)
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
  .v-application--wrap {
    height: auto;
    min-height: auto !important;
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
