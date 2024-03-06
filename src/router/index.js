import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:member?',
      name: 'home',
      props: (route) => ({
        member: route.params.member
      }),
      component: HomeView
    },
    {
      path: '/form/event',
      name: 'event',
      props: (route) => ({
        // Menggunakan props untuk mendapatkan parameter
        formType: route.query.ft,
        eventId: route.query.ev,
        eventType: route.query.et,
        attendStatus: route.query.as,
        status: route.query.s,
        type: route.query.t,
        assessment: route.query.a
      }),
      component: () => import('@/views/event/Form.vue')
    },
    {
      path: '/scan/event/vip',
      name: 'scan-event-vip',
      props: (route) => ({
        url: route.query.url
      }),
      component: () => import('@/views/event/ScanVIP.vue')
    },
    {
      path: '/scan/event/:id?',
      name: 'scan-event',
      props: (route) => ({
        eventId: route.params.id
      }),
      component: () => import('@/views/event/Scan.vue')
    },
    {
      path: '/thanks/event/:status/:type',
      name: 'thanks-event',
      props: (route) => ({
        status: route.params.status, // pra-reg or ots
        type: route.params.type // onsite or self
      }),
      component: () => import('@/views/event/Thanks.vue')
    },
    {
      path: '/thanks/event/vip',
      name: 'thanks-event-vip',
      component: () => import('@/views/event/ThanksVIP.vue')
    },
    {
      path: '/form/program',
      name: 'program',
      props: (route) => ({
        // Menggunakan props untuk mendapatkan parameter
        formType: route.query.form_type,
        programId: route.query.program_id
      })
    },

    {
      path: '/error/:slug',
      name: 'Error',
      props: (route) => ({
        slug: route.params.slug
      }),
      component: () => import('@/views/error/Error.vue')
    },
    // Catch-all route for 404 errors
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/error/404.vue')
    }
  ]
})

export default router
