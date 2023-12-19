import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { MachineStatus } from '../machine/machineSlice';
export interface Score {
  factory: string;
  machineScores: Record<string, string>;
}

export const mutations = (builder: EndpointBuilder<any, any, any>) => ({
  calculateHealth: builder.mutation<Score, Partial<MachineStatus>>({
    query: (machineData) => ({
      url: '/machine-health',
      method: 'POST',
      body: {
        machines: machineData,
      },
    }),
    invalidatesTags: [{ type: 'History', id: 'LIST' }], // validate with history list - refresh history list
  }),
  recordDataPoint: builder.mutation<any, any>({
    query: (dataPoint) => ({
      url: '/data-point',
      method: 'POST',
      body: dataPoint,
    }),
    invalidatesTags: [{ type: 'DataPoint', id: 'LIST' }], // validate with data point list - refresh data point list
  })
});
