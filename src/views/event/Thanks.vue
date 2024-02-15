<template>
  <div class="row align-items-center justify-content-center" style="height: 100dvh">
    <div class="text-center" :class="type == 'pra_reg' ? 'col-md-6' : 'col-md-5'">
      <div class="card border-0 shadow">
        <div class="card-body">
          <div class="row align-items-center">
            <div :class="type == 'pra_reg' ? 'col-md-8' : 'col-md-12'">
              <img src="/img/check.png" alt="completed" width="10%" class="mb-4" />
              <h4 class="mb-4">
                Thank you for {{ type == 'pra_reg' ? 'registering' : 'attending' }} for our event!
              </h4>
              <p v-if="type == 'pra_reg'">
                We appreciate your participation. To facilitate your re-registration on the day of
                the event, please download and utilize the QR code provided below. <br /><br />
                This QR code will streamline the registration process and ensure a smooth check-in
                experience for you. We look forward to seeing you at the event!
              </p>
              <p v-else>
                We appreciate your participation. Please proceed to the initial assessment
                application by using your ticket ID or through this link.
              </p>
            </div>
            <div :class="type == 'pra_reg' ? 'col-md-4' : 'col-md-12'">
              <div :class="type == 'pra_reg' ? 'card border-0 shadow' : ''">
                <div class="px-3 pt-2 text-end" v-if="type == 'pra_reg'">
                  <button class="btn btn-sm btn-outline-info p-1 py-0" @click="downloadContent">
                    <font-awesome-icon
                      icon="fa-download"
                      class="cursor-pointer"
                    ></font-awesome-icon>
                  </button>
                </div>
                <div class="card-body" ref="contentToDownload">
                  <vue-qrcode
                    value="https://all-inedu.com"
                    width="200"
                    maskPattern="7"
                    v-if="type == 'pra_reg'"
                  />
                  <div v-if="type == 'ots'" class="mb-3">
                    <a href="#" class="btn btn-sm btn-primary">Initial Assessment Now</a>
                    <h6 class="mt-2 mb-1">OR</h6>
                    Visit Initial Assesment <a href="#"> here </a> and use your ticket ID
                  </div>
                  <div class="card border-0 shadow">
                    <small>Ticket ID:</small>
                    <h5>123535</h5>
                  </div>
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
import { defineComponent, onMounted, ref } from 'vue'
import html2canvas from 'html2canvas'
import router from '@/router'

export default defineComponent({
  name: 'thank-event',
  props: {
    id: String,
    type: String
  },
  setup(props) {
    const event = ref()
    const getEvent = () => {}
    const contentToDownload = ref()
    const convertedImageUrl = ref()

    const downloadContent = () => {
      convertToImage()
    }

    const convertToImage = () => {
      html2canvas(contentToDownload.value)
        .then((canvas) => {
          const imageDataURL = canvas.toDataURL('image/png')
          convertedImageUrl.value = imageDataURL

          const image = new Image()
          image.src = convertedImageUrl.value

          const link = document.createElement('a')
          link.href = convertedImageUrl.value
          link.setAttribute('download', 'Qr-Code.jpg')

          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          console.error('Error converting to image:', error)
        })
    }

    onMounted(() => {
      if (props.type != 'pra_reg' && props.type != 'ots') {
        router.push({ name: 'NotFound' })
      }
    })

    return {
      event,
      contentToDownload,
      getEvent,
      downloadContent
    }
  }
})
</script>