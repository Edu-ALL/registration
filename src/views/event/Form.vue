<template>
  <div :id="formType == 'cta' ? '' : ''">
    <div class="container">
      <div class="row justify-content-center align-items-center" style="min-height: 100dvh">
        <div class="position-fixed" style="bottom: 2%; left: 95%; z-index: 9999">
          <div class="dropdown" v-if="errors">
            <button
              class="btn btn-danger btn-sm dropdown-toggle"
              style="font-size: 10px"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon icon="fa-info-circle" class=""></font-awesome-icon>
            </button>
            <ul class="dropdown-menu">
              <li v-for="item in errors" :key="item" class="dropdown-item my-0 py-0">
                <font-awesome-icon icon="fa-info" class="text-warning me-2"></font-awesome-icon>
                {{ item[0] }}
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-12">
          <div class="text-end">
            <router-link :to="{ name: 'home' }" v-if="status == 'ots' && type == 'onsite'">
              <div class="btn btn-sm btn-outline-primary mb-2">
                <font-awesome-icon icon="fa-home" class="me-2"></font-awesome-icon> Back to Home
              </div>
            </router-link>
          </div>
          <div class="row justify-content-center align-items-md-stretch g-1">
            <div class="col-md-4 col-form" v-if="formType == 'cta'">
              <div
                class="card h-100 bg-form rounded-0 shadow"
                :style="
                  event?.event_banner
                    ? 'background: url(' + event?.event_banner + ')'
                    : 'background: url(/img/bg.jpg)'
                "
              >
                <div
                  class="progress rounded-pill m-2"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style="height: 4px"
                >
                  <div class="progress-bar bg-success" :style="'width:' + progress + '%'"></div>
                </div>
                <div
                  class="card-body p-0 d-flex align-items-end justify-content-center"
                  v-if="!event?.event_banner"
                >
                  <div
                    class="w-100 d-flex align-items-center justify-content-center py-2 rounded"
                    style="background: #251b815b"
                  >
                    <h5 class="text-white text-center px-3">
                      {{ event?.event_name }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div
                class="progress rounded-pill"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                style="height: 4px"
                v-if="formType != 'cta'"
              >
                <div class="progress-bar bg-success" :style="'width:' + progress + '%'"></div>
              </div>
              <!-- Personal  -->
              <div class="card rounded-0 shadow" v-if="step == 1">
                <div class="p-3 d-flex align-items-center justify-content-between">
                  <h3 class="my-0">Let us know you better!</h3>
                  <small class="text-muted">Page {{ step }} of 2</small>
                </div>
                <div class="card-body" :class="{ 'registration-card': formType == 'cta' }">
                  <div class="row g-3">
                    <div class="col-md-4">
                      <small class="text-muted label">
                        <box-icon
                          name="user-rectangle"
                          type="solid"
                          size="xs"
                          color="#797575"
                        ></box-icon>
                        Full Name <span class="text-danger">*</span>
                      </small>
                      <input
                        type="text"
                        v-model="registration.fullname"
                        class="form-control"
                        :class="{
                          'is-invalid': shouldShowError('fullname'),
                          'is-valid': !shouldShowError('fullname') && registration.fullname
                        }"
                        @input="touchField('fullname')"
                      />
                      <small class="text-danger error" v-if="shouldShowError('fullname')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.fullname.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                    <div class="col-md-4">
                      <small class="text-muted label">
                        <box-icon name="envelope" size="xs" color="#797575"></box-icon>

                        Email <span class="text-danger">*</span>
                      </small>
                      <input
                        type="email"
                        v-model="registration.mail"
                        class="form-control"
                        :class="{
                          'is-invalid': shouldShowError('mail'),
                          'is-valid': !shouldShowError('mail') && registration.mail
                        }"
                        @input="touchField('mail')"
                      />
                      <small class="text-danger error" v-if="shouldShowError('mail')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.mail.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                    <div class="col-md-4">
                      <small class="text-muted label">
                        <box-icon name="mobile" size="xs" color="#797575"></box-icon>
                        Phone <span class="text-danger">*</span>
                      </small>
                      <input
                        type="tel"
                        v-model="registration.phone"
                        class="form-control"
                        :class="{
                          'is-invalid': shouldShowError('phone'),
                          'is-valid': !shouldShowError('phone') && registration.phone
                        }"
                        @input="touchField('phone')"
                      />
                      <small class="text-danger error" v-if="shouldShowError('phone')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.phone.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                    <div class="col-md-12 mt-3">
                      <label class="text-muted"
                        >You are a
                        <span class="text-danger">*</span>
                      </label>
                      <small class="text-danger error" v-if="shouldShowError('role')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.role.$silentErrors[0]?.$message }}
                      </small>
                      <div class="row row-cols-md-3 row-cols-3 g-3">
                        <div class="col">
                          <div class="role">
                            <img src="/img/student.webp" alt="student" />
                            <input
                              class="role-input"
                              type="radio"
                              name="role"
                              v-model="registration.role"
                              value="student"
                              id="studentRole"
                              @change="checkRole"
                            />
                            <label class="role-label" for="studentRole"></label>
                          </div>
                        </div>
                        <div class="col">
                          <div class="role">
                            <img src="/img/parent.webp" alt="parent" />
                            <input
                              class="role-input"
                              type="radio"
                              name="role"
                              id="parentRole"
                              v-model="registration.role"
                              value="parent"
                              @change="checkRole"
                            />
                            <label class="role-label" for="parentRole"></label>
                          </div>
                        </div>
                        <div class="col">
                          <div class="role">
                            <img src="/img/teacher.webp" alt="teacher" />
                            <input
                              class="role-input"
                              type="radio"
                              name="role"
                              id="teacherRole"
                              v-model="registration.role"
                              value="teacher/counsellor"
                              @change="checkRole"
                            />
                            <label class="role-label" for="teacherRole"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-end">
                  <button
                    class="btn btn-sm btn-primary rounded-pill px-3"
                    @click="nextAdditional"
                    :disabled="loading"
                  >
                    {{ loading ? 'Waiting' : 'Next' }}
                    <font-awesome-icon
                      :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-arrow-right'"
                      class="ms-2"
                      :pulse="loading"
                    />
                  </button>
                </div>
              </div>

              <!-- Additional  -->
              <div class="card shadow" v-if="step == 2">
                <div class="p-3 d-flex align-items-center justify-content-between">
                  <h3 class="my-0">Let us know you better!</h3>
                  <small class="text-muted label">
                    <box-icon name="right-arrow-alt" size="xs" color="#797575"></box-icon>
                    Page {{ step }} of 2</small
                  >
                </div>
                <div class="card-body" :class="{ 'registration-card': formType == 'cta' }">
                  <!-- Student  -->
                  <div class="row g-3" v-if="registration.role == 'student'">
                    <div class="col-md-12">
                      <small class="text-muted label">
                        <box-icon name="school" type="solid" size="xs" color="#797575"></box-icon>
                        Which school are you from? <span class="text-danger">*</span>
                      </small>
                      <School
                        :data="registration.school_id"
                        @check="checkComponent"
                        @new="newData"
                      ></School>
                      <small class="text-danger error" v-if="shouldShowError('school_id')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.school_id.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                    <div class="col-md-12">
                      <small class="text-muted label">
                        <box-icon
                          name="graduation"
                          type="solid"
                          size="xs"
                          color="#797575"
                        ></box-icon>
                        When do you expect to graduate high school?
                        <span class="text-danger">*</span>
                      </small>
                      <GraduationYear
                        :data="registration.graduation_year"
                        @check="checkComponent"
                      ></GraduationYear>
                      <small class="text-danger error" v-if="shouldShowError('graduation_year')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.graduation_year.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                    <div class="col-md-12">
                      <small class="text-muted label">
                        <box-icon name="flag-alt" type="solid" size="xs" color="#797575"></box-icon>
                        Which country are you thinking of studying in?
                        <span class="text-danger">*</span>
                      </small>
                      <Country
                        :data="registration.destination_country"
                        @check="checkComponent"
                      ></Country>
                      <small
                        class="text-danger error"
                        v-if="shouldShowError('destination_country')"
                      >
                        {{ validate.destination_country.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                  </div>

                  <!-- Parent  -->
                  <div class="row g-3" v-if="registration.role == 'parent'">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center gap-3">
                          <small class="text-muted label">
                            <box-icon name="child" size="15px" color="#797575"></box-icon>
                            <strong>Do you have a child?</strong>
                          </small>

                          <div class="form-check form-switch mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="haveChild"
                              v-model="registration.have_child"
                              :checked="registration.have_child"
                            />
                            <label class="form-check-label" for="haveChild"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12" v-if="registration.have_child">
                      <div class="row g-3">
                        <div class="col-md-4">
                          <small class="text-muted label">
                            <box-icon name="user" size="xs" color="#797575"></box-icon>
                            Your child fullname? <span class="text-danger">*</span>
                          </small>
                          <input
                            type="text"
                            v-model="registration.secondary_name"
                            class="form-control"
                            :class="{
                              'is-invalid': shouldShowError('secondary_name'),
                              'is-valid':
                                !shouldShowError('secondary_name') && registration.secondary_name
                            }"
                            @input="touchField('secondary_name')"
                          />
                          <small class="text-danger error" v-if="shouldShowError('secondary_name')">
                            <box-icon
                              name="info-circle"
                              animation="tada"
                              size="12px"
                              color="#d21414"
                              className="me-1"
                            ></box-icon>
                            {{ validate.secondary_name.$silentErrors[0]?.$message }}
                          </small>
                        </div>
                        <div class="col-md-4">
                          <small class="text-muted label">
                            <box-icon name="envelope" size="xs" color="#797575"></box-icon>
                            Your child email?
                          </small>
                          <input
                            type="text"
                            v-model="registration.secondary_email"
                            class="form-control"
                            :class="{
                              'is-invalid': shouldShowError('secondary_email'),
                              'is-valid':
                                !shouldShowError('secondary_email') && registration.secondary_email
                            }"
                            @input="touchField('secondary_email')"
                          />
                          <small
                            class="text-danger error"
                            v-if="shouldShowError('secondary_email')"
                          >
                            {{ validate.secondary_email.$silentErrors[0]?.$message }}
                          </small>
                        </div>
                        <div class="col-md-4">
                          <small class="text-muted label">
                            <box-icon name="phone" size="xs" color="#797575"></box-icon>
                            Your child phone number?
                          </small>
                          <input
                            type="tel"
                            v-model="registration.secondary_phone"
                            class="form-control"
                            :class="{
                              'is-invalid': shouldShowError('secondary_phone'),
                              'is-valid':
                                !shouldShowError('secondary_phone') && registration.secondary_phone
                            }"
                            @input="touchField('secondary_phone')"
                          />
                          <small
                            class="text-danger error"
                            v-if="shouldShowError('secondary_phone')"
                          >
                            {{ validate.secondary_phone.$silentErrors[0]?.$message }}
                          </small>
                        </div>
                        <div class="col-md-12">
                          <small class="text-muted label">
                            <box-icon
                              name="school"
                              type="solid"
                              size="xs"
                              color="#797575"
                            ></box-icon>
                            What school does your child go to? <span class="text-danger">*</span>
                          </small>
                          <School
                            :data="registration.school_id"
                            @check="checkComponent"
                            @new="newData"
                          ></School>
                          <small class="text-danger error" v-if="shouldShowError('school_id')">
                            <box-icon
                              name="info-circle"
                              animation="tada"
                              size="12px"
                              color="#d21414"
                              className="me-1"
                            ></box-icon>
                            {{ validate.school_id.$silentErrors[0]?.$message }}
                          </small>
                        </div>
                        <div class="col-md-12">
                          <small class="text-muted label">
                            <box-icon
                              name="graduation"
                              type="solid"
                              size="xs"
                              color="#797575"
                            ></box-icon>
                            When do you expect your child to graduate high school?
                            <span class="text-danger">*</span>
                          </small>
                          <GraduationYear
                            :data="registration.graduation_year"
                            @check="checkComponent"
                          ></GraduationYear>
                          <small
                            class="text-danger error"
                            v-if="shouldShowError('graduation_year')"
                          >
                            {{ validate.graduation_year.$silentErrors[0]?.$message }}
                          </small>
                        </div>
                        <div class="col-md-12">
                          <small class="text-muted label">
                            <box-icon
                              name="flag-alt"
                              type="solid"
                              size="xs"
                              color="#797575"
                            ></box-icon>
                            Which country does your child interest in studying abroad?
                            <span class="text-danger">*</span>
                          </small>
                          <Country
                            :data="registration.destination_country"
                            @check="checkComponent"
                          ></Country>
                          <small
                            class="text-danger error"
                            v-if="shouldShowError('destination_country')"
                          >
                            {{ validate.destination_country.$silentErrors[0]?.$message }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Teacher  -->
                  <div class="row g-3" v-if="registration.role == 'teacher/counsellor'">
                    <div class="col-md-12">
                      <small class="text-muted label">
                        <box-icon name="school" type="solid" size="xs" color="#797575"></box-icon>
                        Which school are you from? <span class="text-danger">*</span>
                      </small>
                      <School
                        :data="registration.school_id"
                        @check="checkComponent"
                        @new="newData"
                      ></School>
                      <small class="text-danger error" v-if="shouldShowError('school_id')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.school_id.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div :class="status == 'ots' ? 'col-md-9' : 'col-md-12'">
                      <small class="text-muted label">
                        <box-icon name="link" size="xs" color="#797575"></box-icon>
                        I know this event from
                        <span class="text-danger">*</span>
                      </small>
                      <LeadSource
                        :data="registration.lead_source_id"
                        @check="checkComponent"
                      ></LeadSource>
                      <small class="text-danger error" v-if="shouldShowError('lead_source_id')">
                        <box-icon
                          name="info-circle"
                          animation="tada"
                          size="12px"
                          color="#d21414"
                          className="me-1"
                        ></box-icon>
                        {{ validate.lead_source_id.$silentErrors[0]?.$message }}
                      </small>
                    </div>
                    <div class="col-md-3" v-if="status == 'ots'">
                      <small class="text-muted label">
                        <box-icon name="group" type="solid" size="xs" color="#797575"></box-icon>
                        Number of Party
                        <span class="text-danger">*</span>
                      </small>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        v-model="registration.attend_party"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <button
                    class="btn btn-sm btn-warning rounded-pill px-3"
                    @click="step = 1"
                    :disabled="loading"
                  >
                    <font-awesome-icon icon="fa-solid fa-arrow-left" class="me-2" />
                    Back
                  </button>
                  <button
                    class="btn btn-sm btn-primary rounded-pill px-3"
                    @click="nextProcess"
                    :disabled="loading"
                  >
                    {{ loading ? 'Waiting' : 'Submit' }}
                    <font-awesome-icon
                      :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
                      class="ms-2"
                      :pulse="loading"
                    />
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
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import ApiService from '@/services/ApiService'
import ClientEventService from '@/services/ClientEventService'
import { showNotif } from '@/helper/notification'
import School from '../component/School.vue'
import LeadSource from '../component/LeadSource.vue'
import Country from '../component/Country.vue'
import GraduationYear from '../component/GraduationYear.vue'
import router from '@/router'

export default defineComponent({
  name: 'form-event',
  props: {
    formType: String,
    eventId: String,
    eventType: String,
    status: String,
    attendStatus: String,
    type: String
  },
  components: {
    School,
    LeadSource,
    Country,
    GraduationYear
  },
  setup(props) {
    const progress = ref(null)
    const step = ref(1)
    const loading = ref(false)
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
      attend_party: 1,
      event_type: '',
      status: 'PR',
      referral: '',
      client_type: '',
      have_child: false
    })
    const errors = ref()
    const event = ref()
    const rules = computed(() => ({
      fullname: {
        required,
        minLength: minLength(3)
      },
      mail: {
        required,
        email
      },
      phone: {
        required,
        minLength: minLength(10)
      },
      role: {
        required
      },
      secondary_name: {
        required
      },
      secondary_email: {
        email
      },
      secondary_phone: {
        minLength: minLength(5)
      },
      school_id: {
        required
      },
      graduation_year: {
        required
      },
      destination_country: {
        required
      },
      scholarship: {
        required
      },
      lead_source_id: {
        required
      }
    }))

    const scholarship_list = ref([
      { value: 'Y', label: 'Yes' },
      { value: 'N', label: 'No' }
    ])

    const checkComponent = (data = null) => {
      touchField(data?.key)
      registration.value[data.key] = data?.value
      checkProgress()
    }

    const newData = (data) => {
      registration.value[data?.key] = data?.value
    }

    // Validasi
    const section_1_rule = ['fullname', 'mail', 'phone', 'role']
    const student_rule = [
      'school_id',
      'graduation_year',
      'destination_country',
      'scholarship',
      'lead_source_id'
    ]
    const parent_child_rule = [
      'secondary_name',
      'school_id',
      'graduation_year',
      'destination_country',
      'scholarship',
      'lead_source_id'
    ]
    const parent_not_child_rule = ['lead_source_id']
    const teacher_rule = ['school_id', 'lead_source_id']
    const validate = useVuelidate(rules, registration)

    const touchField = (field) => {
      validate.value[field].$touch()
      if (field == 'phone' || field == 'secondary_phone') {
        acceptNumber(field)
      }

      checkProgress()
    }

    const checkRole = () => {
      if (registration.value.role == 'parent') {
        registration.value.have_child = true
      } else {
        registration.value.secondary_name = ''
        registration.value.secondary_email = ''
        registration.value.secondary_phone = ''
        registration.value.have_child = false
      }
    }

    const shouldShowError = (field) => {
      return validate.value[field].$error
    }

    const checkingValidation = (array) => {
      let checking = []
      array.forEach((element) => {
        validate.value[element].$validate()
        if (!validate.value[element].$invalid) {
          checking.push(true)
        } else {
          checking.push(false)
        }
      })

      return !checking.includes(false)
    }

    const acceptNumber = (item) => {
      const phoneNumber = registration.value[item].toString()
      const formattedNumber = phoneNumber.replace(/(\d{4})(\d{4})(\d{2,4})/, '$1-$2-$3')
      registration.value[item] = formattedNumber
    }

    // progress bar
    const checkProgress = () => {
      const progress_array = []
      for (let index = 0; index < section_1_rule.length; index++) {
        let value = registration.value[section_1_rule[index]]

        if (value) {
          if (shouldShowError(section_1_rule[index])) {
            progress_array.push(0)
          } else {
            progress_array.push(50 / section_1_rule.length, 0)
          }
        } else {
          progress_array.push(0)
        }
      }

      if (step.value == 2) {
        let input_array = []
        switch (registration.value.role) {
          case 'parent':
            if (registration.value.have_child) {
              input_array = parent_child_rule
            } else {
              input_array = parent_not_child_rule
            }
            break
          case 'teacher/counsellor':
            input_array = teacher_rule
            break
          case 'student':
            input_array = student_rule
            break
          default:
            break
        }

        for (let index = 0; index < input_array.length; index++) {
          let value = registration.value[input_array[index]]

          if (value) {
            if (shouldShowError(input_array[index])) {
              progress_array.push(0)
            } else {
              progress_array.push(50 / input_array.length, 0)
            }
          } else {
            progress_array.push(0)
          }
        }
      }

      progress.value = progress_array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
    }

    const nextAdditional = () => {
      checkProgress()

      loading.value = true
      const check = checkingValidation(section_1_rule)
      if (check) {
        step.value = 2
      }

      setTimeout(() => {
        loading.value = false
      }, 500)
    }

    const nextProcess = () => {
      const role = registration.value.role
      var validate = false

      switch (role) {
        case 'parent':
          if (registration.value.have_child) {
            validate = checkingValidation(parent_child_rule)
          } else {
            validate = checkingValidation(parent_not_child_rule)
          }
          break

        case 'teacher/counsellor':
          validate = checkingValidation(teacher_rule)
          break

        case 'student':
          validate = checkingValidation(student_rule)
          break

        default:
          break
      }

      if (validate) {
        submit()
      }
    }

    const submit = async () => {
      loading.value = true
      const endpoint = 'v1/register/event'
      try {
        const res = await ApiService.post(endpoint, registration.value)
        if (!res.success) {
          errors.value = res.error
          showNotif(
            'error',
            res.message ? res.message : 'Please check errors by clicking the bottom right button',
            'bottom-start'
          )
        } else {
          showNotif('success', res.message, 'bottom-start')
          setTimeout(() => {
            ClientEventService.saveClientEvent(res)

            router.push({
              name: 'thanks-event',
              params: {
                status: registration.value.status == 'PR' ? 'pra-reg' : 'ots',
                type: props.type == 'onsite' ? 'onsite' : 'self'
              }
            })
            reset()
          }, 2000)
        }
        loading.value = false
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    const getEvent = async () => {
      const endpoint = 'v1/event/' + registration.value.event_id
      try {
        const res = await ApiService.get(endpoint)
        if (res.success) {
          event.value = res.data
        } else {
          showNotif('error', res.message)
          setTimeout(() => {
            router.push({ name: 'NotFound' })
          }, 2000)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const loadGetParameter = () => {
      registration.value.event_id = props?.eventId
      registration.value.event_type = props.eventType ? props?.eventType : null
      registration.value.status = props.status ? props?.status?.toUpperCase() : 'PR'
      registration.value.attend_status = props.attendStatus ? props?.attendStatus : null
    }

    const reset = () => {
      registration.value.role = 'student'
      registration.value.fullname = ''
      registration.value.mail = ''
      registration.value.phone = ''
      registration.value.secondary_name = ''
      registration.value.secondary_email = ''
      registration.value.secondary_phone = ''
      registration.value.school_id = ''
      registration.value.other_school = ''
      registration.value.graduation_year = ''
      registration.value.destination_country = []
      registration.value.scholarship = 'N'
      registration.value.lead_source_id = ''
      registration.value.event_id = ''
      registration.value.attend_status = ''
      registration.value.attend_party = ''
      registration.value.event_type = ''
      registration.value.status = 'PR'
      registration.value.referral = ''
      registration.value.client_type = ''
      registration.value.have_child = false
    }

    onMounted(() => {
      loadGetParameter()
      getEvent()
    })

    return {
      step,
      loading,
      errors,
      progress,
      registration,
      scholarship_list,
      rules,
      validate,
      event,
      checkRole,
      checkComponent,
      newData,
      touchField,
      shouldShowError,
      nextAdditional,
      nextProcess,
      submit,
      getEvent
    }
  }
})
</script>
