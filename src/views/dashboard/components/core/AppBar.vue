<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    flat
    height="75"
    right="75"
    class="fixed-top"
  >
    <v-btn
      class="mr-3 collapse"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="drawer">
        fa-arrow-right
      </v-icon>
      <v-icon v-else>
        fa-arrow-left
      </v-icon>
    </v-btn>
    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light mx-2"
    />
    <v-divider
      class="pl-2 pr-2"
      vertical
    />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <h2
          v-if="usersData"
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar
            size="56"
          >
            <img
              :src="'https://taqeeem.millennium.sa/' + userData.image"
              alt="profile image"
            >
          </v-avatar>
          {{ usersData.name }}
          <v-icon color="#3772FF">
            fa-angle-down
          </v-icon>
        </h2>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
            class="ml-2"
            min-width="0"
            text
            @click="logout()"
          >
            تسجيل خروج <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer />
    <div class="mx-3" />
    <div class="header">
      <span>Valuation Plus</span>
      <img
        src="../../../../assets/logos.png"
        alt="logo"
        class="logo"
      >
    </div>
  </v-app-bar>
</template>

<script>

  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: (vm) => ({
      selected: '',
      usersData: {},
      Languages: [
        { text: 'AR' },
        { text: 'EN' },
      ],
    }),

    computed: {
      ...mapState(['drawer']),
    },
    created () {
      if (localStorage.getItem('userData')) {
        this.usersData = JSON.parse(localStorage.getItem('userData'))
        console.log(this.userData)
      }
      if (localStorage.getItem('userLang')) {
        const userLang = localStorage.getItem('userLang')
        userLang === 'ar' ? (this.$vuetify.rtl = true) : (this.$vuetify.rtl = false)
      }
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      logout () {
        this.$store.commit('logout')
      },
    },
  }
</script>

<style lang="scss">
.fixed-top{
  position: fixed !important;
}
  .v-app-bar{
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 20px 0px, rgb(0 0 0 / 14%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 0px 0px 0px !important;
    .collapse{
      background-color: #3772FF !important;
      .v-icon{
        color: #fff !important;
      }
    }
    .v-input{
      max-width: 15%;
    }
    .header{
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      background-color: #E6E8E6;
      padding: 10px;
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
    span{
      font-size: 16px;
      margin-left: 10px;
    }
    }
    // responsive slider
    @media only screen and (max-width: 424.98px) {
      .header{
        display: none;
      }
    }
  }
</style>
