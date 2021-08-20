
import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'

Vue.use(Router)

// function isIModuleHasPermissions(userPermissions, role) {
//     for (var key in userPermissions) {
//         if (userPermissions[key] === role) {
//             return true;
//         }
//     }
//     return false;
// }

function routerGuard (to, from, next) {
  // const userData = JSON.parse(localStorage.getItem('userData'))
  // if (userData) {
  //     if (userData.status === 0) {
  //         return next("/login");
  //     }
  //     if (to.meta.role) {
  //         if (isIModuleHasPermissions(userData.permissions, to.meta.role)) {
  //             return next();
  //         }
  //         return next("/notAuthorized");
  //     } else {
  //         return next();
  //     }
  // }
  return next()
}

const router = new Router({
  mode: 'hash',
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
      beforeEnter: routerGuard,
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
        // Companies
        {
          name: 'Companies',
          path: '/Companies',
          component: () => import('@/views/dashboard/companies/Compaines.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        {
          name: 'Companies Form',
          path: '/CompaniesForm/:id?',
          component: () => import('@/views/dashboard/companies/Form.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        // Companies Branches
        {
          name: 'Companies Branches',
          path: '/Companies-branches',
          component: () => import('@/views/dashboard/companies-branches/CompainesBranches.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        {
          name: 'Branch Form',
          path: '/branchForm/:id?',
          component: () => import('@/views/dashboard/companies-branches/Form.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        // Companies Groups
        {
          name: 'Companies Groups',
          path: '/Companies-groups',
          component: () => import('@/views/dashboard/companies-group/CompainesGroup.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        {
          name: 'Groups Form',
          path: '/groupForm/:id?',
          component: () => import('@/views/dashboard/companies-group/Form.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        // Companies Area
        {
          name: 'Companies Area',
          path: '/Companies-area',
          component: () => import('@/views/dashboard/companies-area/CompainesArea.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        {
          name: 'Area Form',
          path: '/areaForm/:id?',
          component: () => import('@/views/dashboard/companies-area/Form.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        // Companies Floor
        {
          name: 'Companies Floor',
          path: '/Companies-floor',
          component: () => import('@/views/dashboard/companies-floor/CompainesFloor.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        {
          name: 'floor Form',
          path: '/floorForm/:id?',
          component: () => import('@/views/dashboard/companies-floor/Form.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        // Companies Room
        {
          name: 'Companies Room',
          path: '/Companies-room',
          component: () => import('@/views/dashboard/companies-room/CompainesRoom.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        {
          name: 'Room Form',
          path: '/roomForm/:id?',
          component: () => import('@/views/dashboard/companies-room/Form.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
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
