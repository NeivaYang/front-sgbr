<template>
  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    overlay
    elevated
    show-if-above
    class="bg-dark text-white"
  >
    <ListDrawer />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ListDrawer from '../../components/molecules/ListDrawer.vue';

export default defineComponent({
  name: 'AppDrawer',
  components: {
    ListDrawer,
  },
  setup() {
    const leftDrawerOpen = ref(true);

    return {
      leftDrawerOpen,
    };
  },
});
</script>
