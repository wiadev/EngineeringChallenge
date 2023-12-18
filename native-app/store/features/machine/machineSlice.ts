import { createSlice } from '@reduxjs/toolkit';

export interface MachineStatus {
  weldingRobot: Record<string, string>,
  assemblyLine: Record<string, string>,
  paintingStation: Record<string, string>,
  qualityControlStation: Record<string, string>,
}
export interface MachineState {
  status: Partial<MachineStatus>
}
const initialState: MachineState = {
  status: {}
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    saveMachineStatus: (state, payload) => {
      const { machineName, partName, partValue } = payload.payload;
      if (state.status[machineName]) {
        state.status[machineName][partName] = partValue;
      } else {
        state.status[machineName] = {
          [partName]: partValue
        };
      }
    },
    resetMachineStatus: (state) => {
      state.status = {};
    }
  },
});

export const {
  saveMachineStatus,
  resetMachineStatus
} = machineSlice.actions;

export default machineSlice.reducer;
