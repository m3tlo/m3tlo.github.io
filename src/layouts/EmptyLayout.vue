<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>
<style src="../assets/fontawesome-free-6.4.2-web/css/all.css" ></style>

<script>
import messages from '@/utils/messages'
export default {
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    error(fbError){
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
}
</script>
