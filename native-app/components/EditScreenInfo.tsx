import React, {useCallback, useState} from 'react';
import {Button, Platform, StyleSheet, TextInput} from 'react-native';

import {Text, View} from './Themed';
import {MachineType} from '../data/types';
import Picker from './Picker';
import { useAppDispatch } from '../store/hooks';
import { saveMachineStatus } from '../store/features/machine/machineSlice';
import machinesData from '../data/machineData.json';

export default function EditScreenInfo({path}: {path: string}) {
  const dispatch = useAppDispatch();
  const [machineName, setMachineName] = useState('');
  const [partName, setPartName] = useState('');
  const [partValue, setPartValue] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const partNames = machinesData[machineName] ? Object.keys(machinesData[machineName]).filter((key) => key !== "name").map((key) => {
    const k = key.replace(/([A-Z])/g, " $1");
    const label = k.charAt(0).toUpperCase() + k.slice(1);
    return {
      value: key,
      label,
    }
  }) : [];

  const machineNames = [
    {label: 'Welding Robot', value: MachineType.WeldingRobot},
    {label: 'PaintingStation', value: MachineType.PaintingStation},
    {label: 'Assembly Line', value: MachineType.AssemblyLine},
    {
      label: 'Quality Control Station',
      value: MachineType.QualityControlStation,
    },
  ];

  const apiUrl: string = `http://${
    Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
  }:3001/machine-health`;

  const savePart = () => {
    if (machineName && partName && partValue) {
      dispatch(saveMachineStatus({ machineName, partName, partValue }));
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Machine Name</Text>
      <Picker
        value={machineName}
        onSetValue={setMachineName}
        items={machineNames}
      />

      <Text style={styles.label}>Part Name</Text>
      <Picker value={partName} onSetValue={setPartName} items={partNames} />

      <Text style={styles.label}>Part Value</Text>
      <TextInput
        style={styles.input}
        value={partValue}
        onChangeText={(text) => setPartValue(text)}
        placeholder='Enter part value'
      />

      <Button title='Save' onPress={savePart} />

      {isSaved && <Text style={styles.healthScore}>Saved ✔️</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  healthScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
