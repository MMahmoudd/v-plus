
<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    width="260"
    class="pt-16"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom`"
        v-bind="props"
      />
    </template>
    <!--<v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center mx-auto"
          size="150"
          rounded="0"
        >
          <v-avatar
            size="150"
            rounded="0"
            tile
          >
            <img
              src="../../../../assets/logos.png"
              alt="logo"
            >
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>
    </v-list> -->
    <v-list>
      <!--Home page-->
      <template
        v-for="(item, i) in statictics"
      >
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        />

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: (vm) => ({
      expand: false,
      permissions: [],
      statictics: [
        {
          icon: 'fa-home',
          title: 'الرئيسية',
          to: '/',
          role: true,
        },
      ],
    }),
    computed: {
      ...mapState(['barColor'],
                  { role: state => state.login.userDataPermission },
      ),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },
    created () {
      // this.checkLinksRole()
    },
    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
      // checkLinksRole () {
      //   const userDataPermission = localStorage.getItem('userDataPermission')
      //   const permissions = userDataPermission.split(',')
      //   this.permissions = permissions
      //   // console.log(this.permissions)

      //   this.companies = this.companies.filter(item => {
      //     for (let i = 0; i < item.role.length; i++) {
      //       if (this.permissions.includes(item.role[i])) {
      //         return true
      //       }
      //     }
      //   })
      //   this.assets = this.assets.filter(item => {
      //     for (let i = 0; i < item.role.length; i++) {
      //       if (this.permissions.includes(item.role[i])) {
      //         return true
      //       }
      //     }
      //   })
      // },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  .v-navigation-drawer .v-icon.v-icon
      margin: 0 8px !important
      color: #000 !important

  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)
    color: #000 !important
    font-weight: bold

  #core-navigation-drawer

    .v-list-group__header.v-list-item--active:before
      opacity: .2
    .v-list-group__items
          .v-list-item
            margin-bottom: 0 !important
    .v-list-group--sub-group
      .v-list-item
        padding: 0
        padding-left: 0 !important
    .v-list-item--active
      background-color: #FDCA40 !important
      border-radius: 15px
      width: fit-content
      margin-right: 15px
      border-color: #FDCA40 !important
      color: #000 !important
      font-weight: bold
      .v-icon.v-icon
        color: #000 !important
    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
