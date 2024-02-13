<template>
  <div>
    <v-select
      v-model="selected_data"
      :options="graduation_list"
      @option:selected="selectData"
      :clearable="false"
      placeholder="Select the value"
      :loading="loading"
    />
  </div>
</template>
    
    <script>
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: 'lead-input',
  props: {
    data: String
  },
  setup(props, { emit }) {
    const loading = ref(false)
    const selected_data = ref()
    const graduation_list = ref()

    const setupGraduation = () => {
      const currentYear = new Date().getFullYear()
      const data = []
      for (let i = currentYear - 5; i <= currentYear + 10; i++) {
        data.push(i.toString())
      }
      graduation_list.value = data
      selected_data.value = props.data
    }

    const selectData = () => {
      emit('check', {
        key: 'graduation_year',
        value: selected_data.value
      })
    }

    onMounted(() => {
      setupGraduation()
    })

    return {
      loading,
      selected_data,
      graduation_list,
      selectData
    }
  }
})
</script>
    