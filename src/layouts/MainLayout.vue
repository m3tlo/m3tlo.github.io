<template>
  <div class="app-main-layout">
    <NavBar
      @click="isOpen = !isOpen"
    />
    <SideBar
      v-model="isOpen"
    />

    <main 
      class="app-content"
      :class="{full: !isOpen}"
    >
      <router-view />
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать запись'">
        <i class="fa-solid fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>
<style src="../assets/fontawesome-free-6.4.2-web/css/all.css" ></style>
<script>
import NavBar from '@/components/app/NavBar.vue'
import SideBar from '@/components/app/SideBar.vue'


export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    NavBar,
    SideBar,
  },
}
</script>
