<template>
  <div id="thanks">
    <div class="container">
      <!-- Offline Event  -->
      <div class="row align-items-center justify-content-center" style="height: 100dvh">
        <div class="text-center col-md-4">
          <div class="card border-0 shadow">
            <div class="card-body bg-primary text-white">
              <img src="/img/check.png" alt="completed" width="10%" class="mb-4" />
              <h2 class="mb-2">
                Thank You
              </h2>
              <h4 class="mb-3">You have successfully registered.</h4>
              <div class="bg-dark rounded p-3">
                <h5>Don't forget to bring your invitation for re-registration on the D Day.</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'thank-event-vip'
})
</script>