<template>
  <div class="container">
    <div class="row align-items-center" style="height:100dvh">
      <div class="col-md-6 offset-md-3 text-center">
        <h1 class="display-1">404</h1>
        <h2 class="display-4">Page Not Found</h2>
        <p class="lead">Sorry, the page you're looking for could not be found.</p>
        <router-link to="/" class="btn btn-primary">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error-404',
})
</script>
  
  <!-- You don't need to add specific CSS for Bootstrap since you already included it in your Vue project -->
  