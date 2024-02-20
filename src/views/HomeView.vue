<template>
  <div class="row" style="height: 100dvh">
    <div class="col-md-8 bg-primary">
      <div class="d-flex align-items-center w-100 h-100 px-5">
        <h2>Event Name</h2>
      </div>
    </div>
    <div class="col-md-4">
      <div class="d-flex align-items-center w-100 h-100 px-5">
        <div class="row g-4">
          <div class="col-12">
            <div class="card shadow rounded-0 border-0 cursor-pointer" @click="redirect('onsite')">
              <div class="card-body text-center">
                <img
                  src="../../public/img/onsite.avif"
                  alt="Onsite Registration"
                  class="logo-menu"
                />
                <h3>Onsite Registration</h3>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card shadow rounded-0 border-0 cursor-pointer" @click="redirect('scan')">
              <div class="card-body text-center">
                <img src="../../public/img/scan.jpg" alt="Scan QR" class="logo-menu" />
                <h3>Scan QR</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'home-registration',
  setup() {
    const redirect = (type) => {
      if (type == 'onsite') {
        router.push({
          name: 'event',
          query: {
            form_type: 'cta',
            event_id: 'EVT-0001',
            event_type: 'offline',
            attend_status: 'attend',
            status: 'ots'
          }
        })
      } else {
        router.push({
          name: 'scan-event'
        })
      }
    }

    return {
      redirect
    }
  }
})
</script>