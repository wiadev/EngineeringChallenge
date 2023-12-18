import {Button, Platform, StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import {Link, useFocusEffect} from 'expo-router';
import axios from 'axios';
import {useMachineData} from '../useMachineData';
import {useCallback, useState} from 'react';
import {PartsOfMachine} from '../../components/PartsOfMachine';
import {MachineScore} from '../../components/MachineScore';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store';
import { resetMachineStatus } from '../../store/features/machine/machineSlice';
import { useCalculateHealthMutation } from '../../store/features/api/apiSlice';

let apiUrl: string =
  'https://fancy-dolphin-65b07b.netlify.app/api/machine-health';

if (__DEV__) {
  apiUrl = `http://${
    Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
  }:3001/machine-health`;
}

export default function StateScreen() {
  const dispatch = useAppDispatch();
  const machineData = useAppSelector((state: RootState) => state.machine.status);
  const [ calculateHealth, result ] = useCalculateHealthMutation();

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {Object.keys(machineData).length === 0 && (
        <Link href='/two' style={styles.link}>
          <Text style={styles.linkText}>
            Please log a part to check machine health
          </Text>
        </Link>
      )}
      {machineData && (
        <>
          <PartsOfMachine
            machineName={'Welding Robot'}
            parts={machineData?.weldingRobot}
          />
          <PartsOfMachine
            machineName={'Assembly Line'}
            parts={machineData?.assemblyLine}
          />
          <PartsOfMachine
            machineName={'Painting Station'}
            parts={machineData?.paintingStation}
          />
          <PartsOfMachine
            machineName={'Quality Control Station'}
            parts={machineData?.qualityControlStation}
          />
          <View
            style={styles.separator}
            lightColor='#eee'
            darkColor='rgba(255,255,255,0.1)'
          />
          <Text style={styles.title}>Factory Health Score</Text>
          <Text style={styles.text}>
            {result?.data?.factory
              ? result?.data?.factory
              : 'Not yet calculated'}
          </Text>
          {result?.data?.machineScores && (
            <>
              <Text style={styles.title2}>Machine Health Scores</Text>
              {Object.keys(result?.data?.machineScores).map((key) => (
                <MachineScore
                  key={key}
                  machineName={key}
                  score={result?.data?.machineScores[key]}
                />
              ))}
            </>
          )}
        </>
      )}
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Button title='Calculate Health' onPress={() => calculateHealth(machineData)} />
      <View style={styles.resetButton}>
        <Button
          title='Reset Machine Data'
          onPress={() => {
            dispatch(resetMachineStatus());
            result.reset();
          }}
          color='#FF0000'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  text: {},
  link: {
    paddingBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  resetButton: {
    marginTop: 10,
  },
});
