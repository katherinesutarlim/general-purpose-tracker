import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store/store';

const makeStateStorageKey = (reducer, key) => `${reducer}.${key}`;

export const storeData = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const storeState = (reducer, key) => {
  const data = store.getState()[reducer][key];
  return storeData(makeStateStorageKey(reducer, key), data);
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getStateFromStore = (reducer, key) => getData(makeStateStorageKey(reducer, key));
