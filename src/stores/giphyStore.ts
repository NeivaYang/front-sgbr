import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import api from 'src/services/api';

// interface Giphy {
//   id: string;
//   url: string;
//   favorites: Array<Giphy>;
// }
export interface GiphyImageFormat {
  url: string;
  width: string;
  height: string;
  size?: string;
  mp4?: string;
  webp?: string;
}

export interface GiphyImages {
  fixed_height: GiphyImageFormat;
  original: GiphyImageFormat;
  downsized: GiphyImageFormat;
  preview?: GiphyImageFormat;
}

export interface GiphyGif {
  id: string;
  title: string;
  slug: string;
  url: string;
  username: string;
  source: string;
  rating: string;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
}

export const useGiphyStore = defineStore('giphy', {
  state: () => ({
    giphies: (LocalStorage.getItem('giphies') as GiphyGif[]) || [],
    loading: false,
    error: null as string | null,
    searchQuery: 'funny',
    searchResults: [] as GiphyGif[],
    favorites: (() => {
      const stored = LocalStorage.getItem('favorites');
      return Array.isArray(stored) ? (stored as GiphyGif[]) : [];
    })(),
  }),

  actions: {
    async fetchGiphies({ query = 'funny', offset = 0 }: { query?: string; offset?: number }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('search', {
          params: { q: query, limit: 15, offset },
        });
        const giphies = response.data.data.map((item: GiphyGif) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          url: item.url,
          username: item.username,
          source: item.source,
          rating: item.rating,
          import_datetime: item.import_datetime,
          trending_datetime: item.trending_datetime,
          images: {
            fixed_height: item.images?.fixed_height ?? { url: '', width: '', height: '' },
            original: item.images?.original ?? { url: '', width: '', height: '' },
            downsized: item.images?.downsized ?? { url: '', width: '', height: '' },
            preview: item.images?.preview ?? { url: '', width: '', height: '' },
          },
        }));
        this.giphies = giphies;
        LocalStorage.set('giphies', giphies);
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Erro ao buscar Giphies';
      } finally {
        this.loading = false;
      }
    },

    setGiphies(data: GiphyGif[]) {
      this.giphies = data;
      LocalStorage.set('giphies', data);
    },

    addGiphy(giphy: GiphyGif) {
      this.giphies.push(giphy);
      LocalStorage.set('giphies', this.giphies);
    },

    removeGiphy(id: string) {
      this.giphies = this.giphies.filter((g: GiphyGif) => g.id !== id);
      LocalStorage.set('giphies', this.giphies);
    },

    clearGiphies() {
      this.giphies = [];
      LocalStorage.remove('giphies');
    },

    removeFavorite(id: string) {
      this.favorites = this.favorites.filter((g: GiphyGif) => g.id !== id);
      LocalStorage.set('favorites', this.favorites);
    },

    addFavorite(giphy: GiphyGif) {
      console.log('Favorites before adding:', this.favorites);
      // Assegura que "favorites" está inicializado como array
      if (!this.favorites || !Array.isArray(this.favorites)) {
        this.favorites = [];
      }
      // Previne duplicados
      if (!this.favorites?.find((fav: GiphyGif) => fav.id === giphy.id)) {
        this.favorites.push(giphy);
        LocalStorage.set('favorites', this.favorites);
      }
    },
  },

  getters: {
    allGiphies: (state) => state.giphies,
    giphyById: (state) => {
      return (id: string) => state.giphies.find((g: GiphyGif) => g.id === id);
    },
    giphyCount: (state) => state.giphies.length,
    allFavorites: (state) => state.favorites,
    favoriteCount: (state) => state.favorites.length,
  },
});
