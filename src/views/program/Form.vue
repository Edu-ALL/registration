<template>
  <v-card class="shadow mx-auto" max-width="800" border flat>
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
            <font-awesome-icon
              icon="fa-info"
              class="text-warning me-2"
            ></font-awesome-icon>
            {{ item[0] }}
          </li>
        </ul>
      </div>
    </div>
    <v-list-item class="bg-surface-light px-6 pt-2" height="100">
      <template v-slot:title
        ><h3 class="text-center">
          <b>Let us know you better by filling out this form!</b>
        </h3>
      </template>
    </v-list-item>
    <v-progress-linear v-model="progress" color="primary"></v-progress-linear>

    <v-card-text class="text-medium-emphasis pa-6">
      <v-form ref="form_program" @submit.prevent>
        <v-row justify="center">
          <v-col cols="12">
            <v-row justify="center">
              <v-col cols="12" md="4">
                <v-radio-group
                  inline
                  v-model="registration.role"
                  :rules="rules.required"
                  @update:modelValue="checkRole"
                >
                  <v-radio class="me-5" value="student" label="Student"></v-radio>
                  <v-radio class="ms-5" label="Parent" value="parent"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              ref="fullname"
              type="text"
              variant="solo"
              :rules="rules.required"
              required
              v-model="registration.fullname"
              @change="checkProgress"
            >
              <template v-slot:label
                >Full Name <span class="text-danger">*</span></template
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              ref="email"
              type="email"
              variant="solo"
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
              type="tel"
              variant="solo"
              v-model="registration.phone"
              :rules="rules.required"
              required
              @change="checkProgress"
              @input="touchField('phone')"
            >
              <template v-slot:label
                >Phone Number <span class="text-danger">*</span></template
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4" v-if="registration.role == 'parent'">
            <v-text-field
              ref="child_name"
              label="Child Name"
              type="text"
              variant="solo"
              :rules="rules.required"
              v-model="registration.secondary_name"
              @change="checkProgress"
              required
            >
              <template v-slot:label
                >Child Name <span class="text-danger">*</span></template
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4" v-if="registration.role == 'parent'">
            <v-text-field
              ref="child_mail"
              label="Child Email"
              type="text"
              variant="solo"
              v-model="registration.secondary_mail"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4" v-if="registration.role == 'parent'">
            <v-text-field
              ref="child_phone"
              label="Child Phone"
              type="text"
              variant="solo"
              v-model="registration.secondary_phone"
              @input="touchField('secondary_phone')"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" :md="registration.school_id == 'SCH-0301' ? '6' : '4'">
            <v-autocomplete
              chips
              :items="schools"
              item-title="sch_name"
              item-value="sch_id"
              variant="solo"
              :rules="rules.required"
              v-model="registration.school_id"
              @update:modelValue="checkProgress"
            >
              <template v-slot:label>School <span class="text-danger">*</span></template>
            </v-autocomplete>
          </v-col>
          <v-col v-if="registration.school_id == 'SCH-0301'" cols="12" md="6">
            <v-text-field
              ref="other_school"
              type="text"
              variant="solo"
              :rules="registration.school_id == 'SCH-0301' ? rules.required : ''"
              v-model="registration.other_school"
              @change="checkProgress"
              required
            >
              <template v-slot:label
                >Other School Name <span class="text-danger">*</span></template
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" :md="registration.school_id != 'SCH-0301' ? '4' : '6'">
            <v-autocomplete
              multiple
              chips
              :items="contries"
              item-title="country"
              item-value="id"
              variant="solo"
              :rules="rules.required"
              v-model="registration.destination_country"
              @update:modelValue="checkProgress"
            >
              <template v-slot:label>Country <span class="text-danger">*</span></template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" :md="registration.school_id != 'SCH-0301' ? '4' : '6'">
            <v-autocomplete
              chips
              label="Graduation Year"
              :items="graduation_list"
              variant="solo"
              :rules="rules.required"
              v-model="registration.graduation_year"
              @update:modelValue="checkProgress"
            >
              <template v-slot:label
                >Graduation Year <span class="text-danger">*</span></template
              >
            </v-autocomplete>
          </v-col>
          <!-- <v-col cols="12" lg="12" md="12" sm="12">
            <v-autocomplete
              chips
              :items="interest_progs"
              item-title="label"
              item-value="val"
              variant="solo"
              :rules="rules.required"
              v-model="registration.interest_prog"
              @update:modelValue="checkProgress"
            >
              <template v-slot:label
                >I would like to know more about
                <span class="text-danger">*</span></template
              >
            </v-autocomplete>
          </v-col> -->
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
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import ClientProgramService from "@/services/ClientProgramService";
import { showNotif } from "@/helper/notification";
import { rules } from "@/helper/rules";
import router from "@/router";

export default defineComponent({
  name: "form-program",
  props: {
    programId: String,
  },
  setup(props) {
    const progress = ref(0);
    const loading = ref(false);
    const registration = ref({
      role: "student",
      fullname: null,
      mail: null,
      phone: null,
      secondary_name: null,
      secondary_mail: null,
      secondary_phone: null,
      school_id: null,
      other_school: null,
      graduation_year: null,
      destination_country: [],
    });

    const errors = ref();
    const schools = ref();
    const contries = ref();
    const graduation_list = ref();
    const selected_data = ref();
    const interest_progs = ref();
    const form_program = ref();

    // validasi
    const student_rule = ref([
      "role",
      "fullname",
      "mail",
      "phone",
      "school_id",
      "graduation_year",
      "destination_country",
    ]);
    const parent_rule = ref([
      "role",
      "fullname",
      "mail",
      "phone",
      "secondary_name",
      "school_id",
      "graduation_year",
      "destination_country",
    ]);

    const newData = (data) => {
      registration.value[data?.key] = data?.value;
    };

    const checkRole = () => {
      checkProgress();
      if (registration.value.role == "parent") {
        registration.value.have_child = true;
      } else {
        registration.value.secondary_name = "";
        registration.value.secondary_mail = "";
        registration.value.secondary_phone = "";
        registration.value.have_child = false;
      }
    };

    const touchField = (field) => {
      // registration.value[field].$touch();
      if (field == "phone" || field == "secondary_phone") {
        acceptNumber(field);
      }
    };

    const acceptNumber = (item) => {
      const phoneNumber = registration.value[item].toString();
      const formattedNumber = phoneNumber.replace(/(\d{4})(\d{4})(\d{2,4})/, "$1-$2-$3");
      registration.value[item] = formattedNumber;
    };

    const getSchools = async () => {
      const endpoint = "v1/school";
      try {
        const res = await ApiService.get(endpoint);
        if (res.success) {
          schools.value = res.data;
        } else {
          showNotif("error", res.message);
          setTimeout(() => {
            router.push({ name: "NotFound" });
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getContries = async () => {
      const endpoint = "v1/get/destination-country";
      try {
        const res = await ApiService.get(endpoint);
        if (res.success) {
          contries.value = res.data;
        } else {
          showNotif("error", res.message);
          setTimeout(() => {
            router.push({ name: "NotFound" });
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const setGraduation = async () => {
      const currentYear = new Date().getFullYear();
      const data = [];
      for (let i = currentYear; i <= currentYear + 6; i++) {
        data.push(i.toString());
      }
      graduation_list.value = data;
      selected_data.value = props.data;
    };

    // const SetInterestProgs = async () => {
    //   let data = [];

    //   switch (registration.value.main_prog_id) {
    //     case "1":
    //       data = [
    //         { label: "Admission Mentoring & Scholarship Application", val: "AAUP" },
    //         { label: "University Application Essay", val: "AAUP" },
    //         { label: "Academic Tutoring", val: "ACADX" },
    //         { label: "CV & Personal Branding", val: "AAUP" },
    //         { label: "SAT & ACT", val: "SATPRIV" },
    //       ];

    //       interest_progs.value = data;
    //       break;
    //   }
    // };

    const checkProgress = () => {
      var section =
        registration.value.role == "student" ? student_rule.value : parent_rule.value;

      var index = section.indexOf("other_school");
      if (registration.value.school_id == "SCH-0301") {
        if (index <= -1) {
          section.push("other_school");
        }
      } else {
        if (index > -1) {
          section.splice(index, 1);
        }
      }

      const progress_array = [];
      for (let index = 0; index < section.length; index++) {
        let value = registration.value[section[index]];
        if (value == null || value == "") {
          progress_array.push(0);
        } else {
          progress_array.push(100 / section.length);
        }
      }

      progress.value = progress_array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    };

    const loadGetParameter = () => {
      registration.value.interest_prog = props?.programId;
    };

    const reset = () => {
      registration.value.role = "student";
      registration.value.fullname = "";
      registration.value.mail = "";
      registration.value.phone = "";
      registration.value.secondary_name = "";
      registration.value.secondary_mail = "";
      registration.value.secondary_phone = "";
      registration.value.school_id = "";
      registration.value.other_school = "";
      registration.value.graduation_year = "";
      registration.value.destination_country = [];
    };

    const process = () => {
      submit();
    };

    const submit = async () => {
      const { valid } = await form_program.value.validate();

      if (valid) {
        loading.value = true;
        const endpoint = "v1/register/public";

        console.log(registration.value);

        try {
          const res = await ApiService.post(endpoint, registration.value);
          if (!res.success) {
            errors.value = res.error;
            console.log(errors.value);
            showNotif(
              "error",
              res.message
                ? res.message
                : "Please check errors by clicking the bottom right button",
              "bottom-start"
            );
          } else {
            ClientProgramService.saveClientProgram(res);
            router.push({
              name: "thanks-program",
            });
          }
          loading.value = false;
        } catch (error) {
          loading.value = false;
          showNotif(
            "error",
            "Something went wrong while processing the data. Please try again or contact the administrator.",
            "bottom-start"
          );
        }
      }
    };

    onMounted(() => {
      loadGetParameter();
      getSchools();
      getContries();
      setGraduation();
      // SetInterestProgs();
    });

    return {
      loading,
      errors,
      registration,
      schools,
      contries,
      graduation_list,
      interest_progs,
      newData,
      checkRole,
      process,
      submit,
      touchField,
      rules,
      form_program,
      student_rule,
      parent_rule,
      progress,
      checkProgress,
    };
  },
});
</script>
<style>
.v-selection-control__input input {
  opacity: 1 !important;
  width: 50% !important;
  /* height: 70% !important; */
}
</style>
