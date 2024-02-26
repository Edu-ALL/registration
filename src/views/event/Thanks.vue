<template>
  <div id="registration">
    <div class="container">
      <div class="row align-items-center justify-content-center" style="height: 100dvh">
        <div class="text-center" :class="status == 'pra-reg' ? 'col-md-7' : 'col-md-5'">
          <div class="card border-0 shadow">
            <div class="card-body bg-primary text-white">
              <div class="row align-items-center" v-if="event?.code == 'SCS'">
                <div :class="status == 'pra-reg' ? 'col-md-8' : 'col-md-12'">
                  <img src="/img/check.png" alt="completed" width="10%" class="mb-4" />
                  <h3>Hi, {{ event?.data?.client.name }}</h3>
                  <h4 class="mb-4">
                    <span>
                      Thank you for {{ status == 'pra-reg' ? 'registering' : 'attending' }} our
                      event!
                    </span>
                  </h4>

                  <!-- Description for Parent / Teacher / Student & Mentee  -->
                  <div
                    v-if="
                      event?.data?.client?.register_as == 'parent' ||
                      event?.data?.client?.register_as == 'teacher/counsellor' ||
                      (event?.data?.client?.register_as == 'student' && event?.data?.client?.is_vip)
                    "
                  >
                    <p v-if="status == 'pra-reg'">
                      We appreciate your participation. To facilitate your re-registration on the
                      day of the event, please download and utilize the QR code provided below.
                    </p>
                    <p v-else>Dive into the event's activities and connect with others.</p>
                  </div>

                  <!-- Description for Student & Non Mentee  -->
                  <div
                    v-if="
                      event?.data?.client?.register_as == 'student' && !event?.data?.client?.is_vip
                    "
                  >
                    <p v-if="status == 'pra-reg'">
                      We appreciate your participation. To facilitate your re-registration on the
                      day of the event, please download and utilize the QR code provided below.
                    </p>
                    <p v-else>
                      We appreciate your participation. Please proceed to the initial assessment
                      application by using your ticket ID or through this
                      <span v-if="type == 'onsite'"> QR-Code </span> <span v-else> link </span> .
                    </p>
                  </div>
                </div>

                <div :class="status == 'pra-reg' ? 'col-md-4' : 'col-md-12'">
                  <div :class="status == 'pra-reg' ? 'card border-0 shadow bg-dark' : ''">
                    <div class="px-3 pt-2 text-end" v-if="status == 'pra-reg'">
                      <div class="d-flex justify-content-between align-items-center text-white">
                        Download QR
                        <button class="btn btn-sm bg-secondary p-1 py-0" @click="downloadContent">
                          <font-awesome-icon
                            icon="fa-download"
                            class="cursor-pointer"
                          ></font-awesome-icon>
                        </button>
                      </div>
                    </div>

                    <div
                      class="card-body rounded"
                      :class="status == 'ots' ? 'bg-primary' : 'bg-dark'"
                      ref="contentToDownload"
                    >
                      <vue-qrcode
                        :value="event?.data?.clientevent.ticket_id"
                        width="185"
                        maskPattern="7"
                        v-if="status == 'pra-reg'"
                      />

                      <div
                        class="bg-dark p-4 rounded"
                        v-if="
                          event?.data?.client?.register_as == 'student' &&
                          !event?.data?.client?.is_vip
                        "
                      >
                        <div v-if="status == 'ots'" class="mb-3">
                          <vue-qrcode
                            :value="event?.data?.clientevent.ticket_id"
                            width="185"
                            maskPattern="7"
                            v-if="type == 'onsite'"
                          />
                          <a
                            href="#"
                            class="btn btn-sm bg-secondary rounded-0 pb-2 px-4"
                            @click="goToIA(event?.data?.clientevent.ticket_id)"
                            v-if="type == 'self'"
                          >
                            <box-icon
                              name="rocket"
                              color="#fff"
                              size="15px"
                              class="me-2"
                            ></box-icon>
                            Initial Assessment Now
                          </a>
                          <h6 class="mt-2 mb-1">OR</h6>
                          Visit Initial Assesment
                          <a href="#" @click="goToIA()"> here </a>
                          and use your ticket ID
                        </div>
                        <small>Ticket ID:</small>
                        <div class="card border-0 shadow mt-2">
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
    status: String,
    type: String
  },
  setup(props) {
    const event = ref()
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
      if (props.status != 'pra-reg' && props.status != 'ots') {
        router.push({ name: 'NotFound' })
      } else {
        if (props.type == 'onsite') {
          setTimeout(() => {
            router.push({ name: 'home' })
          }, 5000)
        }
        event.value = ClientEventService.getClientEvent()
      }
    })

    return {
      event,
      contentToDownload,
      copied,
      goToIA,
      downloadContent,
      copyToClipboard
    }
  }
})
</script>