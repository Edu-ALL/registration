<template>
  <div class="container-fluid">
    <div class="row" style="height: 100dvh" v-if="scan">
      <div class="col-md-8 bg-primary">
        <div class="d-flex align-items-center w-100 h-100 px-5">
          <h2>Event Name</h2>
        </div>
      </div>
      <div class="col-md-4">
        <div class="d-flex align-items-center w-100 h-100 px-5">
          <div class="d-flex align-items-center w-100 h-100">
            <div class="w-100 text-center">
              <router-link :to="{ name: 'home' }">
                <div class="btn btn-sm btn-outline-primary mb-4">
                  <font-awesome-icon icon="fa-home" class="me-2"></font-awesome-icon> Back to Home
                </div>
              </router-link>
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
                  <input
                    type="text"
                    v-model="phone_number"
                    class="form-control"
                    @change="checkPhone"
                  />
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
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center my-3">
                <h4 class="m-0">Confirmation</h4>
                <div class="badge bg-info">
                  {{ registration.role.toUpperCase() }}
                </div>
              </div>
              <hr />
              <div class="row align-items-center">
                <div class="col-md-4 text-center">
                  <img src="/public/img/confirmation.svg" alt="EduALL Confirmation" class="w-75" />
                </div>
                <div class="col-md-8">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <small class="text-muted">
                        Full Name <span class="text-danger">*</span>
                      </small>
                      <input type="text" v-model="registration.fullname" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <small class="text-muted"> Email <span class="text-danger">*</span> </small>
                      <input type="email" v-model="registration.mail" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <small class="text-muted">
                        Phone Number <span class="text-danger">*</span>
                      </small>
                      <input type="text" v-model="registration.phone" class="form-control" />
                    </div>
                    <div class="col-md-6" v-if="registration.graduation_year">
                      <small class="text-muted">
                        Graduation Year <span class="text-danger">*</span>
                      </small>
                      <GraduationYear
                        :data="registration.graduation_year"
                        @check="checkComponent"
                      ></GraduationYear>
                    </div>

                    <div class="col-md-12" v-if="registration.have_child">
                      <div class="row">
                        <div class="col-md-4">
                          <small class="text-muted">
                            Child Name <span class="text-danger">*</span>
                          </small>
                          <input
                            type="text"
                            v-model="registration.secondary_name"
                            class="form-control"
                          />
                        </div>
                        <div class="col-md-4">
                          <small class="text-muted">
                            Child Email <span class="text-danger"></span>
                          </small>
                          <input
                            type="email"
                            v-model="registration.secondary_email"
                            class="form-control"
                          />
                        </div>
                        <div class="col-md-4">
                          <small class="text-muted">
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
                      <small class="text-muted">
                        School Name <span class="text-danger">*</span>
                      </small>
                      <School
                        :data="registration.school_id"
                        @check="checkComponent"
                        @new="newData"
                      ></School>
                    </div>

                    <div
                      class="col-md-12"
                      v-if="
                        (registration.role == 'parent' && registration.have_child) ||
                        registration.role == 'student'
                      "
                    >
                      <small class="text-muted">
                        Dream University <span class="text-danger">*</span>
                      </small>
                      <Country
                        :data="registration.destination_country"
                        @check="checkComponent"
                      ></Country>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="d-flex justify-content-between align-items-end mb-3">
                <div class="btn btn-outline-warning py-1 px-2" @click="scan = true">
                  <font-awesome-icon icon="fa-arrow-left"></font-awesome-icon> Back to Scan
                </div>

                <div class="d-flex w-75 text-end align-items-end justify-content-end">
                  <div style="width: 100px">
                    <small class="text-muted">
                      Party Number <span class="text-danger">*</span>
                    </small>
                    <input
                      type="number"
                      v-model="registration.attend_party"
                      class="form-control mb-0"
                      style="font-weight: bold"
                    />
                  </div>
                  <button class="btn btn-primary ms-2 h-100" @click="submit">
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
</template>
  
  <script>
import ApiService from '@/services/ApiService'
import { defineComponent, onMounted, ref } from 'vue'
import School from '../component/School.vue'
import Country from '../component/Country.vue'
import GraduationYear from '../component/GraduationYear.vue'
import { useProgress } from '@marcoschulte/vue3-progress'

export default defineComponent({
  name: 'event-scan',
  components: {
    School,
    GraduationYear,
    Country
  },
  props: {
    eventId: String
  },
  setup(props) {
    const scan = ref(true)
    const phone_number = ref()
    const event_id = ref()
    const is_vip = ref()
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
      if (value) {
        const endpoint = 'v1/client-event/TKT/' + value
        try {
          const res = await ApiService.get(endpoint)
          if (res.success) {
            restructureData(res.data)
            scan.value = false
          }
          progress.finish()
        } catch (error) {
          console.error(error)
          progress.finish()
        }
      }
    }

    const checkPhone = async () => {
      const progress = useProgress().start()
      const endpoint = 'v1/client-event/PH/' + phone_number.value + '?EVT=' + props.eventId
      try {
        const res = await ApiService.get(endpoint)
        if (res.success) {
          restructureData(res.data)
          scan.value = false
        }
        progress.finish()
      } catch (error) {
        console.error(error)
        progress.finish()
      }
    }

    const restructureData = (data) => {
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
      registration.value.status = data?.joined_event?.status
      registration.value.referral = data?.joined_event?.referral
      registration.value.client_type = data?.joined_event?.client_type
      registration.value.have_child = data.role == 'parent' && data['student']?.name ? true : false
    }

    const submit = async () => {
      console.log(registration.value)
      const progress = useProgress().start()
      const endpoint = 'v1/registration/verify/' + event_id.value
      try {
        const res = await ApiService.patch(endpoint, registration.value)
        console.log(res)
        // if (res.success) {
        // }
        progress.finish()
      } catch (error) {
        console.error(error)
        progress.finish()
      }
    }

    onMounted(() => {
      checkPhone()
    })

    return {
      scan,
      event_id,
      is_vip,
      phone_number,
      registration,
      onDecode,
      checkPhone,
      restructureData,
      submit
    }
  }
})
</script>