import * as Constants from "expo-constants";
//console.log(Constants.default.manifest.hostUri);
global.config = {
  host: __DEV__
    ? "http://" + Constants.default.manifest.hostUri.split(":")[0] + ":3000/api"
    : "https://host_uri",
};
