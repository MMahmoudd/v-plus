<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
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
    </v-list>

    <v-divider class="mb-2" />

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
      <!--Companies Management -->
      <v-list-group
        no-action
        sub-group
        color="#ff9800"
        :expand="expand"
      >
        <template
          v-slot:activator
        >
          <v-list-item-icon>
            <v-icon>fa-city</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('companies.companies&branches') }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(item, i) in companies"
          :key="i"
          link
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
            color="#ff9800"
          />
        </v-list-item>
      </v-list-group>
      <!--Assets Management -->
      <v-list-group
        no-action
        sub-group
        color="#ff9800"
        :expand="expand"
      >
        <template
          v-slot:activator
        >
          <v-list-item-icon>
            <v-icon>mdi-safe</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('sidbar.assets') }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(item, i) in assets"
          :key="i"
          link
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
            color="#ff9800"
          />
        </v-list-item>
      </v-list-group>
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
      statictics: [
        {
          icon: 'mdi-chart-bar',
          title: vm.$t('sidbar.statistics'),
          to: '/',
        },
      ],
      companies: [
        {
          title: vm.$t('sidbar.companies'),
          icon: 'mdi-domain',
          to: '/Companies',
        },
        {
          title: vm.$t('sidbar.CompaniesBranches'),
          icon: 'mdi-source-branch',
          to: '/Companies-branches',
        },
        {
          title: vm.$t('sidbar.CompaniesGroup'),
          icon: 'fa-layer-group',
          to: '/Companies-groups',
        },
        {
          title: vm.$t('sidbar.CompaniesArea'),
          icon: 'fa-location-arrow',
          to: '/Companies-area',
        },
        {
          title: vm.$t('sidbar.CompaniesFloor'),
          icon: 'mdi-floor-plan',
          to: '/Companies-floor',
        },
        {
          title: vm.$t('sidbar.CompaniesRoom'),
          icon: 'mdi-select-place',
          to: '/Companies-room',
        },
      ],
      assets: [
        {
          title: vm.$t('assets.assets'),
          icon: 'mdi-safe',
          to: '/Assets',
        },
        {
          title: vm.$t('sidbar.assetsType'),
          icon: 'fa-file-contract',
          to: '/Assets-type',
        },
        {
          title: vm.$t('sidbar.assetsBrand'),
          icon: 'fa-copyright',
          to: '/Assets-brand',
        },
        {
          title: vm.$t('sidbar.assetsCategory'),
          icon: 'fa-object-group',
          to: '/Assets-category',
        },
        {
          title: vm.$t('sidbar.assetsModel'),
          icon: 'fa-shapes',
          to: '/Assets-model',
        },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
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

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  .v-navigation-drawer .v-icon.v-icon
      margin: 0 8px !important
      color: #fff !important

  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)
    color: #fff !important
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
      background-color: transparent !important
      border-left: 5px solid #E9BB70
      border-color: #E9BB70 !important
      color: #E9BB70 !important
      font-weight: bold
      .v-icon.v-icon
        color: #E9BB70 !important
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
