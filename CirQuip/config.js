import * as Constants from "expo-constants";
//console.log(Constants.default.manifest.hostUri);
global.config = {
  debug: true,
  host: __DEV__
    ? "https://cirquip.vasusharma.me"
    : "http://" +
      Constants.default.manifest.hostUri.split(":")[0] +
      ":3000/api",
};
