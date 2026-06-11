export interface PageData {
  title: string;
  content: string;
}

export interface PageSelectItem {
  id: string;
  title: string;
}
export type PagesResponse = Record<string, PageData>;
