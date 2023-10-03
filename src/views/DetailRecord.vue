<template>
  <div class="app-page">
    <my-loader v-if="loading"/>
    <div v-else>
      <div >
        <div class="breadcrumb-wrap">
          <a href="/history" class="breadcrumb">История</a>
          <i class="fa-solid fa-chevron-right"></i>
          <a class="breadcrumb"> Расход </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card red">
              <div class="card-content white-text">
                <p>Описание: {{ record.description }}</p>
                <p>Сумма: {{ record.amount | currency }}</p>
                <p>Категория: {{ record.categoryName }}</p>

                <small>{{record.date}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyLoader from '@/components/app/MyLoader.vue'
import { mapGetters } from 'vuex';

export default {
  components: { MyLoader },
  name: 'DetailRecord',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    // eslint-disable-next-line
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    
    this.record = {
      ...record,
      categoryName: category.title,
    }
    console.log(category, record, record.categoryId)
    this.loading = false

  },
  computed: {
    ...mapGetters(['info']),
  },
}
</script>

<style scoped>
.breadcrumb:before {
	content: none;

}
.breadcrumb{
  margin: 0 5px;
}
</style>
