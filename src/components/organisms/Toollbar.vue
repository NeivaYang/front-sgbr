<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
      <q-toolbar-title class="">
        <q-img src="../../assets/logo.svg" alt="Logo" style="height: 36px; width: 36px" />
      </q-toolbar-title>

      <!-- <q-space /> -->
      <div class="row items-center">
        <div class="q-mr-sm">Yang Neiva</div>
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
import type { PropType } from 'vue';

export default defineComponent({
  name: 'AppToolbar',
  props: {
    toggleLeftDrawer: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>
