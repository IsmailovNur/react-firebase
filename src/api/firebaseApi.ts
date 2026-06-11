import axios from 'axios';
import type { PageData, PagesResponse } from '../types/cms.ts';

const cmsEndpoint = axios.create({
  baseURL: 'https://js-31-nurisma-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const cmsApi = {
  getPageByName: async (pageName: string): Promise<PageData | null> => {
    const response = await cmsEndpoint.get<PageData | null>(`/pages/${pageName}.json`);
    return response.data;
  },
  getAllPages: async (): Promise<PagesResponse | null> => {
    const response = await cmsEndpoint.get<PagesResponse | null>('/pages.json');
    return response.data;
  }
};