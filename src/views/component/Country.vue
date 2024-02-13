<template>
  <div>
    <v-select
      v-model="selected_data"
      :options="country_list"
      :reduce="(country_list) => country_list.id"
      @option:selected="selectData"
      @option:deselected="selectData"
      label="country"
      placeholder="Select the value"
      :loading="loading"
      multiple
    />
  </div>
</template>
    
    <script>
import ApiService from '@/services/ApiService'
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: 'country-input',
  props: {
    data: Object
  },
  setup(props, { emit }) {
    const loading = ref(false)
    const selected_data = ref()
    const country_list = ref()

    const getCountry = async () => {
      loading.value = true
      const endpoint = 'v1/get/destination-country'
      try {
        loading.value = false
        const res = await ApiService.get(endpoint)
        country_list.value = res.data
        selected_data.value = props.data
      } catch (error) {
        loading.value = false
        console.error(error)
      }
    }

    const selectData = () => {
      emit('check', {
        key: 'destination_country',
        value: selected_data.value
      })
    }

    onMounted(() => {
      getCountry()
    })

    return {
      loading,
      selected_data,
      country_list,
      selectData
    }
  }
})
</script>
    