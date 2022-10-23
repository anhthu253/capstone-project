import create from "zustand";

export const useStore = create((set) => ({
  articles: [],
  article: {},
  setArticles: (newarticles) => {
    set((state) => {
      return { articles: newarticles };
    });
  },
  setArticle: (newarticle) => {
    set((state) => {
      return { article: newarticle };
    });
  },
}));
