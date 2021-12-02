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
          // meta: { role: 'Users.GetAll' },
          // beforeEnter: routerGuard,
          meta: { requiresAuth: true },
        },
        {
          name: 'user Form',
          path: '/userForm/:id?',
          component: () => import('@/views/dashboard/users/Form.vue'),
          // meta: { role: 'Users.GetById' },
          // beforeEnter: routerGuard,
          meta: { requiresAuth: true },
        },
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
          name: 'AccountantTreatment',
          path: '/Accountant-Treatment',
          component: () => import('@/views/dashboard/Treatment/AccountantTreatment'),
          meta: { requiresAuth: true },
        },
        {
          name: 'Customers',
          path: '/customers',
          component: () => import('@/views/dashboard/Finance/Customers'),
          meta: { requiresAuth: true },
        },
        {
          name: 'PriceOffers',
          path: '/price-offers',
          component: () => import('@/views/dashboard/Finance/PriceOffers'),
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
          component: () => import('@/views/dashboard/Finance/Bills'),
          meta: { requiresAuth: true },
        },
        {
          name: 'Expenses',
          path: '/expenses',
          component: () => import('@/views/dashboard/Finance/Expenses'),
          meta: { requiresAuth: true },
        },
        // Users Setting
        {
          name: 'Users Setting',
          path: '/users-setting',
          component: () => import('@/views/dashboard/setting/userSetting/UserSetting.vue'),
          // meta: { role: 'Users.GetAll' },
          // beforeEnter: routerGuard,
          meta: { requiresAuth: true },
        },
        {
          name: 'user Setting Form',
          path: '/userSettingForm/:id?',
          component: () => import('@/views/dashboard/setting/userSetting/Form.vue'),
          // meta: { role: 'Users.GetById' },
          // beforeEnter: routerGuard,
          meta: { requiresAuth: true },
        },
        {
          path: '/notAuthorized',
          name: 'notAuthorized',
          component: () => import('../pages/NotAuthorized.vue'),
        },
        // treatment settings
        {
          path: '/treatment-settings',
          meta: { requiresAuth: true },
          redirect: '/treatment-settings/regions',
          component: () => import('@/views/dashboard/TreatmentSettings/Region/List.vue'),
        },
        // treatment settings - regions
        {
          path: '/treatment-settings/regions',
          meta: { requiresAuth: true },
          component: () => import('@/views/dashboard/TreatmentSettings/Region/List.vue'),
        },
        {
          path: '/treatment-settings/regionsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/Region/Form.vue'),
          meta: { requiresAuth: true },
        },
        // treatment settings - cities
        {
          path: '/treatment-settings/cities',
          meta: { requiresAuth: true },
          component: () => import('@/views/dashboard/TreatmentSettings/City/List.vue'),
        },
        {
          path: '/treatment-settings/citiesForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/City/Form.vue'),
          meta: { requiresAuth: true },
        },
        // treatment settings - Neighborhoods
        {
          path: '/treatment-settings/neighborhoods',
          meta: { requiresAuth: true },
          component: () => import('@/views/dashboard/TreatmentSettings/Neighborhood/List.vue'),
        },
        {
          path: '/treatment-settings/neighborhoodsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/Neighborhood/Form.vue'),
          meta: { requiresAuth: true },
        },

        // /treatment-settings/propertyTypes
        {
          path: '/treatment-settings/propertyTypes',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyType/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          path: '/treatment-settings/propertyTypesForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyType/Form.vue'),
          meta: { requiresAuth: true },

        },
        // /treatment-settings/propertyRatings
        {
          path: '/treatment-settings/propertyRatings',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyRating/List.vue'),
          meta: { requiresAuth: true },

        },
        {
          path: '/treatment-settings/propertyRatingsForm/:id?',
          component: () => import('@/views/dashboard/TreatmentSettings/PropertyRating/Form.vue'),
          meta: { requiresAuth: true },

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
