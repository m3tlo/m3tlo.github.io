<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      <div class="chart" ref="Pie">
        <Pie :chart-data="chartData" id="my-chart-id"  />
      </div>

      <my-loader v-if="loading" />

      <p class="center" v-else-if="!records.length">Записей пока нет</p>

      <section v-else>
        <history-table :records="items" />
        <MyPaginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          
        />
      </section>
    </div>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from '@/components/HistoryTable';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { mapGetters } from 'vuex';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'MyHistory',
  metaInfo() {
    return {
      title: this.$title('Menu_History'),
    };
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    this.records = await this.info.records;
    const categories = await this.info.categories;

    // this.categories = await this.$store.dispatch('fetchCategories')
    // const records = await this.$store.dispatch('fetchRecords');
    this.setup(categories);

    this.loading = false;
    console.log(this.records);
  },

  computed: {
    ...mapGetters(['info']),
    chartData() {
      const categories = this.info.categories;
      return {
        labels: categories.map((cat) => cat.title),
        datasets: [
          {
            label: 'Расходы по категориям',
            data: categories.map((cat) => {
              return this.records.reduce((total, record) => {
                if (record.categoryId === cat.id && record.type === 'outcome') {
                  total += +record.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
  },

  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Доход' : 'Расход',
          };
        })
      );
    },
  },
  components: {
    HistoryTable,
    Pie,
  },
};
</script>

<style scoped>
body {
  overflow: hidden;
}
.chart {
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart > div {
  width: 40%;
}
</style>
