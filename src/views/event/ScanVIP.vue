<template>
  <div id="registration">
    <div class="container-fluid">
      <div class="row" style="height: 100dvh" v-if="scan">
        <div
          class="col-md-8 bg-primary"
          style="
            background: url('/img/bg-scan.webp');
            background-size: cover;
            background-position: center;
          "
        ></div>
        <div class="col-md-4">
          <div class="d-flex align-items-center w-100 h-100 px-5">
            <div class="d-flex align-items-center w-100 h-100">
              <div class="w-100 text-center">
                <div class="p-2 text-dark" style="background: #fed118">
                  <h3 class="m-0">
                    <strong> VIP MEMBER </strong>
                  </h3>
                </div>
                <div class="card shadow rounded-0 border-0 mb-3">
                  <div class="card-body p-1">
                    <div class="p-0" v-if="!qrloading">
                      <qr-stream @decode="onDecode" style="width: 100%" class="rounded">
                      </qr-stream>
                    </div>
                    <div class="p-2" v-else>
                      <box-icon name="loader-circle" animation="spin"></box-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" style="height: 100dvh" v-else>
        <div class="col-md-8">
          <div class="d-flex align-items-center w-100 h-100">
            <div class="card shadow border-0 rounded-0 w-100">
              <div class="card-header" :class="is_vip ? 'bg-warning text-white' : ''">
                <div class="d-flex justify-content-between align-items-center my-0">
                  <h4 class="m-0 d-flex">
                    <box-icon
                      name="user-circle"
                      :color="is_vip ? '#fff' : '#000'"
                      class="mt-1 me-2"
                    ></box-icon>
                    Confirmation
                  </h4>
                  <div class="d-flex align-items-center">
                    <h2 class="mb-0" v-if="is_vip">VIP</h2>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-4 text-center">
                    <img src="/img/confirmation.svg" alt="EduALL Confirmation" class="w-75" />
                  </div>
                  <div class="col-md-8">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <small class="text-muted label">
                          <box-icon
                            name="user"
                            size="12px"
                            className="me-2"
                            color="#969696"
                          ></box-icon>
                          Full Name <span class="text-danger">*</span>
                        </small>
                        <input type="text" v-model="registration.fullname" class="form-control" />
                        <small class="text-danger error" v-if="error?.fullname">
                          <box-icon
                            name="info-circle"
                            animation="tada"
                            size="12px"
                            color="#d21414"
                            className="me-1"
                          ></box-icon>
                          {{ error?.fullname[0] }}
                        </small>
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted label">
                          <box-icon
                            name="envelope"
                            size="12px"
                            className="me-2"
                            color="#969696"
                          ></box-icon>
                          Email <span class="text-danger">*</span>
                        </small>
                        <input type="email" v-model="registration.mail" class="form-control" />
                        <small class="text-danger error" v-if="error?.mail">
                          <box-icon
                            name="info-circle"
                            animation="tada"
                            size="12px"
                            color="#d21414"
                            className="me-1"
                          ></box-icon>
                          {{ error?.mail[0] }}
                        </small>
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted label">
                          <box-icon
                            name="mobile"
                            size="12px"
                            className="me-2"
                            color="#969696"
                          ></box-icon>
                          Phone Number <span class="text-danger">*</span>
                        </small>
                        <input type="text" v-model="registration.phone" class="form-control" />
                        <small class="text-danger error" v-if="error?.phone">
                          <box-icon
                            name="info-circle"
                            animation="tada"
                            size="12px"
                            color="#d21414"
                            className="me-1"
                          ></box-icon>
                          {{ error?.phone[0] }}
                        </small>
                      </div>
                      <div class="col-md-6" v-if="registration.graduation_year">
                        <small class="text-muted label">
                          <box-icon
                            name="graduation"
                            type="solid"
                            size="12px"
                            className="me-2"
                            color="#969696"
                          ></box-icon>
                          Graduation Year <span class="text-danger">*</span>
                        </small>
                        <GraduationYear
                          :data="registration.graduation_year"
                          @check="checkComponent"
                        ></GraduationYear>
                        <small class="text-danger error" v-if="error?.graduation_year">
                          <box-icon
                            name="info-circle"
                            animation="tada"
                            size="12px"
                            color="#d21414"
                            className="me-1"
                          ></box-icon>
                          {{ error?.graduation_year[0] }}
                        </small>
                      </div>

                      <div class="col-md-12" v-if="registration.have_child">
                        <div class="row">
                          <div class="col-md-4">
                            <small class="text-muted label">
                              <box-icon
                                name="user"
                                type="solid"
                                size="12px"
                                className="me-2"
                                color="#969696"
                              ></box-icon>
                              Child Name <span class="text-danger">*</span>
                            </small>
                            <input
                              type="text"
                              v-model="registration.secondary_name"
                              class="form-control"
                            />
                            <small class="text-danger error" v-if="error?.secondary_name">
                              <box-icon
                                name="info-circle"
                                animation="tada"
                                size="12px"
                                color="#d21414"
                                className="me-1"
                              ></box-icon>
                              {{ error?.secondary_name[0] }}
                            </small>
                          </div>
                          <div class="col-md-4">
                            <small class="text-muted label">
                              <box-icon
                                name="envelope"
                                type="solid"
                                size="12px"
                                className="me-2"
                                color="#969696"
                              ></box-icon>
                              Child Email <span class="text-danger"></span>
                            </small>
                            <input
                              type="email"
                              v-model="registration.secondary_email"
                              class="form-control"
                            />
                          </div>
                          <div class="col-md-4">
                            <small class="text-muted label">
                              <box-icon
                                name="mobile"
                                size="12px"
                                className="me-2"
                                color="#969696"
                              ></box-icon>
                              Child Number <span class="text-danger"></span>
                            </small>
                            <input
                              type="text"
                              v-model="registration.secondary_phone"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12">
                        <small class="text-muted label">
                          <box-icon
                            name="school"
                            type="solid"
                            size="12px"
                            className="me-2"
                            color="#969696"
                          ></box-icon>
                          School Name <span class="text-danger">*</span>
                        </small>
                        <School
                          :data="registration.school_id"
                          @check="checkComponent"
                          @new="newData"
                        ></School>
                        <small class="text-danger error" v-if="error?.school_id">
                          <box-icon
                            name="info-circle"
                            animation="tada"
                            size="12px"
                            color="#d21414"
                            className="me-1"
                          ></box-icon>
                          {{ error?.school_id[0] }}
                        </small>
                      </div>

                      <div
                        class="col-md-12"
                        v-if="
                          (registration.role == 'parent' && registration.have_child) ||
                          registration.role == 'student'
                        "
                      >
                        <small class="text-muted label">
                          <box-icon
                            name="flag-alt"
                            type="solid"
                            size="12px"
                            className="me-2"
                            color="#969696"
                          ></box-icon>
                          Dream University <span class="text-danger">*</span>
                        </small>
                        <Country
                          :data="registration.destination_country"
                          @check="checkComponent"
                        ></Country>
                        <small class="text-danger error" v-if="error?.destination_country">
                          <box-icon
                            name="info-circle"
                            animation="tada"
                            size="12px"
                            color="#d21414"
                            className="me-1"
                          ></box-icon>
                          {{ error?.destination_country[0] }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="d-flex justify-content-between align-items-end mb-3">
                  <button
                    class="btn btn-outline-warning py-1 px-2"
                    @click="scan = true"
                    :disabled="loading"
                  >
                    <font-awesome-icon icon="fa-arrow-left"></font-awesome-icon> Back to Scan
                  </button>

                  <div class="d-flex w-75 text-end align-items-end justify-content-end">
                    <div style="width: 100px">
                      <small class="text-muted label">
                        Party Number <span class="text-danger">*</span>
                      </small>
                      <input
                        type="number"
                        v-model="registration.attend_party"
                        class="form-control mb-0"
                        style="font-weight: bold"
                      />
                    </div>
                    <button class="btn btn-primary ms-2 h-100" @click="submit" :disabled="loading">
                      <font-awesome-icon
                        :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
                        class="me-2"
                        :pulse="loading"
                      />
                      {{ loading ? 'Waiting' : 'Submit' }}
                    </button>
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
import ApiService from '@/services/ApiService'
import { defineComponent, onMounted, ref } from 'vue'
import School from '../component/School.vue'
import Country from '../component/Country.vue'
import GraduationYear from '../component/GraduationYear.vue'
import { useProgress } from '@marcoschulte/vue3-progress'
import { showNotif } from '@/helper/notification'
import ClientEventService from '@/services/ClientEventService'
import router from '@/router'

export default defineComponent({
  name: 'event-scan',
  props: {
    url: String
  },
  components: {
    School,
    GraduationYear,
    Country
  },
  setup(props) {
    const scan = ref(true)
    const event_id = ref()
    const is_vip = ref()
    const loading = ref(false)
    const qrloading = ref(false)
    const error = ref()
    const registration = ref({
      role: 'student',
      fullname: '',
      mail: '',
      phone: '',
      secondary_name: '',
      secondary_email: '',
      secondary_phone: '',
      school_id: '',
      other_school: '',
      graduation_year: '',
      destination_country: [],
      scholarship: 'N',
      lead_source_id: '',
      event_id: '',
      attend_status: '',
      attend_party: '',
      event_type: '',
      status: 'PR',
      referral: '',
      client_type: '',
      have_child: false
    })

    const onDecode = async (value) => {
      const progress = useProgress().start()
      qrloading.value = true
      if (value) {
        const endpoint = value
        try {
          const res = await ApiService.get(endpoint)
          if (res.success) {
            checkingData(res.data)
          } else {
            showNotif('error', 'Please try again!', 'bottom-start')
          }
          qrloading.value = false
          progress.finish()
        } catch (error) {
          console.error(error)
          qrloading.value = false
          progress.finish()
        }
      }
    }

    const checkURL = async (url) => {
      const progress = useProgress().start()
      qrloading.value = true
      const endpoint = url
      try {
        const res = await ApiService.get(endpoint)
        if (res.success) {
          checkingData(res.data)
        } else {
          showNotif('error', 'Please try again!', 'bottom-start')
        }
        qrloading.value = false
        progress.finish()
      } catch (error) {
        showNotif('error', 'Please try again!', 'bottom-start')
        console.error(error)
        qrloading.value = false
        progress.finish()
      }
    }

    const checkComponent = (data = null) => {
      registration.value[data.key] = data?.value
    }

    const newData = (data) => {
      registration.value[data?.key] = data?.value
    }

    const checkingData = (data) => {
      if (data?.joined_event?.attend_status == 1) {
        showNotif('warning', 'You have already scanned.', 'bottom-start')
      } else {
        scan.value = false
        const role = data.role == 'teacher/counsellor' ? 'teacher' : data.role
        is_vip.value = data.is_vip
        event_id.value = data.joined_event?.clientevent_id

        registration.value.role = data.role
        registration.value.fullname = data[role]?.name
        registration.value.mail = data[role]?.mail
        registration.value.phone = data[role]?.phone
        registration.value.secondary_name = data.role == 'parent' ? data['student']?.name : null
        registration.value.secondary_email = data.role == 'parent' ? data['student']?.mail : null
        registration.value.secondary_phone = data.role == 'parent' ? data['student']?.phone : null
        registration.value.school_id = data.education?.school_id
        registration.value.other_school = null
        registration.value.graduation_year = data.education?.graduation_year
          ? data.education?.graduation_year
          : null
        registration.value.destination_country = []
        if (data?.dreams_countries) {
          data?.dreams_countries.forEach((element) => {
            registration.value.destination_country.push(element.country_id)
          })
        }
        registration.value.scholarship = data?.scholarship ? data?.scholarship : 'N'
        registration.value.lead_source_id = data?.lead?.lead_id
        registration.value.event_id = data?.joined_event?.event_id
        registration.value.attend_status = data?.joined_event?.attend_status == 1 ? 'attend' : null
        registration.value.attend_party = data?.joined_event?.attend_party
        registration.value.event_type = data?.joined_event?.event_type
        registration.value.status = data?.joined_event?.status == 'ots' ? 'OTS' : 'PR'
        registration.value.referral = data?.joined_event?.referral
        registration.value.client_type = data?.joined_event?.client_type
        registration.value.have_child =
          data.role == 'parent' && data['student']?.name ? true : false
      }
    }

    const submit = async () => {
      loading.value = true
      const progress = useProgress().start()
      const endpoint = 'v1/registration/verify/' + event_id.value
      try {
        const res = await ApiService.patch(endpoint, registration.value)
        if (res.success) {
          showNotif('success', res.message, 'bottom-start')
          ClientEventService.saveClientEvent(res)
          setTimeout(() => {
            router.push({ name: 'thanks-event', params: { status: 'ots', type: 'onsite' } })
          }, 3000)
        } else {
          error.value = res.error ? res.error : null
          showNotif(
            'error',
            res.message ? res.message : 'Please complete the fields above!',
            'bottom-start'
          )
        }
        loading.value = false
        progress.finish()
      } catch (error) {
        showNotif('error', 'Please try again!', 'bottom-start')
        loading.value = false
        console.error(error)
        progress.finish()
      }
    }

    onMounted(() => {
      if (props.url) {
        checkURL(props.url)
      }
    })

    return {
      scan,
      event_id,
      is_vip,
      loading,
      qrloading,
      error,
      registration,
      onDecode,
      checkComponent,
      newData,
      checkingData,
      submit
    }
  }
})
</script>