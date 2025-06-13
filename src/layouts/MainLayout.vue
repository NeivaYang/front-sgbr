<template>
  <q-layout view="hHh lpR fFf">
    <AppToolbar />
    <AppDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppDrawer from '../components/organisms/Drawer.vue';
import AppToolbar from '../components/organisms/Toollbar.vue';
import { useUserStore } from '../stores/userStore';

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppDrawer,
    AppToolbar,
  },

  setup() {
    const userStore = useUserStore();

    // Exemplo de uso:
    userStore.setUser({
      name: 'Yang Araújo Neiva',
      about:
        'Meu nome é Yang Araújo Neiva, tenho 29 anos e sou desenvolvedor de software Full Stack',
    });

    return {
      userStore,
    };
  },
});
</script>
