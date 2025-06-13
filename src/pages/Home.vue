<template>
  <q-page>
    <ContentPages :title="'Home'">
      <div class="flex justify-end">
        <q-input
          v-model="giphyStore.searchQuery"
          @blur="giphyStore.fetchGiphies({ query: giphyStore.searchQuery })"
          label="Pesquisar Gifs"
          outlined
          bottom-slots
        >
          <template v-slot:append>
            <q-icon name="close" @click="giphyStore.searchQuery = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div v-if="giphyStore.loading" class="flex items-center justify-center">
        <q-spinner-grid color="primary" size="5.5em" />
      </div>
      <div v-else class="flex items-center justify-end">
        <div class="q-pa-md row justify-between">
          <div class="row justify-between q-gutter-sm">
            <q-intersection
              v-for="gif in giphyStore.giphies"
              :key="gif.id"
              class="flex justify-end col-2"
            >
              <q-card flat bordered class="q-ma-xs flex items-center justify-center">
                <img
                  :src="gif.images.fixed_height.url"
                  :alt="gif.title"
                  style="width: 200px; height: 200px; object-fit: cover"
                  class="q-ma-xs"
                />
                <q-card-actions align="left">
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="favorite"
                    @click="
                      giphyStore.addFavorite(gif);
                      showNotification('Gif adicionado aos favoritos!', 'positive');
                    "
                  />
                </q-card-actions>
              </q-card>
            </q-intersection>
          </div>
        </div>
      </div>
    </ContentPages>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import ContentPages from 'components/organisms/ContentPages.vue';
import { useGiphyStore } from 'src/stores/giphyStore';
import { showNotification } from 'src/utils/common';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const giphyStore = useGiphyStore();

    onMounted(() => {
      void giphyStore.fetchGiphies({});
    });

    return {
      giphyStore,
      showNotification,
    };
  },

  components: {
    ContentPages,
  },
});
</script>
