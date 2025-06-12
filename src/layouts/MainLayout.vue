<template>
  <q-layout view="hHh lpR fFf">
    <AppToolbar :toggleLeftDrawer="toggleLeftDrawer" />
    <AppDrawer v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppDrawer from '../components/organisms/Drawer.vue';
import AppToolbar from '../components/organisms/Toollbar.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppDrawer,
    AppToolbar,
  },

  setup() {
    const leftDrawerOpen = ref(true);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
});
</script>
