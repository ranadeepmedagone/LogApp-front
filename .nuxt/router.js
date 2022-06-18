import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _30d8af53 = () => interopDefault(import('..\\pages\\AllUsers.vue' /* webpackChunkName: "pages/AllUsers" */))
const _8c7f17be = () => interopDefault(import('..\\pages\\CreateUserLog.vue' /* webpackChunkName: "pages/CreateUserLog" */))
const _09718532 = () => interopDefault(import('..\\pages\\Loghome.vue' /* webpackChunkName: "pages/Loghome" */))
const _c9f1166e = () => interopDefault(import('..\\pages\\SuperUserLoghome.vue' /* webpackChunkName: "pages/SuperUserLoghome" */))
const _073ec720 = () => interopDefault(import('..\\pages\\UpdateUser.vue' /* webpackChunkName: "pages/UpdateUser" */))
const _38939bb6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _a6bdd8c4 = () => interopDefault(import('..\\pages\\_id.vue' /* webpackChunkName: "pages/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/AllUsers",
    component: _30d8af53,
    name: "AllUsers"
  }, {
    path: "/CreateUserLog",
    component: _8c7f17be,
    name: "CreateUserLog"
  }, {
    path: "/Loghome",
    component: _09718532,
    name: "Loghome"
  }, {
    path: "/SuperUserLoghome",
    component: _c9f1166e,
    name: "SuperUserLoghome"
  }, {
    path: "/UpdateUser",
    component: _073ec720,
    name: "UpdateUser"
  }, {
    path: "/",
    component: _38939bb6,
    name: "index"
  }, {
    path: "/:id",
    component: _a6bdd8c4,
    name: "id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
