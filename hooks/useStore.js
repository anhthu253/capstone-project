import create from "zustand";

export const useStore = create((set) => ({
  articles: [],
  currentArticle: {},
  currentCollection: { id: "", name: "", description: "", articles: [] },
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
  setCurrentCollection: (selectedCollection) => {
    set((state) => {
      return { currentCollection: selectedCollection };
    });
  },
  addCollection: (newCollection) => {
    set((state) => {
      return { collections: [...state.collections, newCollection] };
    });
  },
  removeCollection: (collectionID) => {
    set((state) => {
      return {
        collections: state.collections.filter(
          (collection) => collection.id !== collectionID
        ),
      };
    });
  },
  add2Collection: (article, collectionID) => {
    set((state) => {
      const newCollections = state.collections.map((item) => {
        if (item.id === collectionID) {
          return { ...item, articles: [...item.articles, article] };
        } else return item;
      });
      return { collections: newCollections };
    });
  },
}));
