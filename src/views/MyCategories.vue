<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Категории</h3>
      </div>
      <section>
        <my-loader
          v-if="loading"
        />
        <div 
          class="row"
          v-else
        >
        <CategoryCreate
          @created="addNewCategory"
        />
          <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"

          />
          <p class="center" v-else>Категорий нет</p>
      </div>
      </section>
    </div>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'MyCategories',
  components: {
    CategoryEdit,
    CategoryCreate,
  },
  data: () => ({
    categories: [],
    loading: false,
    updateCount: 0
  }),
  async mounted() {
    // this.categories = this.$store.getters.info.categories
    
     this.categories = await this.$store.dispatch('fetchCategories')
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories)
    },
    updateCategories(category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      this.categories[index].limit = category.limit
      this.categories[index].title = category.title
      this.updateCount++

    }
  }
}
</script>
