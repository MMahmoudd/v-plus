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
      <template v-for="(item, i) in computedItems">
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
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const LinksService = ServiceFactory.get('Links')
  // TODO : "important links" rount can be expand but can't be clicked to visit

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
          to: '/Treatments',
          permission: ['مرحلة الادخال', 'مرحلة الاعتماد', 'مرحلة التقييم', 'مرحلة المراجعة'],
          // children: [
          //   {
          //     title: 'المعاملات',
          //     to: '/Treatments',
          //     role: true,
          //   },
          //   {
          //     title: 'تقييم المعاملة',
          //     to: '/Evaluate-Treatment',
          //     role: true,
          //   },
          // ],
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
              permission: 'العملاء',
            },
            {
              title: 'عروض الأسعار',
              to: '/price-offers',
              role: true,
              permission: 'عروض الأسعار',
            },
            {
              icon: 'fa-home',
              title: 'الفواتير',
              to: '/Bills',
              role: true,
              permission: 'الفواتير',
            },
            {
              icon: 'fa-home',
              title: 'المصروفات',
              to: '/expenses',
              role: true,
              permission: 'المصروفات',
            },
          ],
          permission: 'المالية',
        },
        {
          title: 'المستخدمين',
          icon: 'fa-users',
          to: '/Users',
          role: true,
          permission: 'المستخدمين',
        },
        {
          title: 'التقارير',
          icon: 'fa-book-open',
          role: true,
          children: [
            {
              title: 'تقرير المستخدمين',
              permission: 'تقرير المستخدمين',
              to: '/reports/users-report',
              role: true,
            },
            {
              title: 'تقرير المصروفات',
              permission: 'تقرير المصروفات',
              to: '/reports/expenses-report',
              role: true,
            },
            {
              title: 'تقرير الايرادات',
              to: '/reports/revenues-report',
              role: true,
              permission: 'تقرير الإيرادات',
            },
            {
              title: 'تقرير الارباح',
              to: '/reports/profits-reports',
              role: true,
              permission: 'تقرير الارباح',
            },
          ],
        },
        {
          title: 'روابط هامة',
          icon: 'fa-link',
          open: true,
          click: () => { this.$router.push('/links') },
          role: true,
          name: 'links',
          to: '/links',
          children: [
          ],
        },
        // {
        //   title: 'دليل الاستخدام (قريبا)',
        //   icon: 'fa-retweet',
        //   // to: '/',
        //   role: true,
        // },
        {
          title: 'الاعدادات',
          icon: 'fa-cog',
          role: true,
          children: [
            {
              title: 'ملف المنشأة',
              to: '/facility-file',
              role: true,
              permission: 'ملف المنشاة',
            },
            {
              title: 'اعدادات المستخدمين',
              to: '/users-setting',
              role: true,
              permission: 'المناصب',
            },
            {
              title: 'الاشتراكات (قريبا)',
              // to: '/users-setting',
              role: true,
              permission: 'الاشتراكات',
            },
            {
              title: 'التكاملات',
              icon: 'fa-cogs',
              role: true,
              to: '/integrations/google-maps',
            },
          ],
        },
        {
          title: 'تخصيص المعاملة',
          icon: 'fa-cogs',
          role: true,
          permission: 'تخصيص المعاملة',
          children: [
            {
              title: 'النماذج',
              to: '/treatment-settings/sample',
              role: true,
            },
            {
              title: 'المنطقة',
              to: '/treatment-settings/regions',
              role: true,
            },
            {
              title: 'المدينة',
              to: '/treatment-settings/cities',
              role: true,
            },
            {
              title: 'الحي',
              to: '/treatment-settings/neighborhoods',
              role: true,
            },
            {
              title: 'نوع العقار',
              to: '/treatment-settings/propertyTypes',
              role: true,
            },
            {
              title: 'استخدام العقار',
              to: '/treatment-settings/propertyRatings',
              role: true,
            },
            {
              title: 'حالة البناء',
              to: '/treatment-settings/constructionConditions',
              role: true,
            },
            {
              title: 'عملة التقييم',
              to: '/treatment-settings/EvaluationCurrencies',
              role: true,
            },
            {
              title: 'انواع التقارير',
              to: '/treatment-settings/ReportTypes',
              role: true,
            },
            {
              title: 'فرضية القيمة',
              to: '/treatment-settings/ValueHypothesisLists',
              role: true,
            },
            {
              title: 'اساس القيمة',
              to: '/treatment-settings/ValueBasiLists',
              role: true,
            },
            {
              title: 'حالة الاشغال',
              to: '/treatment-settings/WorkingStatuses',
              role: true,
            },
            {
              title: 'نوع الاسقف',
              to: '/treatment-settings/bishopTypeSetting',
              role: true,
            },
            {
              title: 'التصميم',
              to: '/treatment-settings/designSetting',
              role: true,
            },
            {
              title: 'الواجهة الشرقية',
              to: '/treatment-settings/eastFacadeSetting',
              role: true,
            },
            {
              title: 'الواجهة الشمالية',
              to: '/treatment-settings/northFacadeSetting',
              role: true,
            },
            {
              title: 'الواجهة الغربية',
              to: '/treatment-settings/westFacadeSetting',
              role: true,
            },
            {
              title: 'الواجهة الجنوبية',
              to: '/treatment-settings/southFacadeSetting',
              role: true,
            },
            {
              title: 'التيار الكهربائي',
              to: '/treatment-settings/electricCurrentSetting',
              role: true,
            },
            {
              title: 'نوع أرضية المدخل',
              to: '/treatment-settings/entranceFloorTypeSetting',
              role: true,
            },
            {
              title: 'نوع أرضية الاحواش',
              to: '/treatment-settings/indoorTypeSetting',
              role: true,
            },
            {
              title: 'الموقع العام',
              to: '/treatment-settings/generalLocation',
              role: true,
            },
            {
              title: 'نوع العزل',
              to: '/treatment-settings/insulationTypeSetting',
              role: true,
            },
            {
              title: 'الجار',
              to: '/treatment-settings/neighborSetting',
              role: true,
            },
            {
              title: 'المنسوب',
              to: '/treatment-settings/propertyLevelSetting',
              role: true,
            },
            {
              title: 'نوع أرضية الاستقبال',
              to: '/treatment-settings/receptionFloorTypeSetting',
              role: true,
            },
            {
              title: 'نوع أرضية الغرف',
              to: '/treatment-settings/roomFloorTypeSetting',
              role: true,
            },
            {
              title: 'اضاءة الشوارع',
              to: '/treatment-settings/streetLightingSetting',
              role: true,
            },
            {
              title: 'الشوارع',
              to: '/treatment-settings/streetSetting',
              role: true,
            },
            {
              title: 'الهيكل الانشائي',
              to: '/treatment-settings/structureConstructionSetting',
              role: true,
            },
          ],
        },
      ],
    }),
    mounted () {
      this.fetchLinks()
    },
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
        /**
           * ? check parent
           */
        return this.sidebarList.filter(this.fitlerItem)
          /**
           * ? check children
           */
          .map(item => {
            return ({ ...item, children: item.children ? item.children.filter(this.fitlerItem) : undefined })
          })
          /**
           * this is frustrating
           * ? deleting items that had children but they don't have permisson now
           */
          .filter(item => {
            if (Array.isArray(item.children) && item.children.length === 0) {
              return false
            } else {
              return true
            }
          })
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
      async fetchLinks () {
        const linksIndex = this.sidebarList.findIndex(item => item.name === 'links')
        const { data } = await LinksService.getAllItems()
        console.log(this.sidebarList[linksIndex])
        this.sidebarList[linksIndex].children = data.map(item => ({ title: item.name, to: item.link, popup: true }))
        this.$nextTick()
        console.log(this.sidebarList[linksIndex])
      },
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
      fitlerItem (item) {
        if (item.permission) {
          if (Array.isArray(item.permission)) {
            let shouldGo = false
            for (let index = 0; index < item.permission.length; index++) {
              const { read, add, update, delete: remove } = this.can(item.permission[index])
              if (read || add || update || remove) {
                shouldGo = true
                break
              }
            }
            return shouldGo
          } else {
            const { read, add, update, delete: remove } = this.can(item.permission)
            if (read || add || update || remove) {
              return true
            } else {
              return false
            }
          }
        }
        return true
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
