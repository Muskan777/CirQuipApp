import * as Constants from "expo-constants";
import Constant from "expo-constants";

const { manifest } = Constant;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000/api`;
console.log(uri);
console.log(Constants.default.manifest.hostUri);
global.config = {
  debug: true,
  host: __DEV__
    ? "http://" + Constants.default.manifest.hostUri.split(":")[0] + ":3000/api"
    : "http://15.207.85.98/api",
  admin: "vasusharma656@gmail.com",
};
