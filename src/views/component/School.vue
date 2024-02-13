<template>
  <div>
    <v-select
      v-model="selected_data"
      :options="school_list"
      :reduce="(school_list) => school_list.sch_id"
      label="sch_name"
      @option:selected="selectData"
      :clearable="false"
      placeholder="Select the value"
      :loading="loading"
    />
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

    const getSchool = async (alias = null) => {
      loading.value = true
      const endpoint = alias ? 'instance/school/' + alias : 'instance/school/'
      try {
        loading.value = false
        const res = await ApiService.get(endpoint)
        school_list.value = res.data
        selected_data.value = props.data
      } catch (error) {
        loading.value = false
        console.error(error)
      }
    }

    const selectData = () => {
      emit('check', {
        key: 'school_id',
        value: selected_data.value
      })
    }

    onMounted(() => {
      getSchool()
    })

    return {
      loading,
      selected_data,
      school_list,
      selectData
    }
  }
})
</script>
