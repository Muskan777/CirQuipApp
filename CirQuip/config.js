import * as Constants from "expo-constants";
import Constant from "expo-constants";

const { manifest } = Constant;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000/api`;
console.log(uri);
console.log(Constants.default.manifest.hostUri);
global.config = {
  debug: true,
  host:
    "http://" + Constants.default.manifest.hostUri.split(":")[0] + ":3000/api",
  admin: "vasusharma656@gmail.com",
};
//global.config = {
//test: "http://a053e0e96ed0.ngrok.io",
//debug: true,
//host: "http://a053e0e96ed0.ngrok.io/api",
//admin: "vasusharma656@gmail.com",
//};
