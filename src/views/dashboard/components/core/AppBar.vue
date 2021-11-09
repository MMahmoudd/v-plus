<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light mx-2"
    />
    <h1>{{ $t('navbar.welcome') }}</h1>
    <v-spacer />
    <div class="mx-3" />
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
          @click="logout()"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.logout') }}</span>
    </v-tooltip>
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
      Languages: [
        { text: 'AR' },
        { text: 'EN' },
      ],
    }),

    computed: {
      ...mapState(['drawer']),
    },
    created () {
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
  .v-app-bar{
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 20px 0px, rgb(0 0 0 / 14%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 0px 0px 0px !important;
    .v-input{
      max-width: 15%;
    }
  }
</style>
