<template>
  <div id="registration">
    <div class="container-fluid" style="height: 100dvh">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-md-4">
          <div class="d-flex justify-content-center">
            <img src="/img/eduall-logo.webp" alt="EduALL" width="50%" class="mb-4" />
          </div>
          <div class="card bg-primary text-white">
            <div class="card-body text-center">
              <h3 class="mb-3">
                <strong>
                  Let's Join <br />
                  EduALL Launchpad Now!
                </strong>
              </h3>
              <h6>Register by clicking the button below.</h6>
              <button class="btn btn-dark mt-4 w-100" @click="register">
                <strong> REGISTER NOW </strong>
              </button>
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
  name: 'event-scan',
  props: {
    url: String
  },
  setup(props) {
    const register = () => {
      const url = props.url + '&is_confirm=true'
      window.location.href = url
    }

    onMounted(() => {
      if (props.url == null || props.url == '') {
        router.push({ name: 'Error', params: { slug: '404' } })
      }
    })

    return {
      register
    }
  }
})
</script>