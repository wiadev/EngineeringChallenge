import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export const queries = (builder: EndpointBuilder<any, any, any>) => ({
  getDataPoints: builder.query({
    query: () => '/data-point',
  }),
  getScores: builder.query({
    query: () => '/score',
  }),
});
