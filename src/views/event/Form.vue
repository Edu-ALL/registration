<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="row justify-content-center align-items-stretch g-1">
          <div class="col-md-4 col-form" v-if="formType == 'cta'">
            <div
              class="card h-100 bg-form rounded-0 shadow"
              :style="'background: url(/public/img/' + bg_registration + ')'"
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
              <div class="card-body p-0 d-flex align-items-end justify-content-center">
                <div
                  class="w-100 d-flex align-items-center justify-content-center py-2"
                  style="background: #251b815b"
                >
                  <h5 class="text-white">Registration Name</h5>
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
                    <small class="text-muted"> Full Name <span class="text-danger">*</span> </small>
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
                      {{ validate.fullname.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                  <div class="col-md-4">
                    <small class="text-muted"> Email <span class="text-danger">*</span> </small>
                    <input
                      type="email"
                      v-model="registration.email"
                      class="form-control"
                      :class="{
                        'is-invalid': shouldShowError('email'),
                        'is-valid': !shouldShowError('email') && registration.email
                      }"
                      @input="touchField('email')"
                    />
                    <small class="text-danger error" v-if="shouldShowError('email')">
                      {{ validate.email.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                  <div class="col-md-4">
                    <small class="text-muted"> Phone <span class="text-danger">*</span> </small>
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
                      {{ validate.phone.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                  <div class="col-md-12 mt-3">
                    <label class="text-muted"
                      >You are a
                      <span class="text-danger">*</span>
                    </label>
                    <small class="text-danger error" v-if="shouldShowError('role')">
                      {{ validate.role.$silentErrors[0]?.$message }}
                    </small>
                    <div class="row g-3">
                      <div class="col">
                        <div class="role">
                          <img src="/img/student.avif" alt="student" />
                          <input
                            class="role-input"
                            type="radio"
                            name="role"
                            v-model="registration.role"
                            value="student"
                            id="studentRole"
                            @input="bg_registration = 'student.avif'"
                          />
                          <label class="role-label" for="studentRole"> Student </label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="role">
                          <img src="/img/parent.jpg" alt="parent" />
                          <input
                            class="role-input"
                            type="radio"
                            name="role"
                            id="parentRole"
                            v-model="registration.role"
                            value="parent"
                            @input="bg_registration = 'parent.jpg'"
                          />
                          <label class="role-label" for="parentRole"> Parent </label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="role">
                          <img src="/img/teacher.avif" alt="teacher" />
                          <input
                            class="role-input"
                            type="radio"
                            name="role"
                            id="teacherRole"
                            v-model="registration.role"
                            value="teacher"
                            @input="bg_registration = 'teacher.avif'"
                          />
                          <label class="role-label" for="teacherRole"> Teacher </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex align-items-center justify-content-end">
                <button class="btn btn-sm btn-primary rounded-pill" @click="nextAdditional">
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
                <small class="text-muted">Page {{ step }} of 2</small>
              </div>
              <div class="card-body" :class="{ 'registration-card': formType == 'cta' }">
                <!-- Student  -->
                <div class="row g-3" v-if="registration.role == 'student'">
                  <div class="col-md-12">
                    <small class="text-muted">
                      Which school are you from? <span class="text-danger">*</span>
                    </small>
                    <v-select
                      v-model="registration.school_id"
                      :options="['Canada', 'United States']"
                      placeholder="Select the value"
                      :on-change="touchField('school_id')"
                    />
                    <small class="text-danger error" v-if="shouldShowError('school_id')">
                      {{ validate.school_id.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                  <div class="col-md-12">
                    <small class="text-muted">
                      When do you expect to graduate? <span class="text-danger">*</span>
                    </small>
                    <input
                      type="text"
                      v-model="registration.graduation_year"
                      class="form-control"
                      :class="{
                        'is-invalid': shouldShowError('graduation_year'),
                        'is-valid':
                          !shouldShowError('graduation_year') && registration.graduation_year
                      }"
                      @input="touchField('graduation_year')"
                    />
                    <small class="text-danger error" v-if="shouldShowError('graduation_year')">
                      {{ validate.graduation_year.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                  <div class="col-md-12">
                    <small class="text-muted">
                      Are you eligible for a need-based scholarship?
                      <span class="text-danger">*</span>
                    </small>
                    <v-select
                      v-model="registration.scholarship"
                      :options="['Yes', 'No']"
                      placeholder="Select the value"
                      :on-change="touchField('scholarship')"
                    />
                    <small class="text-danger error" v-if="shouldShowError('scholarship')">
                      {{ validate.scholarship.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                  <div class="col-md-12">
                    <small class="text-muted">
                      Which country are you thinking of studying in?
                      <span class="text-danger">*</span>
                    </small>
                    <v-select
                      v-model="registration.destination_country"
                      :options="['Yes', 'No']"
                      placeholder="Select the value"
                      :on-change="touchField('destination_country')"
                    />
                    <small class="text-danger error" v-if="shouldShowError('destination_country')">
                      {{ validate.destination_country.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                </div>

                <!-- Parent  -->
                <div class="row g-3" v-if="registration.role == 'parent'">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-9">
                        <small class="text-muted">
                          <strong> Have you already child? </strong>
                        </small>
                      </div>
                      <div class="col-3 d-flex justify-content-end">
                        <div class="form-check form-switch">
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
                        <small class="text-muted">
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
                          {{ validate.secondary_name.$silentErrors[0]?.$message }}
                        </small>
                      </div>
                      <div class="col-md-4">
                        <small class="text-muted"> Your child email? </small>
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
                        <small class="text-danger error" v-if="shouldShowError('secondary_email')">
                          {{ validate.secondary_email.$silentErrors[0]?.$message }}
                        </small>
                      </div>
                      <div class="col-md-4">
                        <small class="text-muted"> Your child number? </small>
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
                        <small class="text-danger error" v-if="shouldShowError('secondary_phone')">
                          {{ validate.secondary_phone.$silentErrors[0]?.$message }}
                        </small>
                      </div>
                      <div class="col-md-12">
                        <small class="text-muted">
                          What school does your child go to? <span class="text-danger">*</span>
                        </small>
                        <v-select
                          v-model="registration.school_id"
                          :options="['Canada', 'United States']"
                          placeholder="Select the value"
                          :on-change="touchField('school_id')"
                        />
                        <small class="text-danger error" v-if="shouldShowError('school_id')">
                          {{ validate.school_id.$silentErrors[0]?.$message }}
                        </small>
                      </div>
                      <div class="col-md-12">
                        <small class="text-muted">
                          When do you expect your child to graduate?
                          <span class="text-danger">*</span>
                        </small>
                        <input
                          type="text"
                          v-model="registration.graduation_year"
                          class="form-control"
                          :class="{
                            'is-invalid': shouldShowError('graduation_year'),
                            'is-valid':
                              !shouldShowError('graduation_year') && registration.graduation_year
                          }"
                          @input="touchField('graduation_year')"
                        />
                        <small class="text-danger error" v-if="shouldShowError('graduation_year')">
                          {{ validate.graduation_year.$silentErrors[0]?.$message }}
                        </small>
                      </div>
                      <div class="col-md-12">
                        <small class="text-muted">
                          Are your child eligible for a need-based scholarship?
                          <span class="text-danger">*</span>
                        </small>
                        <v-select
                          v-model="registration.scholarship"
                          :options="['Yes', 'No']"
                          placeholder="Select the value"
                          :on-change="touchField('scholarship')"
                        />
                        <small class="text-danger error" v-if="shouldShowError('scholarship')">
                          {{ validate.scholarship.$silentErrors[0]?.$message }}
                        </small>
                      </div>
                      <div class="col-md-12">
                        <small class="text-muted">
                          Which country does your child interest in studying abroad?
                          <span class="text-danger">*</span>
                        </small>
                        <v-select
                          v-model="registration.destination_country"
                          :options="['Yes', 'No']"
                          placeholder="Select the value"
                          :on-change="touchField('destination_country')"
                          multiple
                        />
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
                <div class="row g-3" v-if="registration.role == 'teacher'">
                  <div class="col-md-12">
                    <small class="text-muted">
                      Which school are you from? <span class="text-danger">*</span>
                    </small>
                    <v-select
                      v-model="registration.school_id"
                      :options="['Canada', 'United States']"
                      placeholder="Select the value"
                      :on-change="touchField('school_id')"
                    />
                    <small class="text-danger error" v-if="shouldShowError('school_id')">
                      {{ validate.school_id.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <small class="text-muted">
                      I know this event from
                      <span class="text-danger">*</span>
                    </small>
                    <v-select
                      v-model="registration.lead_source_id"
                      :options="['Yes', 'No']"
                      placeholder="Select the value"
                      :on-change="touchField('lead_source_id')"
                    />
                    <small class="text-danger error" v-if="shouldShowError('lead_source_id')">
                      {{ validate.lead_source_id.$silentErrors[0]?.$message }}
                    </small>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <button class="btn btn-sm btn-warning rounded-pill" @click="step = 1">
                  <font-awesome-icon icon="fa-solid fa-arrow-left" class="me-2" />
                  Back
                </button>
                <button class="btn btn-sm btn-primary rounded-pill" @click="nextProcess">
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
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default defineComponent({
  name: 'form-event',
  props: {
    formType: String,
    eventId: String,
    eventType: String,
    status: String,
    attendStatus: String
  },
  setup(props) {
    const progress = ref(null)
    const step = ref(1)
    const loading = ref(false)
    const bg_registration = ref('bg.jpg')
    const registration = ref({
      role: 'student',
      user: '',
      fullname: '',
      email: '',
      phone: '',
      secondary_name: '',
      secondary_email: '',
      secondary_phone: '',
      school_id: '',
      other_school: '',
      graduation_year: '',
      destination_country: [],
      scholarship: '',
      lead_source_id: '',
      event_id: '',
      attend_status: '',
      attend_party: '',
      event_type: '',
      status: '',
      referral: '',
      client_type: '',
      have_child: true
    })
    const rules = computed(() => ({
      fullname: {
        required,
        minLength: minLength(3)
      },
      email: {
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

    const school_list = ref()
    const lead_source_list = ref()
    const destination_country_list = ref()

    const getSchool = (alias = null) => {
      const endpoint = alias ? '' : ''

      // console.log(endpoint)
    }

    const getLeadSource = () => {
      const endpoint = ''

      // console.log(endpoint)
    }

    const getCountry = () => {
      const endpoint = ''

      // console.log(endpoint)
    }

    const section_1_rule = ['fullname', 'email', 'phone', 'role']
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
          case 'teacher':
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

    const nextAdditional = () => {
      loading.value = true
      const check = checkingValidation(section_1_rule)
      if (check) {
        step.value = 2
        switch (registration.value.role) {
          case 'parent':
            bg_registration.value = 'parent.jpg'
            break
          case 'teacher':
            bg_registration.value = 'teacher.avif'
            break
          case 'student':
            bg_registration.value = 'student.avif'
            break

          default:
            break
        }
      }

      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    const nextProcess = () => {
      loading.value = true
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

        case 'teacher':
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

      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    const submit = () => {
      console.log(registration.value)
    }

    const loadGetParameter = () => {
      registration.value.event_id = props?.eventId
      registration.value.event_type = props?.eventType
      registration.value.status = props?.status
      registration.value.attend_status = props?.attendStatus
    }

    onMounted(() => {
      getSchool()
      getLeadSource()
      getCountry()
      loadGetParameter()
    })

    return {
      step,
      loading,
      progress,
      registration,
      school_list,
      lead_source_list,
      destination_country_list,
      rules,
      validate,
      bg_registration,
      touchField,
      shouldShowError,
      nextAdditional,
      nextProcess,
      submit
    }
  }
})
</script>
