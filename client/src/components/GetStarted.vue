<template>
  <div>
    <h1>I'm the M.O.O.D. tracker 9000.</h1>
    <p>I can help you track your mood through the whole year. <router-link to="/detail/mood">See whole year.</router-link></p>
    <DailyForm></DailyForm>
  </div>
</template>
<script>
import DailyForm from '@/components/DailyForm.vue'

export default {
  name: 'GetStarted',
    components: {
     DailyForm
  }
}
</script>
<style scoped>
</style>