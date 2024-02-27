<template>
  <div class="container-fluid">
    <div class="row" style="height: 100dvh">
      <div
        class="col-md-9 bg-primary"
        style="
          background: url('/img/bg-eduall.webp');
          background-size: cover;
          background-position: center;
        "
      ></div>
      <div class="col-md-3">
        <div class="d-flex align-items-center w-100 h-100 px-5">
          <div class="row g-4">
            <div class="col-12">
              <div class="card shadow rounded border-0 cursor-pointer" @click="redirect('onsite')">
                <div class="card-body text-center">
                  <img src="/img/onsite.avif" alt="Onsite Registration" class="logo-menu" />
                  <h3>
                    Onsite <br />
                    Registration
                  </h3>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card shadow rounded-0 border-0 cursor-pointer" @click="redirect('scan')">
                <div class="card-body text-center">
                  <img src="/img/scan.jpg" alt="Scan QR" class="logo-menu" />
                  <h3>Scan <br />QR Code</h3>
                </div>
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
            ft: 'cta', // cta or null
            ev: import.meta.env.VITE_EVENT_ID, // event id
            et: 'offline', // offline or null
            as: 'attend', // attent or null
            s: 'ots', // ots or null
            t: 'onsite' // onsite or self-regist
          }
        })
      } else {
        router.push({
          name: 'scan-event',
          params: {
            id: import.meta.env.VITE_EVENT_ID
          }
        })
      }
    }

    return {
      redirect
    }
  }
})
</script>