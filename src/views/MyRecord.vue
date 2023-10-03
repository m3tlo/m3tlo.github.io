<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>
      <my-loader v-if="loading" />
      <p v-else-if="!categories.length" class="center">Категорий нет</p>
      <form class="form" @submit.prevent="submitHandler" v-else >
        <div class="input-field">
          <select ref="select" v-model="category">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
          />
          <label for="amount">Сумма</label>
          <span
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.minValue"
          >
            Минимальное значение {{ $v.amount.$params.minValue.min }}
          </span>
        </div>
        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model="description"
            :class="{
              invalid: $v.description.$dirty && !$v.description.required,
            }"
          />
          <label for="description">Описание</label>
          <span
            class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required"
          >
            Введите описание
          </span>
        </div>

        <button class="btn  waves-light" type="submit">
          Создать
          <i class="fa-solid fa-share right"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import M from 'materialize-css';
import { mapGetters } from 'vuex';
import MyLoader from '../components/app/MyLoader.vue';

export default {
  components: { MyLoader },
  name: 'MyRecord',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    this.categories = this.info.categories
    // this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            description: this.description,
            amount: this.amount,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', { bill });
          this.$message('Запись успешно создана');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})  `
        );
      }
    },
  },
};
</script>
