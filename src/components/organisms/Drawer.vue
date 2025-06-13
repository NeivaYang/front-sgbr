<template>
  <q-drawer
    :model-value="true"
    side="left"
    overlay
    elevated
    show-if-above
    class="bg-dark text-white"
    persistent
  >
    <ListDrawer />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListDrawer from '../../components/molecules/ListDrawer.vue';

export default defineComponent({
  name: 'AppDrawer',
  components: {
    ListDrawer,
  },
});
</script>
