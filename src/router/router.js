import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'

Vue.use(Router)

// function isIModuleHasPermissions (userPermissions, role) {
//     for (var key in userPermissions) {
//         if (userPermissions[key] === role) {
//             return true
//         }
//     }
//     return false
// }

// function routerGuard (to, from, next) {
//   const userData = localStorage.getItem('userDataPermission')
//   const permations = userData.split(',')
//   // console.log('permations', permations)
//   if (permations) {
//       if (permations.length < 1) {
//           return next('/login')
//       }
//       if (to.meta.role) {
//           if (isIModuleHasPermissions(permations, to.meta.role)) {
//               return next()
//           }
//           return next('/notAuthorized')
//       } else {
//           return next()
//       }
//   }
//   return next()
// }

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Login
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/pages/login'),
    },
    {
      name: 'Inter Phone Number',
      path: '/ResetPassword',
      component: () => import('@/pages/ResetPassword/EnterPhone'),
    },
    {
      name: 'Inter Code',
      path: '/enterCode',
      component: () => import('@/pages/ResetPassword/RessetCode'),
    },
    {
      name: 'Enter New Password',
      path: '/enterPass',
      component: () => import('@/pages/ResetPassword/NewPassword'),
    },
    {
      path: '/',
      // beforeEnter: routerGuard,
      meta: { requiresAuth: true },
      redirect: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Home
        {
          name: 'statistics',
          path: '/',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: { requiresAuth: true },
        },
        // Users
        {
          name: 'Users',
          path: '/Users',
          component: () => import('@/views/dashboard/users/Users.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'user Form',
          path: '/userForm/:id?',
          component: () => import('@/views/dashboard/users/Form.vue'),
          meta: { requiresAuth: true },
        },
        // Start Finance
        // Start Treatments
        {
          name: 'Treatments',
          path: '/Treatments',
          component: () => import('@/views/dashboard/Treatment/Treatments'),
          meta: { requiresAuth: true },
        },
        {
          name: 'NewTreatment',
          path: '/New-Treatment/:id',
          component: () => import('@/views/dashboard/Treatment/NewTreatment'),
          meta: { requiresAuth: true },
        },
        {
          name: 'EvaluateTreatment',
          path: '/Evaluate-Treatment',
          component: () => import('@/views/dashboard/Treatment/EvaluateTreatment'),
          meta: { requiresAuth: true },
        },
        {
          name: 'EvaluateTreatment',
          path: '/Evaluate-Treatment/:id',
          component: () => import('@/views/dashboard/Treatment/EvaluateTreatment'),
          meta: { requiresAuth: true },
        },
        {
          name: 'AccountantTreatment',
          path: '/Accountant-Treatment',
          component: () => import('@/views/dashboard/Treatment/AccountantTreatment'),
          meta: { requiresAuth: true },
        },
        // Start Customers
        {
          name: 'Customers',
          path: '/customers',
          component: () => import('@/views/dashboard/Finance/customers/Customers.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'Customers Form',
          path: '/customerForm/:id?',
          component: () => import('@/views/dashboard/Finance/customers/form.vue'),
          meta: { requiresAuth: true },
        },
        // Start Offers
        {
          name: 'PriceOffers',
          path: '/price-offers',
          component: () => import('@/views/dashboard/Finance/Offers/PriceOffers.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'offers Form',
          path: '/offersForm/:id?',
          component: () => import('@/views/dashboard/Finance/Offers/Form.vue'),
          meta: { requiresAuth: true },
        },
        // SETTING
        {
          name: 'facilityFile',
          path: '/facility-file',
          component: () => import('@/views/dashboard/setting/Facility.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'Bills',
          path: '/bills',
          component: () => import('@/views/dashboard/Finance/Billing/Bills.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'Bills Form',
          path: '/billsForm/:id?',
          component: () => import('@/views/dashboard/Finance/Billing/Form.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'Expenses',
          path: '/expenses',
          component: () => import('@/views/dashboard/Finance/expenses/Expenses.vue'),
          meta: { requiresAuth: true },
        },
        // Users Setting
        {
          name: 'Users Setting',
          path: '/users-setting',
          component: () => import('@/views/dashboard/setting/userSetting/UserSetting.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'user Setting Form',
          path: '/userSettingForm/:id?',
          component: () => import('@/views/dashboard/setting/userSetting/Form.vue'),
          meta: { requiresAuth: true },
        },
        // treatment settings
        {
          name: 'treatmentSettings',
          path: '/treatment-settings',
          meta: { requiresAuth: true },
          redirect: '/treatment-settings/regions',
          component: () => import('@/views/dashboard/TreatmentSettings/Region/List.vue'),
        },
        // treatment settings - regions
        {
          name: 'regions',
          path: '/treatment-settings/regions',
          meta: { requiresAuth: true },
          component: () => import('@/views/dashboard/TreatmentSettings/Region/List.vue'),
        },
        {
          name: 'regionsForm',
          path: '/treatment-settings/regionsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/Region/Form.vue'),
          meta: { requiresAuth: true },
        },
        // treatment settings - cities
        {
          name: 'cities',
          path: '/treatment-settings/cities',
          meta: { requiresAuth: true },
          component: () => import('@/views/dashboard/TreatmentSettings/City/List.vue'),
        },
        {
          name: 'citiesForm',
          path: '/treatment-settings/citiesForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/City/Form.vue'),
          meta: { requiresAuth: true },
        },
        // treatment settings - Sample
        {
          name: 'sample',
          path: '/treatment-settings/sample',
          meta: { requiresAuth: true },
          component: () => import('@/views/dashboard/TreatmentSettings/Sample/List.vue'),
        },
        // treatment settings - Neighborhoods
        {
          name: 'neighborhoods',
          path: '/treatment-settings/neighborhoods',
          meta: { requiresAuth: true },
          component: () => import('@/views/dashboard/TreatmentSettings/Neighborhood/List.vue'),
        },
        {
          name: 'neighborhoodsForm',
          path: '/treatment-settings/neighborhoodsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/Neighborhood/Form.vue'),
          meta: { requiresAuth: true },
        },

        // /treatment-settings/propertyTypes
        {
          name: 'propertyTypes',
          path: '/treatment-settings/propertyTypes',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyType/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'propertyTypesForm',
          path: '/treatment-settings/propertyTypesForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyType/Form.vue'),
          meta: { requiresAuth: true },

        },
        // /treatment-settings/propertyRatings
        {
          name: 'propertyRatings',
          path: '/treatment-settings/propertyRatings',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyRating/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'propertyRatingsForm',
          path: '/treatment-settings/propertyRatingsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyRating/Form.vue'),
          meta: { requiresAuth: true },
        },
        // /treatment-settings/constructionConditions
        {
          name: 'constructionConditions',
          path: '/treatment-settings/constructionConditions',
          component: () => import('@/views/dashboard/TreatmentSettings/constructionConditions/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'constructionConditionsForm',
          path: '/treatment-settings/constructionConditionsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/constructionConditions/Form.vue'),
          meta: { requiresAuth: true },
        },
        // /treatment-settings/EvaluationCurrencies
        {
          name: 'EvaluationCurrencies',
          path: '/treatment-settings/EvaluationCurrencies',
          component: () => import('@/views/dashboard/TreatmentSettings/EvaluationCurrencies/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'EvaluationCurrenciesForm',
          path: '/treatment-settings/EvaluationCurrenciesForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/EvaluationCurrencies/Form.vue'),
          meta: { requiresAuth: true },
        },
        // /treatment-settings/ReportTypes
        {
          name: 'ReportTypes',
          path: '/treatment-settings/ReportTypes',
          component: () => import('@/views/dashboard/TreatmentSettings/ReportTypes/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'ReportTypesForm',
          path: '/treatment-settings/ReportTypesForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/ReportTypes/Form.vue'),
          meta: { requiresAuth: true },
        },
        // /treatment-settings/ValueHypothesisLists
        {
          name: 'ValueHypothesisLists',
          path: '/treatment-settings/ValueHypothesisLists',
          component: () => import('@/views/dashboard/TreatmentSettings/ValueHypothesisLists/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'ValueHypothesisListsForm',
          path: '/treatment-settings/ValueHypothesisListsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/ValueHypothesisLists/Form.vue'),
          meta: { requiresAuth: true },
        },
        // /treatment-settings/ValueBasiLists
        {
          name: 'ValueBasiLists',
          path: '/treatment-settings/ValueBasiLists',
          component: () => import('@/views/dashboard/TreatmentSettings/ValueBasiLists/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'ValueBasiListsForm',
          path: '/treatment-settings/ValueBasiListsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/ValueBasiLists/Form.vue'),
          meta: { requiresAuth: true },
        },
        // /treatment-settings/WorkingStatuses
        {
          name: 'WorkingStatuses',
          path: '/treatment-settings/WorkingStatuses',
          component: () => import('@/views/dashboard/TreatmentSettings/WorkingStatuses/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          name: 'WorkingStatusesForm',
          path: '/treatment-settings/WorkingStatusesForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/WorkingStatuses/Form.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/notAuthorized',
          name: 'notAuthorized',
          component: () => import('../pages/NotAuthorized.vue'),
        },
        { path: '*', redirect: '/login' },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (!token) {
      next({
        name: 'Login',
      })
    } else {
      return next()
    }
  } else {
    next()
  }
})

export default router
