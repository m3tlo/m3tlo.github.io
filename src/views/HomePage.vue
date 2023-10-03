<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button @click="refresh" class="btn  waves-light btn-small">
          <i class="fa-solid fa-rotate-right" ></i>
        </button>
      </div>
      <my-loader v-if="loading" />
      <div class="row" v-else>
        <HomeBill :rates="currency.rates" />

        <HomeCurrency :rates="currency.rates" :date="currency.date" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';
import MyLoader from '../components/app/MyLoader.vue';

export default {
  name: 'HomePage',
  components: {
    HomeBill,
    HomeCurrency,
    MyLoader,
  },
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
};
</script>
