<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option 
            v-for="c in categories" 
            :key="c.id" 
            :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальный лимит {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn  waves-light" type="submit">
          Обновить
          <i class="fa-solid fa-share right"></i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators';
import M from 'materialize-css';

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  watch: {
    current(catID) {
      const { title, limit } = this.categories.find((c) => c.id === catID);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        }
        // eslint-disable-next-line
        const category = await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория изменена');
        this.$emit('updated', categoryData)
       
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
