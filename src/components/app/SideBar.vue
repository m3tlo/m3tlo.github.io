<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to='link.url'
      :exact="link.exact"
      tag="li"
      active-class="active"
      
    >
      <a href="#" class=" pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
    props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/',exact:true, },
      { title: 'История', url: '/history', },
      { title: 'Планирование', url: '/planning', },
      { title: 'Новая запись', url: '/record', },
      { title: 'Категории', url: '/categories', },
    ],
  }),
};
</script>
