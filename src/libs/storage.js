import AsyncStorage from '@react-native-community/async-storage';

export default class Storage {
  static instance = new Storage();

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      // saving error
      return false;
      console.log(error);
    }
  };

  storeDataObject = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      // saving error
    }
  };
  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (error) {
      // error reading value
      throw Error(error);
      console.log(error);
    }
  };

  getDataObject = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      // error reading value
      throw Error(error);
      console.log(error);
    }
  };

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      // error reading value;
      console.log(error);
      return false;
    }
  };

  getAllData = async () => {
    try {
      const value = await AsyncStorage.getAllKeys();
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (error) {
      // error reading value
      throw Error(error);
      console.log(error);
    }
  };

  getMultiData = async (keys) => {
    try {
      const value = await AsyncStorage.multiGet(keys);
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (error) {
      // error reading value
      throw Error(error);
      console.log(error);
    }
  };

  getMultiDataObject = async (keys) => {
    try {
      const jsonValue = await AsyncStorage.multiGet(keys);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      // error reading value
      throw Error(error);
      console.log(error);
    }
  };
}
