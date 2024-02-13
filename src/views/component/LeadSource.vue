<template>
  <div>
    <v-select
      v-model="selected_data"
      :options="lead_list"
      :reduce="(lead_list) => lead_list.lead_id"
      label="lead"
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
  name: 'lead-input',
  props: {
    data: String
  },
  setup(props, { emit }) {
    const loading = ref(false)
    const selected_data = ref()
    const lead_list = ref()

    const getLeadSource = async () => {
      loading.value = true
      const endpoint = 'v1/get/leads'
      try {
        loading.value = false
        const res = await ApiService.get(endpoint)
        lead_list.value = res.data
        selected_data.value = props.data
      } catch (error) {
        loading.value = false
        console.error(error)
      }
    }

    const selectData = () => {
      emit('check', {
        key: 'lead_source_id',
        value: selected_data.value
      })
    }

    onMounted(() => {
      getLeadSource()
    })

    return {
      loading,
      selected_data,
      lead_list,
      selectData
    }
  }
})
</script>
  