<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    class="pt-16"
    v-bind="$attrs"
  >
    <v-list>
      <template v-for="(item, i) in sidebarList">
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
  import { mapState } from 'vuex'

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
      sidebarList: [
        {
          title: 'الرئيسية',
          icon: 'fa-home',
          to: '/',
          role: true,
        },
        {
          title: 'المعاملات',
          icon: 'fa-file-alt',
          role: true,
          children: [
            {
              title: 'المعاملات',
              to: '/Treatments',
              role: true,
            },
            {
              title: 'تقييم المعاملة',
              to: '/Evaluate-Treatment',
              role: true,
            },
          ],
        },
        {
          title: 'المالية',
          icon: 'fa-money-bill-alt',
          role: true,
          children: [
            {
              title: 'العملاء',
              to: '/customers',
              role: true,
            },
            {
              title: 'عروض الأسعار',
              to: '/price-offers',
              role: true,
            },
            {
              icon: 'fa-home',
              title: 'الفواتير',
              to: '/Bills',
              role: true,
            },
            {
              icon: 'fa-home',
              title: 'المصروفات',
              to: '/expenses',
              role: true,
            },
          ],
        },
        {
          title: 'المستخدمين',
          icon: 'fa-users',
          to: '/Users',
          role: true,
        },
        {
          title: 'التقارير (Soon)',
          icon: 'fa-book-open',
          role: true,
          children: [
            {
              title: 'تفرير المستخدمين (Soon)',
              // to: '/customers',
              role: true,
            },
            {
              title: 'تقرير المصروفات (Soon)',
              // to: '/price-offers',
              role: true,
            },
            {
              title: 'تقرير الايرادات (Soon)',
              // to: '/Bills',
              role: true,
            },
            {
              title: 'تقرير الارباح (Soon)',
              // to: '/expenses',
              role: true,
            },
          ],
        },
        {
          title: 'روابط هامة (Soon)',
          icon: 'fa-link',
          role: true,
          children: [
            {
              title: 'رابط 1 (Soon)',
              // to: '/customers',
              role: true,
            },
            {
              title: 'رابط 2 (Soon)',
              // to: '/price-offers',
              role: true,
            },
            {
              title: 'رابط 3 (Soon)',
              // to: '/Bills',
              role: true,
            },
            {
              title: 'رابط 4 (Soon)',
              // to: '/expenses',
              role: true,
            },
          ],
        },
        {
          title: 'دليل الاستخدام (Soon)',
          icon: 'fa-retweet',
          // to: '/',
          role: true,
        },
        {
          title: 'الاعدادات',
          icon: 'fa-cog',
          role: true,
          children: [
            {
              title: 'ملف المنشأة',
              to: '/facility-file',
              role: true,
            },
            {
              title: 'اعدادات المستخدمين',
              to: '/users-setting',
              role: true,
            },
            {
              title: 'الاشتراكات (Soon)',
              // to: '/users-setting',
              role: true,
            },
          ],
        },
        {
          title: 'تخصيص المعاملة',
          icon: 'fa-cogs',
          role: true,
          children: [
            {
              title: 'اعدادات النماذج',
              to: '/treatment-settings/sample',
              tole: true,
            },
            {
              title: 'إعدادات المنطقة',
              to: '/treatment-settings/regions',
              role: true,
            },
            {
              title: 'إعدادات المدينة',
              to: '/treatment-settings/cities',
              role: true,
            },
            {
              title: 'إعدادات الحي',
              to: '/treatment-settings/neighborhoods',
              role: true,
            },
            {
              title: 'أنواع العقارات',
              to: '/treatment-settings/propertyTypes',
              tole: true,
            },
            {
              title: 'تصنيف العقارات',
              to: '/treatment-settings/propertyRatings',
              tole: true,
            },
          ],
        },
      ],
    }),
    computed: {
      ...mapState(['barColor'], {
        role: (state) => state.login.userDataPermission,
      }),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        console.log(this.$route)
        return this.sidebarList.map(this.mapItem)
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
    opacity: 0
    color: #000 !important
    font-weight: bold

  .v-list-group__items
        .v-list-item
          margin-bottom: 0 !important
          margin: 10px 0
          font-size: 0px
        .v-list-item--active
              color: #3772ff !important
              .v-list-item__title
                  font-weight: 650
                  font-size: 16px
  .v-list-group--sub-group
    .v-list-item
      padding: 0
      padding-left: 0 !important
      color: #fff !important
      margin: 10px 0
  .v-list-item--active
    background-color: transparent !important
    border-radius: 15px
    border-color: transparent !important
    color: #000 !important
    font-weight: 900
    .v-icon.v-icon
      color: #3772ff !important
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
