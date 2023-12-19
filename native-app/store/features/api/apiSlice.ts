import { Platform } from 'react-native';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';
import { mutations } from './mutations';
import { queries } from './queries';

let apiUrl: string =
  'https://fancy-dolphin-65b07b.netlify.app/api';

if (__DEV__) {
  apiUrl = `http://${
    Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
  }:3001`;
}

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['History', 'DataPoint'],
  endpoints: (builder) => ({
    ...queries(builder),
    ...mutations(builder),
  }),
});

export const {
  useCalculateHealthMutation,
  useRecordDataPointMutation,
  useGetDataPointsQuery,
  useGetScoresQuery,
} = apiSlice;
