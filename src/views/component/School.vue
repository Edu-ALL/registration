<template>
  <div>
    <v-select
      v-model="selected_data"
      :options="school_list"
      :reduce="(school_list) => school_list.sch_id"
      label="sch_name"
      :clearable="false"
      :loading="loading"
      :taggable="true"
      placeholder="Select the value"
      @search="searchSchool"
      @option:selected="selectData"
    >
      <template #list-header v-if="school_list?.length == 0">
        <li class="text-muted text-center">Select the item below to add new a school</li>
      </template>
    </v-select>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: 'school-input',
  props: {
    data: String
  },
  setup(props, { emit }) {
    const loading = ref(false)
    const selected_data = ref()
    const school_list = ref()

    const getSchool = async () => {
      loading.value = true
      const endpoint = 'v1/school'
      try {
        const res = await ApiService.get(endpoint)
        school_list.value = res.data
        selected_data.value = props.data
        loading.value = false
      } catch (error) {
        loading.value = false
        console.error(error)
      }
    }

    const searchSchool = async (searchQuery) => {
      if (searchQuery) {
        loading.value = true
        const endpoint = 'v1/school?search=' + searchQuery
        try {
          const res = await ApiService.get(endpoint)
          school_list.value = res.data
          loading.value = false
        } catch (error) {
          console.error(error)
          loading.value = false
        }
      }
    }

    const selectData = (data) => {
      if (data.sch_id) {
        getSchool()

        emit('check', {
          key: 'school_id',
          value: selected_data.value
        })
      } else {
        emit('check', {
          key: 'school_id',
          value: 'new'
        })

        emit('new', {
          key: 'other_school',
          value: data.sch_name ? data.sch_name : data
        })
      }
    }

    onMounted(() => {
      getSchool()
    })

    return {
      loading,
      selected_data,
      school_list,
      getSchool,
      searchSchool,
      selectData
    }
  }
})
</script>
