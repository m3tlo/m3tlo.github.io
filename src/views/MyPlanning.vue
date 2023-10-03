<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ info.bill | currency('RUB') }}</h4>
      </div>
      <my-loader v-if="loading" />
      <p v-else-if="!categories.length" class="center">Категорий нет</p>

      <section v-else>
        <div v-for="cat in categories" :key="cat.id">
          <p>
            <strong>{{ cat.title }}:</strong>
            {{ cat.spend | currency }} из {{ cat.limit | currency }}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            <div
              class="determinate"
              :style="{ width: cat.progressPercent + '%' }"
              :class="[cat.progressColor]"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';

export default {
  name: 'MyPlanning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  async mounted() {
    // this.categories = this.info.categories

    // const records = this.info.records
    this.$store.getters.info.bill

    this.categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords');
    console.log(this.categories, records)

    this.categories = this.categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на': 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressColor,
        progressPercent,
        spend,
        tooltip,
      };
    });
    this.loading = false;

  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {},
};
</script>
