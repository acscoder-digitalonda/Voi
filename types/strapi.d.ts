// types/strapi.d.ts

interface StrapiMetaPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface StrapiMeta {
  pagination: StrapiMetaPagination;
}

interface StrapiData<T> {
  id: number;
  [key: string]: any;
  attributes: T
}

interface StrapiResponse<T> {
  data: StrapiData<T>[] | StrapiData<T>;
  meta: StrapiMeta;
}

type StrapiQueryParams = Record<string, string | number | boolean>;

export type {
    StrapiResponse,
    StrapiData,
    StrapiMeta,
    StrapiMetaPagination,
    StrapiQueryParams
}