import axios from "axios";
import Constants from "expo-constants";

let LOCAL_IP = "192.168.1.105"; // fallback

// Expo dev server usually exposes host in Constants.manifest
if (__DEV__) {
  const debuggerHost =
    Constants.manifest?.debuggerHost || Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    LOCAL_IP = debuggerHost.split(":")[0]; // extract IP part
  }
}

const BASE_URL = __DEV__
  ? `http://${LOCAL_IP}:3000/api`
  : "https://your-production-api.com/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
