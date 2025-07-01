import { ICategory } from "@/types/ICategory";
import { IStoreState } from "@/types/IStoreState";
import { create } from "zustand";


const useStore = create<IStoreState>((set) => {
  return {
    categories: [],
    setCategories: (c: ICategory[]) => set({ categories: c }),
  };
});

export default useStore;
