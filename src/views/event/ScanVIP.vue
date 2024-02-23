<template>
  <div id="registration">
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
                <h3>
                  <strong>
                    SCAN YOUR <br />
                    QR-CODE HERE
                  </strong>
                </h3>
                <div class="card shadow-sm rounded-0 border-0 mb-3">
                  <div class="card-body">
                    <div class="p-2">
                      <qr-stream @decode="onDecode" style="width: 100%" class="rounded">
                      </qr-stream>
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
              <div class="card-header" :class="!is_vip ? 'bg-warning text-white' : ''">
                <div class="d-flex justify-content-between align-items-center my-0">
                  <h4 class="m-0 d-flex">
                    <box-icon
                      name="user-circle"
                      :color="!is_vip ? '#fff' : '#000'"
                      class="mt-1 me-2"
                    ></box-icon>
                    Confirmation
                  </h4>
                  <div class="d-flex align-items-center">
                    <h2 class="mb-0" v-if="!is_vip">VIP</h2>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-4 text-center">
                    <img
                      src="/public/img/confirmation.svg"
                      alt="EduALL Confirmation"
                      class="w-75"
                    />
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
  </div>
</template>
    
    <script>
import ApiService from '@/services/ApiService'
import { defineComponent, ref } from 'vue'
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
  setup() {
    const scan = ref(true)
    const phone_number = ref()
    const clientevent_id = ref()
    const is_vip = ref()
    const registration = ref({
      attend_party: ''
    })

    const onDecode = async (value) => {
      const progress = useProgress().start()
      if (value) {
        const endpoint = value
        try {
          const res = await ApiService.get(endpoint)
          if (res.success) {
            console.log(res.data)
          }
          progress.finish()
        } catch (error) {
          console.error(error)
          progress.finish()
        }
      }
    }

    const submit = async () => {
      console.log(registration.value)
      const progress = useProgress().start()
      const endpoint = 'v1/registration/verify/' + clientevent_id.value
      try {
        const res = await ApiService.patch(endpoint, registration.value)
        if (res.success) {
          console.log(res)
        }
        progress.finish()
      } catch (error) {
        console.error(error)
        progress.finish()
      }
    }

    return {
      scan,
      clientevent_id,
      is_vip,
      phone_number,
      registration,
      onDecode,
      submit
    }
  }
})
</script>