<template>
  <div class="row" style="height: 100dvh" v-if="scan">
    <div class="col-md-8 bg-primary">
      <div class="d-flex align-items-center w-100 h-100 px-5">
        <h2>Event Name</h2>
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-fixed" style="top: 2%;left: 90%;">
        <router-link :to="{ name: 'home' }">
          <div class="btn btn-sm btn-outline-primary mb-2">
            <font-awesome-icon icon="fa-home" class="me-2"></font-awesome-icon> Back to Home
          </div>
        </router-link>
      </div>
      <div class="d-flex align-items-center w-100 h-100 px-5">
        <div class="d-flex align-items-center w-100 h-100">
          <div class="w-100 text-center">
            <h3>
              <strong>
                SCAN YOUR <br />
                QR-CODE HERE
              </strong>
            </h3>
            <div class="card shadow-sm rounded-0 border-0 mb-3">
              <div class="card-body">
                <div class="p-2">
                  <qr-stream @decode="onDecode" style="width: 100%" class="rounded"> </qr-stream>
                </div>
              </div>
            </div>
            <h4>OR</h4>
            <h5>WITH PHONE NUMBER</h5>
            <div class="card shadow-sm rounded-0 border-0">
              <div class="card-body">
                <input type="text" class="form-control" @change="checkPhone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center" style="height: 100dvh" v-else>
    <div class="col-md-6">
      <div class="d-flex align-items-center w-100 h-100">
        <div class="card shadow border-0 rounded-0 w-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="m-0">Confirmation</h4>
            <div class="btn btn-sm btn-outline-primary py-1 px-2" @click="scan = true">
              <font-awesome-icon icon="fa-arrow-left"></font-awesome-icon> Back to Scan
            </div>
          </div>
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'event-scan',
  setup() {
    const scan = ref(true)

    const onDecode = (value) => {
      console.log(value)
      scan.value = false
    }

    const checkPhone = () => {
      scan.value = false
    }

    return {
      scan,
      onDecode,
      checkPhone
    }
  }
})
</script>