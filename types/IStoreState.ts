import { ICategory } from "./ICategory";

export interface IStoreState {
  categories: ICategory[];
  setCategories: (c: ICategory[]) => void;
}
