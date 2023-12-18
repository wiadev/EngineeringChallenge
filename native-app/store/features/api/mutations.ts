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
    invalidatesTags: [{ type: 'History', id: 'LIST' }], // validate with user list - refresh user list
  })
});
