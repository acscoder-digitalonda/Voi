export interface StrapiQueryParams {
  [key: string]: string | number | boolean | undefined | null | object;
  populate?: string | string[] | '*'
}

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export interface HomePageResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Carousels: CarouselContent[];
}

export interface CarouselContent {
  id: number;
  Content: {
    type: string;
    level?: number;
    children: {
      text: string;
      type: string;
    }[];
  }[];
}
