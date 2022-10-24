import create from "zustand";

export const useStore = create((set) => ({
  articles: [],
  currentArticle: {},
  setArticles: (newArticles) => {
    set((state) => {
      return { articles: newArticles };
    });
  },
  setArticle: (selectedArticle) => {
    set((state) => {
      return { currentArticle: selectedArticle };
    });
  },
}));
