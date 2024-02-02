import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/form/event',
      name: 'event',
      props: (route) => ({ // Menggunakan props untuk mendapatkan parameter
        formType: route.query.form_type,
        eventId: route.query.event_id,
        eventType: route.query.event_type,
        attendStatus: route.query.attend_status,
        status: route.query.status,
      }),
      component: () => import('@/views/event/Form.vue')
    },
    {
      path: '/scan/event',
      name: 'scan-event',
      // props: (route) => ({ // Menggunakan props untuk mendapatkan parameter
      //   formType: route.query.form_type,
      //   eventId: route.query.event_id,
      //   eventType: route.query.event_type,
      //   attendStatus: route.query.attend_status,
      //   status: route.query.status,
      // }),
      component: () => import('@/views/event/Scan.vue')
    },
    {
      path: '/form/program',
      name: 'program',
      props: (route) => ({ // Menggunakan props untuk mendapatkan parameter
        formType: route.query.form_type,
        programId: route.query.program_id,
      }),
      component: () => import('@/views/program/Form.vue')
    }
  ]
})

export default router
