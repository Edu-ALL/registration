<template>
  <v-card class="shadow mx-md-auto mx-3 m-2" max-width="800" border flat>
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
    <div class="bg-grey py-3">
      <h5 class="text-center md:text-lg">
        <b>{{ title ? title : 'Let us know you better by filling out this form!' }}</b>
      </h5>
    </div>
    <v-progress-linear v-model="progress" color="primary"></v-progress-linear>

    <v-card-text class="text-medium-emphasis pa-6">
      <v-form ref="form_program" @submit.prevent>
        <v-row justify="center">
          <v-col cols="12" md="4" class="-mt-10">
            <v-text-field
              density="compact"
              ref="fullname"
              type="text"
              variant="underlined"
              :rules="rules.required"
              required
              v-model="registration.fullname"
              @change="checkProgress"
            >
              <template v-slot:label>Full Name <span class="text-danger">*</span></template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              density="compact"
              ref="child_name"
              label="Child Name"
              type="text"
              variant="underlined"
              :rules="rules.required"
              v-model="registration.secondary_name"
              @change="checkProgress"
              required
            >
              <template v-slot:label>Child Name <span class="text-danger">*</span></template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              density="compact"
              ref="email"
              type="email"
              variant="underlined"
              :rules="(rules.required, rules.email)"
              v-model="registration.mail"
              @change="checkProgress"
              required
            >
              <template v-slot:label>Email <span class="text-danger">*</span></template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              ref="phone"
              density="compact"
              type="tel"
              variant="underlined"
              v-model="registration.phone"
              :rules="rules.required"
              required
              @change="checkProgress"
              @input="touchField('phone')"
            >
              <template v-slot:label>Phone Number <span class="text-danger">*</span></template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              density="compact"
              ref="other_school"
              type="text"
              variant="underlined"
              :rules="rules.required"
              v-model="registration.other_school"
              @change="checkProgress"
              required
            >
              <template v-slot:label>School Name <span class="text-danger">*</span></template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              density="compact"
              chips
              label="Graduation Year"
              :items="graduation_list"
              variant="underlined"
              :rules="rules.required"
              v-model="registration.graduation_year"
              @update:modelValue="checkProgress"
            >
              <template v-slot:label>Graduation Year <span class="text-danger">*</span></template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-btn
          :disabled="loading"
          :loading="loading"
          block
          variant="elevated"
          color="primary"
          type="submit"
          class="mt-5"
          @click="process"
        >
          Submit</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import ApiService from '@/services/ApiService'
import ClientProgramService from '@/services/ClientProgramService'
import { showNotif } from '@/helper/notification'
import { rules } from '@/helper/rules'
import router from '@/router'

export default defineComponent({
  name: 'form-program',
  props: {
    programId: String,
    leadId: String,
    title: String
  },
  setup(props) {
    const progress = ref(0)
    const loading = ref(false)
    const registration = ref({
      role: 'parent',
      fullname: null,
      mail: null,
      phone: null,
      secondary_name: null,
      secondary_mail: null,
      secondary_phone: null,
      school_id: 'new',
      other_school: null,
      graduation_year: null,
      interest_prog: props.programId ? props.programId : 'AAUP',
      destination_country: [],
      lead_id: props.leadId ? props.leadId : 'LS001'
    })

    const errors = ref()
    const graduation_list = ref()
    const selected_data = ref()
    const form_program = ref()

    // validasi
    const student_rule = ref(['role', 'fullname', 'mail', 'phone', 'graduation_year'])
    const parent_rule = ref([
      'role',
      'fullname',
      'mail',
      'phone',
      'secondary_name',
      'graduation_year'
    ])

    const newData = (data) => {
      registration.value[data?.key] = data?.value
    }

    const touchField = (field) => {
      // registration.value[field].$touch();
      if (field == 'phone' || field == 'secondary_phone') {
        acceptNumber(field)
      }
    }

    const acceptNumber = (item) => {
      const phoneNumber = registration.value[item].toString()
      const formattedNumber = phoneNumber.replace(/(\d{4})(\d{4})(\d{2,4})/, '$1-$2-$3')
      registration.value[item] = formattedNumber
    }

    const setGraduation = async () => {
      const currentYear = new Date().getFullYear()
      const data = []
      for (let i = currentYear; i <= currentYear + 6; i++) {
        data.push(i.toString())
      }
      graduation_list.value = data
      selected_data.value = props.data
    }

    const checkProgress = () => {
      var section = registration.value.role == 'student' ? student_rule.value : parent_rule.value

      console.log(section)

      var index = section.indexOf('other_school')
      if (registration.value.school_id == 'new') {
        if (index <= -1) {
          section.push('other_school')
        }
      } else {
        if (index > -1) {
          section.splice(index, 1)
        }
      }

      const progress_array = []
      for (let index = 0; index < section.length; index++) {
        let value = registration.value[section[index]]
        if (value == null || value == '') {
          progress_array.push(0)
        } else {
          progress_array.push(100 / section.length)
        }
      }

      progress.value = progress_array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
    }

    const loadGetParameter = () => {
      registration.value.interest_prog = props?.programId
    }

    const reset = () => {
      registration.value.role = 'parent'
      registration.value.fullname = ''
      registration.value.mail = ''
      registration.value.phone = ''
      registration.value.secondary_name = ''
      registration.value.secondary_mail = ''
      registration.value.secondary_phone = ''
      registration.value.school_id = 'new'
      registration.value.other_school = ''
      registration.value.graduation_year = ''
      ;(registration.value.interest_prog = props.programId ? props.programId : 'AAUP'),
        (registration.value.destination_country = []),
        (registration.value.lead_id = props.leadId ? props.leadId : 'LS001')
    }

    const process = () => {
      submit()
    }

    const submit = async () => {
      const { valid } = await form_program.value.validate()
      if (valid) {
        window.parent.postMessage('submitButtonClicked', '*')
        loading.value = true
        const endpoint = 'v1/register/public'

        try {
          const res = await ApiService.post(endpoint, registration.value)
          if (!res.success) {
            errors.value = res.error
            console.log(errors.value)
            showNotif(
              'error',
              res.message ? res.message : 'Please check errors by clicking the bottom right button',
              'bottom-start'
            )
          } else {
            ClientProgramService.saveClientProgram(res)
            reset()
            router.push({
              name: 'thanks-program'
            })
          }
          loading.value = false
        } catch (error) {
          loading.value = false
          console.log(error)

          showNotif(
            'error',
            'Something went wrong while processing the data. Please try again or contact the administrator.',
            'bottom-start'
          )
        }
      }
    }

    const checkProgramAndLead = () => {
      if (props.leadId) {
        registration.value.lead_id = props.leadId
      }

      if (!props.programId) {
        router.push({ name: 'NotFound' })
      }
    }

    onMounted(() => {
      loadGetParameter()
      setGraduation()
      checkProgramAndLead()
      // SetInterestProgs();
    })

    return {
      loading,
      errors,
      registration,
      graduation_list,
      newData,
      process,
      submit,
      touchField,
      rules,
      form_program,
      student_rule,
      parent_rule,
      progress,
      checkProgress
    }
  }
})
</script>
<style>
.v-selection-control__input input {
  opacity: 1 !important;
  width: 50% !important;
  /* height: 70% !important; */
}
</style>
