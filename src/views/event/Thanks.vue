<template>
  <div class="container">
    <div class="row align-items-center justify-content-center" style="height: 100dvh">
      <div class="text-center" :class="type == 'pra_reg' ? 'col-md-7' : 'col-md-5'">
        <div class="card border-0 shadow">
          <div class="card-body">
            <div class="row align-items-center" v-if="event?.code == 'SCS'">
              <div :class="type == 'pra_reg' ? 'col-md-8' : 'col-md-12'">
                <img src="/img/check.png" alt="completed" width="10%" class="mb-4" />
                <h3>Hi, {{ event?.data?.client.name }}</h3>
                <h4 class="mb-4">
                  <span>
                    Thank you for {{ type == 'pra_reg' ? 'registering' : 'attending' }} for our
                    event!
                  </span>
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
                    <button
                      class="btn btn-sm btn-outline-info p-1 py-0"
                      v-tooltip
                      data-bs-title="Download QR-Code"
                      @click="downloadContent"
                    >
                      <font-awesome-icon
                        icon="fa-download"
                        class="cursor-pointer"
                      ></font-awesome-icon>
                    </button>
                  </div>
                  <div class="card-body" ref="contentToDownload">
                    <vue-qrcode
                      :value="event?.data?.clientevent.ticket_id"
                      width="200"
                      maskPattern="7"
                      v-if="type == 'pra_reg'"
                    />
                    <div v-if="type == 'ots'" class="mb-3">
                      <a
                        href="#"
                        class="btn btn-sm btn-primary"
                        @click="goToIA(event?.data?.clientevent.ticket_id)"
                        >Initial Assessment Now</a
                      >
                      <h6 class="mt-2 mb-1">OR</h6>
                      Visit Initial Assesment
                      <a href="#" @click="goToIA()"> here </a>
                      and use your ticket ID
                    </div>
                    <small>Ticket ID:</small>
                    <div class="card border-0 shadow">
                      <h5 class="text-uppercase py-3 mb-0">
                        {{ event?.data?.clientevent.ticket_id }}
                        <font-awesome-icon
                          icon="fa-copy"
                          class="cursor-pointer ms-3"
                          @click="copyToClipboard(event?.data?.clientevent.ticket_id)"
                          v-if="!copied"
                        ></font-awesome-icon>
                        <font-awesome-icon
                          v-tooltip
                          data-bs-title="Copied"
                          icon="fa-check"
                          class="cursor-pointer ms-3 text-success"
                          v-else
                        ></font-awesome-icon>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row align-items-center justify-content-center" v-else>
              <div class="col-md-10">
                <img src="/img/check.png" alt="completed" width="10%" class="mb-4" />
                <h5>You're Already Registered!</h5>
                <p>Dive into the event's activities and connect with others.</p>
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
import ClientEventService from '@/services/ClientEventService'

export default defineComponent({
  name: 'thank-event',
  props: {
    id: String,
    type: String,
    detail: Object
  },
  setup(props) {
    const event = ref()
    const getEvent = () => {}
    const contentToDownload = ref()
    const convertedImageUrl = ref()
    const copied = ref(false)

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

    const copyToClipboard = (text) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Tindakan sukses
          copied.value = true
          setTimeout(() => {
            copied.value = false
          }, 2000) // Setelah 2 detik, reset nilai copied
        })
        .catch((error) => {
          // Tindakan gagal
          console.error('Failed to copy:', error)
        })
    }

    const goToIA = (ticket_id = null) => {
      const url = ticket_id ? import.meta.env.VITE_IA_URL + ticket_id : import.meta.env.VITE_IA_URL
      window.open(url, '_blank')
    }

    onMounted(() => {
      if (props.type != 'pra_reg' && props.type != 'ots') {
        router.push({ name: 'NotFound' })
      }
      event.value = ClientEventService.getClientEvent()
    })

    return {
      event,
      contentToDownload,
      copied,
      goToIA,
      getEvent,
      downloadContent,
      copyToClipboard
    }
  }
})
</script>