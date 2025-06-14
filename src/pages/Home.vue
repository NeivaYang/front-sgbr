<template>
  <q-page>
    <ContentPages :title="'Home'">
      <div>
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
        <q-infinite-scroll
          @load="loadData"
          :offset="30"
          :disable="giphyStore.loadingInfiniteScroll"
        >
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
                    style="width: 200px; height: 200px; object-fit: cover; min-width: 200px"
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
        </q-infinite-scroll>
      </div>
      <div v-if="giphyStore.error && !giphyStore.loading" class="flex items-center justify-center">
        <q-banner class="bg-negative text-white flex items-center justify-center">
          <q-icon name="error" size="xl" />
          {{ giphyStore.error }}.
          {{ giphyStore.errorMessage }}
        </q-banner>
      </div>
      <div
        v-else-if="giphyStore.giphyCount === 0 && giphyStore.loading"
        class="flex items-center justify-center"
      >
        <q-banner class="bg-info text-white flex items-center justify-center">
          <q-icon name="info" size="xl" />
          Nenhum gif encontrado para a pesquisa "{{ giphyStore.searchQuery }}".
        </q-banner>
      </div>
      <div v-if="giphyStore.loadingInfiniteScroll" class="flex items-center justify-center">
        <q-spinner-grid color="primary" size="3em" />
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
      void giphyStore.fetchGiphies({ offset: 0, limit: 30, query: giphyStore.searchQuery });
    });

    const loadData = async (_: unknown, done: (stop?: boolean) => void) => {
      const offset = giphyStore.giphyCount;
      if (giphyStore.loadingInfiniteScroll || giphyStore.error) {
        return;
      }
      await giphyStore.fetchGiphies({ offset, limit: 15, query: giphyStore.searchQuery });
      done();
    };

    return {
      giphyStore,
      showNotification,
      loadData,
    };
  },

  components: {
    ContentPages,
  },
});
</script>
