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
              <div
                class="card shadow-lg rounded border-0 cursor-pointer card-regist"
                @click="redirect('onsite')"
              >
                <div class="card-body text-center p-0">
                  <img src="/img/onsite-reg.jpg" alt="Onsite Registration" class="w-100" />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div
                class="card shadow-lg rounded border-0 cursor-pointer card-regist"
                @click="redirect('scan')"
              >
                <div class="card-body text-center p-0">
                  <img src="/img/scan-qr.jpg" alt="Scan QR" class="w-100" />
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
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'home-registration',
  props: {
    member: String
  },
  setup(props) {
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

    onMounted(() => {
      if (props.member != 'admin') {
        router.push({
          name: 'Error',
          params: {
            slug: 'access-denied'
          }
        })
      }
    })

    return {
      redirect
    }
  }
})
</script>