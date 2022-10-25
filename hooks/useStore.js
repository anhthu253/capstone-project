import create from "zustand";

export const useStore = create((set) => ({
  articles: [],
  currentArticle: {},
  collections: [],
  setArticles: (newArticles) => {
    set((state) => {
      return { articles: newArticles };
    });
  },
  setCurrentArticle: (selectedArticle) => {
    set((state) => {
      return { currentArticle: selectedArticle };
    });
  },
  add2Collections: (article) => {
    set((state) => {
      if (
        state.collections.find((collection) => collection.id === article.id) ===
        undefined
      )
        return { collections: [...state.collections, article] };
      return { collections: state.collections };
    });
  },
}));
