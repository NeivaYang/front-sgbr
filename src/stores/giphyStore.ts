import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import api from 'src/services/api';

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

interface Category {
  name: string;
  name_encoded: string;
  subcategories: Subcategory[];
  gif: GiphyGif;
}

interface Subcategory {
  name: string;
  name_encoded: string;
}

const mapGiphyGif = (item: GiphyGif) => ({
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
});

export const useGiphyStore = defineStore('giphy', {
  state: () => ({
    giphies: (LocalStorage.getItem('giphies') as GiphyGif[]) || [],
    loading: false,
    loadingInfiniteScroll: false,
    error: null as string | null,
    errorMessage: '',
    searchQuery: 'funny',
    searchResults: [] as GiphyGif[],
    favorites: (() => {
      const stored = LocalStorage.getItem('favorites');
      return Array.isArray(stored) ? (stored as GiphyGif[]) : [];
    })(),
    categories: (LocalStorage.getItem('categories') as Category[]) || [],
    selectedCategory: null as string | null,
  }),

  actions: {
    async fetchGiphies({
      query = '',
      offset = 0,
      limit = 30,
    }: {
      query?: string;
      offset?: number;
      limit?: number;
    }) {
      this.error = null;
      if (offset != 0) {
        // Se o offset não for zero, significa que é uma busca por scroll infinito
        // Nesse caso. loadingInfiniteScroll = true
        this.loadingInfiniteScroll = true;
      } else {
        // Se o offset for zero, significa que é uma busca inicial
        // Nesse caso, loading = true
        this.loading = true;
      }
      try {
        const response = await api.get('search', {
          params: { q: query, limit, offset },
        });
        const giphies = response.data.data.map((item: GiphyGif) => mapGiphyGif(item));
        if (offset === 0) {
          this.setGiphies(giphies);
        } else {
          this.setGiphies([...this.giphies, ...giphies]);
        }
        LocalStorage.set('giphies', giphies);
        return giphies.length;
      } catch (err: unknown) {
        this.error = err instanceof AxiosError ? err.message : 'Erro ao buscar Giphies';
        this.errorMessage =
          err instanceof AxiosError ? err.response?.data?.meta?.msg : 'Erro ao buscar Giphies';
      } finally {
        this.loading = false;
        this.loadingInfiniteScroll = false;
      }
    },

    async fetchCategoryGiphies() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('categories');
        const c = response.data.data.map((item: Category) => {
          return {
            name: item.name,
            name_encoded: item.name_encoded,
            subcategories: item.subcategories.map((sub: Subcategory) => ({
              name: sub.name,
              name_encoded: sub.name_encoded,
            })),
            gif: mapGiphyGif(item.gif),
          };
        });
        this.setCategories(c);
      } catch (err: unknown) {
        this.error =
          err instanceof AxiosError ? err.message : 'Erro ao buscar Giphies por categoria';
        this.errorMessage =
          err instanceof AxiosError
            ? err.response?.data?.meta?.msg
            : 'Erro ao buscar Giphies por categoria';
      } finally {
        this.loading = false;
      }
    },

    setCategories(categories: Category[]) {
      this.categories = categories;
      LocalStorage.set('categories', categories);
    },

    setGiphies(data: GiphyGif[]) {
      this.giphies = data;
      LocalStorage.set('giphies', data);
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
