// lib/strapi.ts

import type { StrapiResponse, StrapiQueryParams } from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_ACCESS_URL;
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_ACCESS_KEY;
const API_BASE = `${STRAPI_URL}/api`;
async function fetchStrapiAPI<T>(endpoint: string, queryParams: StrapiQueryParams = {}): Promise<StrapiResponse<T>> {
  const url = new URL(`${API_BASE}${endpoint}`);

  // Apply default populate=* but maintain any passed params
  const paramsWithDefault:any = {
      populate: '*',
      ...queryParams,
  };
  Object.keys(paramsWithDefault).forEach(key => url.searchParams.append(key, String(paramsWithDefault[key])));

  
  const headers: HeadersInit = {
      'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
      const response = await fetch(url, {
          headers,
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Strapi API Error:', errorData);
          throw new Error(`API request failed: ${response.status} - ${errorData?.error?.message || response.statusText}`);
      }
      return await response.json() as StrapiResponse<T>;

  } catch (error) {
      console.error('Strapi API Error:', error);
      throw new Error(`Failed to fetch data from Strapi: ${error}`);
  }
}

export default fetchStrapiAPI;