<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="">
        <q-img src="../../assets/logo.svg" alt="Logo" style="height: 36px; width: 36px" />
      </q-toolbar-title>

      <!-- <q-space /> -->
      <div class="row items-center">
        <div class="q-mr-sm">{{ userStore.user.name }}</div>
        <!-- <q-btn flat dense size="lg" align="left" class="btn-fixed-width"> Yang Neiva </q-btn> -->
        <q-btn round color="white" flat dense class="q-ml-auto" align="right">
          <q-avatar icon="account_circle" size="40px" class="bg-dark text-white"> </q-avatar>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/userStore';

export default defineComponent({
  name: 'AppToolbar',

  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
});
</script>
