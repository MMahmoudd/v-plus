
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

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.meta.requiresAuth) {
//     if (!token) {
//       next({
//         name: 'Login',
//       })
//     } else {
//       return next()
//     }
//   } else {
//     next()
//   }
// })

export default router
