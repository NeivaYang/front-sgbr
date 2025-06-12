<template>
  <q-list class="q-mt-xl">
    <!-- <q-item-label header> Essential Links </q-item-label> -->

    <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { EssentialLinkProps } from '../atoms/EssentialLink.vue';
import EssentialLink from '../../components/atoms/EssentialLink.vue';

export default defineComponent({
  name: 'ListDrawer',
  components: { EssentialLink },
  props: {
    linksList: {
      type: Array as () => EssentialLinkProps[],
      default: () => [
        {
          title: 'Home',
          icon: 'home',
          link: '/',
        },
        {
          title: 'Favoritos',
          icon: 'favorite',
          link: '/favorites',
        },
        {
          title: 'Categorias',
          icon: 'category',
          link: '/categories',
        },
        {
          title: 'Sobre',
          icon: 'info',
          link: '/about',
        },
      ],
    },
  },
});
</script>
