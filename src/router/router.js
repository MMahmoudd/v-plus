
import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'

Vue.use(Router)

function isIModuleHasPermissions (userPermissions, role) {
    for (var key in userPermissions) {
        if (userPermissions[key] === role) {
            return true
        }
    }
    return false
}

function routerGuard (to, from, next) {
  const userData = localStorage.getItem('userDataPermission')
  const permations = userData.split(',')
  console.log('permations', permations)
  if (permations) {
      if (permations.length < 1) {
          return next('/login')
      }
      if (to.meta.role) {
          if (isIModuleHasPermissions(permations, to.meta.role)) {
              return next()
          }
          return next('/notAuthorized')
      } else {
          return next()
      }
  }
  return next()
}

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
          meta: { role: 'Company.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Companies Form',
          path: '/CompaniesForm/:id?',
          component: () => import('@/views/dashboard/companies/Form.vue'),
          meta: { role: 'Company.GetById' },
          beforeEnter: routerGuard,
        },
        // Companies Branches
        {
          name: 'Companies Branches',
          path: '/Companies-branches',
          component: () => import('@/views/dashboard/companies-branches/CompainesBranches.vue'),
          meta: { role: 'CompanyBranch.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Branch Form',
          path: '/branchForm/:id?',
          component: () => import('@/views/dashboard/companies-branches/Form.vue'),
          meta: { role: 'CompanyBranch.GetById' },
          beforeEnter: routerGuard,
        },
        // Companies Groups
        {
          name: 'Companies Groups',
          path: '/Companies-groups',
          component: () => import('@/views/dashboard/companies-group/CompainesGroup.vue'),
          meta: { role: 'CompanyGroup.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Groups Form',
          path: '/groupForm/:id?',
          component: () => import('@/views/dashboard/companies-group/Form.vue'),
          meta: { role: 'CompanyGroup.GetById' },
          beforeEnter: routerGuard,
        },
        // Companies Area
        {
          name: 'Companies Area',
          path: '/Companies-area',
          component: () => import('@/views/dashboard/companies-area/CompainesArea.vue'),
          meta: { role: 'CompanyArea.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Area Form',
          path: '/areaForm/:id?',
          component: () => import('@/views/dashboard/companies-area/Form.vue'),
          meta: { role: 'CompanyArea.GetById' },
          beforeEnter: routerGuard,
        },
        // Companies Floor
        {
          name: 'Companies Floor',
          path: '/Companies-floor',
          component: () => import('@/views/dashboard/companies-floor/CompainesFloor.vue'),
          meta: { role: 'CompanyFloor.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'floor Form',
          path: '/floorForm/:id?',
          component: () => import('@/views/dashboard/companies-floor/Form.vue'),
          meta: { role: 'CompanyFloor.GetById' },
          beforeEnter: routerGuard,
        },
        // Companies Room
        {
          name: 'Companies Room',
          path: '/Companies-room',
          component: () => import('@/views/dashboard/companies-room/CompainesRoom.vue'),
          meta: { role: 'CompanyRoom.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Room Form',
          path: '/roomForm/:id?',
          component: () => import('@/views/dashboard/companies-room/Form.vue'),
          meta: { role: 'CompanyRoom.GetById' },
          beforeEnter: routerGuard,
        },
        // Assets
        {
          name: 'Assets',
          path: '/Assets',
          component: () => import('@/views/dashboard/assets-c/Assets.vue'),
          meta: { role: 'Asset.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Assets Form',
          path: '/assetsForm/:id?',
          component: () => import('@/views/dashboard/assets-c/Form.vue'),
          meta: { role: 'Asset.GetById' },
          beforeEnter: routerGuard,
        },
        // Assets Type
        {
          name: 'Assets Type',
          path: '/Assets-type',
          component: () => import('@/views/dashboard/assets-type/AssetsType.vue'),
          meta: { role: 'AssetType.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Assets Type Form',
          path: '/assetsTypeForm/:id?',
          component: () => import('@/views/dashboard/assets-type/Form.vue'),
          meta: { role: 'AssetType.GetById' },
          beforeEnter: routerGuard,
        },
        // Assets Brand
        {
          name: 'Assets Brand',
          path: '/Assets-brand',
          component: () => import('@/views/dashboard/assets-brand/AssetsBrand.vue'),
          meta: { role: 'AssetBrand.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Assets Brand Form',
          path: '/assetsBrandForm/:id?',
          component: () => import('@/views/dashboard/assets-brand/Form.vue'),
          meta: { role: 'AssetBrand.GetById' },
          beforeEnter: routerGuard,
        },
        // Assets Category
        {
          name: 'Assets Category',
          path: '/Assets-category',
          component: () => import('@/views/dashboard/assets-category/AssetsCategory.vue'),
          meta: { role: 'AssetCategory.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Assets Category Form',
          path: '/assetsCategoryForm/:id?',
          component: () => import('@/views/dashboard/assets-category/Form.vue'),
          meta: { role: 'AssetCtegory.GetById' },
          beforeEnter: routerGuard,
        },
        // Assets Model
        {
          name: 'Assets Model',
          path: '/Assets-model',
          component: () => import('@/views/dashboard/assets-model/AssetsModel.vue'),
          meta: { role: 'AssetModel.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'Assets Model Form',
          path: '/assetsModelForm/:id?',
          component: () => import('@/views/dashboard/assets-model/Form.vue'),
          meta: { role: 'AssetModel.GetById' },
          beforeEnter: routerGuard,
        },
        // Users
        {
          name: 'Users',
          path: '/Users',
          component: () => import('@/views/dashboard/users/Users.vue'),
          // meta: { role: 'Users.GetAll' },
          beforeEnter: routerGuard,
        },
        {
          name: 'user Form',
          path: '/userForm/:id?',
          component: () => import('@/views/dashboard/users/Form.vue'),
          // meta: { role: 'Users.GetById' },
          beforeEnter: routerGuard,
        },
        // Roles
        {
          name: 'Roles',
          path: '/Roles',
          component: () => import('@/views/dashboard/role/Role.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        {
          name: 'Role Form',
          path: '/roleForm/:id?',
          component: () => import('@/views/dashboard/role/Form.vue'),
          meta: { requiresAuth: true },
          beforeEnter: routerGuard,
        },
        // Permissions
        // {
        //   name: 'Permissions',
        //   path: '/Permissions',
        //   component: () => import('@/views/dashboard/permissions/Permissions.vue'),
        //   meta: { requiresAuth: true },
        //   beforeEnter: routerGuard,
        // },
        // {
        //   name: 'Permissions Form',
        //   path: '/PermissionForm/:id?',
        //   component: () => import('@/views/dashboard/permissions/Form.vue'),
        //   meta: { requiresAuth: true },
        //   beforeEnter: routerGuard,
        // },
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
