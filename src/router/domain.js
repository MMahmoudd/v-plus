let companyRouters = [
    // unAuthorized Page
    {
      path: '/notAuthorized',
      name: 'notAuthorized',
      component: () => import('../pages/NotAuthorized.vue'),
    },
    // Home
    {
      name: 'statistics',
      path: '/',
      meta: { requiresAuth: true },
      component: () => import('@/views/dashboard/Dashboard'),
    },
    {
      name: 'Links',
      path: '/Links',
      component: () => import('@/views/dashboard/Links/List.vue'),
    },
    // Users
    {
      name: 'Users',
      path: '/Users',
      component: () => import('@/views/dashboard/users/Users.vue'),
      meta: { requiresAuth: true, permissions: 'المستخدمين' },
    },
    {
      name: 'user Form',
      path: '/userForm/:id?',
      component: () => import('@/views/dashboard/users/Form.vue'),
      meta: { requiresAuth: true, permissions: 'المستخدمين', actions: true },
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('@/views/dashboard/users/Profile.vue'),
      meta: { requiresAuth: true },
    },
    // Start Finance
    // Start Treatments
    {
      name: 'Treatments',
      path: '/Treatments',
      component: () => import(/* webpackChuckName: "Transactions" */'@/views/dashboard/Treatment/Treatments'),
      meta: { requiresAuth: true, permissions: ['مرحلة الادخال', 'مرحلة الاعتماد', 'مرحلة التقييم', 'مرحلة المراجعة', 'تعديل السعر'] },
    },
    {
      name: 'UpdateTreatment',
      path: '/New-Treatment',
      component: () => import('@/views/dashboard/Treatment/NewTreatment'),
      // ! Todo : change the indectaror for new transaction to be in query not params
      meta: { requiresAuth: true, permissions: 'مرحلة الادخال', actions: true },
    },
    {
      name: 'NewTreatment',
      path: '/New-Treatment/:id',
      component: () => import('@/views/dashboard/Treatment/NewTreatment'),
      // ! Todo : change the indectaror for new transaction to be in query not params
      meta: { requiresAuth: true, permissions: 'مرحلة الادخال', actions: true },
    },
    // {
    //   name: 'EvaluateTreatment',
    //   path: '/Evaluate-Treatment',
    //   component: () => import('@/views/dashboard/Treatment/EvaluateTreatment/EvaluateTreatment'),
    //   meta: { requiresAuth: true },
    // },
    {
      name: 'EvaluateTreatment',
      path: '/Evaluate-Treatment/:id',
      component: () => import('@/views/dashboard/Treatment/EvaluateTreatment/EvaluateTreatment'),
      meta: { requiresAuth: true, permissions: ['مرحلة الادخال', 'مرحلة الاعتماد', 'مرحلة التقييم', 'مرحلة المراجعة', 'تعديل السعر'] },
    },
    {
      name: 'AccountantTreatment',
      path: '/Accountant-Treatment/:id',
      component: () => import('@/views/dashboard/Treatment/AccountantTreatment'),
      meta: { requiresAuth: true, permissions: 'تعديل السعر', actions: true },
    },
    // Start Customers
    {
      name: 'Customers',
      path: '/customers',
      component: () => import('@/views/dashboard/Finance/customers/Customers.vue'),
      meta: { requiresAuth: true, permissions: 'العملاء' },
    },
    {
      name: 'Customers Form',
      path: '/customerForm/:id?',
      component: () => import('@/views/dashboard/Finance/customers/form.vue'),
      meta: { requiresAuth: true, permissions: 'العملاء', actions: true },
    },
    // Start Offers
    {
      name: 'PriceOffers',
      path: '/price-offers',
      component: () => import('@/views/dashboard/Finance/Offers/PriceOffers.vue'),
      meta: { requiresAuth: true, permissions: 'عروض الأسعار' },
    },
    {
      name: 'offers Form',
      path: '/offersForm/:id?',
      component: () => import('@/views/dashboard/Finance/Offers/Form.vue'),
      meta: { requiresAuth: true, permissions: 'عروض الأسعار', actions: true },
    },
    // SETTING
    {
      name: 'facilityFile',
      path: '/facility-file',
      component: () => import('@/views/dashboard/setting/Facility.vue'),
      meta: { requiresAuth: true, permissions: 'ملف المنشاة' },
    },
    {
      name: 'Bills',
      path: '/bills',
      component: () => import('@/views/dashboard/Finance/Billing/Bills.vue'),
      meta: { requiresAuth: true, permissions: 'الفواتير' },
    },
    {
      name: 'Bills Form',
      path: '/billsForm/:id?',
      component: () => import('@/views/dashboard/Finance/Billing/Form.vue'),
      meta: { requiresAuth: true, permissions: 'الفواتير', actions: true },
    },
    {
      name: 'Expenses',
      path: '/expenses',
      component: () => import('@/views/dashboard/Finance/expenses/Expenses.vue'),
      meta: { requiresAuth: true, permissions: 'المصروفات' },
    },
    // Users Setting
    {
      name: 'Users Setting',
      path: '/users-setting',
      component: () => import('@/views/dashboard/setting/userSetting/UserSetting.vue'),
      meta: { requiresAuth: true, permissions: 'المناصب' },
    },
    {
      name: 'user Setting Form',
      path: '/userSettingForm/:id?',
      component: () => import('@/views/dashboard/setting/userSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'المناصب', actions: true },
    },
    // // treatment settings
    // {
    //   name: 'treatmentSettings',
    //   path: '/treatment-settings',
    //   meta: { requiresAuth: true },
    //   redirect: '/treatment-settings/regions',
    //   component: () => import('@/views/dashboard/TreatmentSettings/Region/List.vue'),
    // },
    // treatment settings - regions
    {
      name: 'regions',
      path: '/treatment-settings/regions',
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
      component: () => import('@/views/dashboard/TreatmentSettings/Region/List.vue'),
    },
    {
      name: 'regionsForm',
      path: '/treatment-settings/regionsForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/Region/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // treatment settings - cities
    {
      name: 'cities',
      path: '/treatment-settings/cities',
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
      component: () => import('@/views/dashboard/TreatmentSettings/City/List.vue'),
    },
    {
      name: 'citiesForm',
      path: '/treatment-settings/citiesForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/City/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // treatment settings - Sample
    {
      name: 'sample',
      path: '/treatment-settings/sample',
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
      component: () => import('@/views/dashboard/TreatmentSettings/Sample/List.vue'),
    },
    // treatment settings - Neighborhoods
    {
      name: 'neighborhoods',
      path: '/treatment-settings/neighborhoods',
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
      component: () => import('@/views/dashboard/TreatmentSettings/Neighborhood/List.vue'),
    },
    {
      name: 'neighborhoodsForm',
      path: '/treatment-settings/neighborhoodsForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/Neighborhood/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },

    // /treatment-settings/propertyTypes
    {
      name: 'propertyTypes',
      path: '/treatment-settings/propertyTypes',
      component: () => import('@/views/dashboard/TreatmentSettings/PropertyType/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'propertyTypesForm',
      path: '/treatment-settings/propertyTypesForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/PropertyType/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },

    },
    // /treatment-settings/propertyRatings
    {
      name: 'propertyRatings',
      path: '/treatment-settings/propertyRatings',
      component: () => import('@/views/dashboard/TreatmentSettings/PropertyRating/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'propertyRatingsForm',
      path: '/treatment-settings/propertyRatingsForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/PropertyRating/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/constructionConditions
    {
      name: 'constructionConditions',
      path: '/treatment-settings/constructionConditions',
      component: () => import('@/views/dashboard/TreatmentSettings/constructionConditions/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'constructionConditionsForm',
      path: '/treatment-settings/constructionConditionsForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/constructionConditions/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/EvaluationCurrencies
    {
      name: 'EvaluationCurrencies',
      path: '/treatment-settings/EvaluationCurrencies',
      component: () => import('@/views/dashboard/TreatmentSettings/EvaluationCurrencies/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'EvaluationCurrenciesForm',
      path: '/treatment-settings/EvaluationCurrenciesForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/EvaluationCurrencies/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/ReportTypes
    {
      name: 'ReportTypes',
      path: '/treatment-settings/ReportTypes',
      component: () => import('@/views/dashboard/TreatmentSettings/ReportTypes/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'ReportTypesForm',
      path: '/treatment-settings/ReportTypesForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/ReportTypes/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/ValueHypothesisLists
    {
      name: 'ValueHypothesisLists',
      path: '/treatment-settings/ValueHypothesisLists',
      component: () => import('@/views/dashboard/TreatmentSettings/ValueHypothesisLists/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'ValueHypothesisListsForm',
      path: '/treatment-settings/ValueHypothesisListsForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/ValueHypothesisLists/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/ValueBasiLists
    {
      name: 'ValueBasiLists',
      path: '/treatment-settings/ValueBasiLists',
      component: () => import('@/views/dashboard/TreatmentSettings/ValueBasiLists/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'ValueBasiListsForm',
      path: '/treatment-settings/ValueBasiListsForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/ValueBasiLists/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/WorkingStatuses
    {
      name: 'WorkingStatuses',
      path: '/treatment-settings/WorkingStatuses',
      component: () => import('@/views/dashboard/TreatmentSettings/WorkingStatuses/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'WorkingStatusesForm',
      path: '/treatment-settings/WorkingStatusesForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/WorkingStatuses/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/bishopTypeSetting
    {
      name: 'bishopTypeSetting',
      path: '/treatment-settings/bishopTypeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/bishopTypeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'bishopTypeSettingForm',
      path: '/treatment-settings/bishopTypeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/bishopTypeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/designSetting
    {
      name: 'designSetting',
      path: '/treatment-settings/designSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/designSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'designSettingForm',
      path: '/treatment-settings/designSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/designSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/eastFacadeSetting
    {
      name: 'eastFacadeSetting',
      path: '/treatment-settings/eastFacadeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/eastFacadeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'eastFacadeSettingForm',
      path: '/treatment-settings/eastFacadeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/eastFacadeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/northFacadeSetting
    {
      name: 'northFacadeSetting',
      path: '/treatment-settings/northFacadeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/northFacadeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'northFacadeSettingForm',
      path: '/treatment-settings/northFacadeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/northFacadeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/westFacadeSetting
    {
      name: 'westFacadeSetting',
      path: '/treatment-settings/westFacadeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/westFacadeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'westFacadeSettingForm',
      path: '/treatment-settings/westFacadeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/westFacadeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/southFacadeSetting
    {
      name: 'southFacadeSetting',
      path: '/treatment-settings/southFacadeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/southFacadeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },

    },
    {
      name: 'southFacadeSettingForm',
      path: '/treatment-settings/southFacadeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/southFacadeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/electricCurrentSetting
    {
      name: 'electricCurrentSetting',
      path: '/treatment-settings/electricCurrentSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/electricCurrentSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'electricCurrentSettingForm',
      path: '/treatment-settings/electricCurrentSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/electricCurrentSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/entranceFloorTypeSetting
    {
      name: 'entranceFloorTypeSetting',
      path: '/treatment-settings/entranceFloorTypeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/entranceFloorTypeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'entranceFloorTypeSettingForm',
      path: '/treatment-settings/entranceFloorTypeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/entranceFloorTypeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/generalLocation
    {
      name: 'generalLocation',
      path: '/treatment-settings/generalLocation',
      component: () => import('@/views/dashboard/TreatmentSettings/generalLocation/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'generalLocationForm',
      path: '/treatment-settings/generalLocationForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/generalLocation/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/indoorTypeSetting
    {
      name: 'indoorTypeSetting',
      path: '/treatment-settings/indoorTypeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/indoorTypeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'indoorTypeSettingForm',
      path: '/treatment-settings/indoorTypeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/indoorTypeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/insulationTypeSetting
    {
      name: 'insulationTypeSetting',
      path: '/treatment-settings/insulationTypeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/insulationTypeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'insulationTypeSettingForm',
      path: '/treatment-settings/insulationTypeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/insulationTypeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/neighborSetting
    {
      name: 'neighborSetting',
      path: '/treatment-settings/neighborSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/neighborSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'neighborSettingForm',
      path: '/treatment-settings/neighborSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/neighborSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/propertyLevelSetting
    {
      name: 'propertyLevelSetting',
      path: '/treatment-settings/propertyLevelSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/propertyLevelSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'propertyLevelSettingForm',
      path: '/treatment-settings/propertyLevelSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/propertyLevelSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/receptionFloorTypeSetting
    {
      name: 'receptionFloorTypeSetting',
      path: '/treatment-settings/receptionFloorTypeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/receptionFloorTypeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'receptionFloorTypeSettingForm',
      path: '/treatment-settings/receptionFloorTypeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/receptionFloorTypeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/receptionFloorTypeSetting
    {
      name: 'roomFloorTypeSetting',
      path: '/treatment-settings/roomFloorTypeSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/roomFloorTypeSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'roomFloorTypeSettingForm',
      path: '/treatment-settings/roomFloorTypeSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/roomFloorTypeSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/streetLightingSetting
    {
      name: 'streetLightingSetting',
      path: '/treatment-settings/streetLightingSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/streetLightingSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'streetLightingSettingForm',
      path: '/treatment-settings/streetLightingSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/streetLightingSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/streetLightingSetting
    {
      name: 'streetSetting',
      path: '/treatment-settings/streetSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/streetSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'streetSettingForm',
      path: '/treatment-settings/streetSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/streetSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // /treatment-settings/structureConstructionSetting
    {
      name: 'structureConstructionSetting',
      path: '/treatment-settings/structureConstructionSetting',
      component: () => import('@/views/dashboard/TreatmentSettings/structureConstructionSetting/List.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة' },
    },
    {
      name: 'structureConstructionSettingForm',
      path: '/treatment-settings/structureConstructionSettingForm/:id?',
      component: () => import('@/views/dashboard/TreatmentSettings/structureConstructionSetting/Form.vue'),
      meta: { requiresAuth: true, permissions: 'تخصيص المعاملة', actions: true },
    },
    // Reports - users Reports
    {
      name: 'Users Report',
      path: '/reports/users-report',
      meta: { requiresAuth: true, permissions: 'تقرير المستخدمين' },
      component: () => import('@/views/dashboard/Reports/users-report/List.vue'),
    },
    {
      name: 'Users Report By ID',
      path: '/reports/userReportById/:id?',
      meta: { requiresAuth: true, permissions: 'تقرير المستخدمين' },
      component: () => import('@/views/dashboard/Reports/users-report/oneItem.vue'),
    },
    {
      name: 'ExpensesReports',
      path: '/reports/expenses-report',
      meta: { requiresAuth: true, permissions: 'تقرير المصروفات' },
      component: () => import('@/views/dashboard/Reports/expenses-reports/List.vue'),
    },
    {
      name: 'revenuesReport',
      path: '/reports/revenues-report',
      meta: { requiresAuth: true, permissions: 'تقرير الإيرادات' },
      component: () => import('@/views/dashboard/Reports/revenues-report/List.vue'),
    },
    {
      name: 'ListOfCustomers',
      path: '/reports/revenues-report/:id',
      meta: { requiresAuth: true, permissions: 'تقرير الإيرادات' },
      component: () => import('@/views/dashboard/Reports/revenues-report/ListOfCustomers.vue'),
    },
    {
      name: 'profitsReports',
      path: '/reports/profits-reports',
      meta: { requiresAuth: true, permissions: 'تقرير الارباح' },
      component: () => import('@/views/dashboard/Reports/profits-reports/List.vue'),
    },
    {
      name: 'GoogleMap',
      path: '/integrations/google-maps',
      meta: { requiresAuth: true },
      component: () => import('@/views/dashboard/integrations/GoogleMap.vue'),
    },
    { path: '*', redirect: '/login' },
  ]

companyRouters = companyRouters.map(route => ({ ...route, path: window.domain + route.path }))
console.log('window.domain', window.domain)
export default companyRouters