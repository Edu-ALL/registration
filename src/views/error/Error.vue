<template>
  <div class="container">
    <div class="row align-items-center" style="height: 100dvh">
      <div class="col-md-6 offset-md-3 text-center" v-if="slug == '404'">
        <h1 class="display-1">404</h1>
        <h2 class="display-4">Page Not Found</h2>
        <p class="lead">Sorry, the page you're looking for could not be found.</p>
      </div>
      <div class="col-md-6 offset-md-3 text-center" v-if="slug == 'not-started'">
        <h1 class="display-1">Oops,</h1>
        <h2 class="display-4">Event Yet to Begin</h2>
        <p class="lead">
          Be ready for the excitement! The event is yet to kick off. Hang tight, and get prepared to
          immerse yourself in an unforgettable experience.
        </p>
      </div>
      <div class="col-md-6 offset-md-3 text-center" v-if="slug == 'access-denied'">
        <h1 class="display-1">Oops,</h1>
        <h2 class="display-4">Access Denied</h2>
        <p class="lead">
          Regrettably, access to this area is restricted. Please ensure you have the necessary
          permissions or credentials. Contact the administrator for assistance or explore
          alternative areas available to you.
        </p>
      </div>
      <div class="col-md-6 offset-md-3 text-center" v-if="slug == 'not-register'">
        <h1 class="display-1">Oops,</h1>
        <h2 class="display-4">Unauthorized Access</h2>
        <p class="lead">
          This section is accessible only to registered participants. To gain entry and explore the
          event's offerings, kindly complete the registration process. Don't miss the chance to be
          part of this exciting event—register now!
        </p>
      </div>
      <div class="col-md-6 offset-md-3 text-center" v-if="slug == 'not-vip'">
        <h1 class="display-1">Oops,</h1>
        <h2 class="display-4">Exclusive Access for VIP Members</h2>
        <p class="lead">
          Sorry, this area is reserved for VIP members only. Upgrade to VIP status to unlock
          exclusive benefits and access premium content. Don't miss out on the VIP
          experience—upgrade now!
        </p>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error-404',
  props: {
    slug: String
  }
})
</script>
    
    <!-- You don't need to add specific CSS for Bootstrap since you already included it in your Vue project -->
    