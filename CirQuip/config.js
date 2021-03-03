import * as Constants from "expo-constants";

//socketURL: "http://15.207.85.98:3000",
global.config = {
  socketURL: "http://172.20.10.2:3000",
  debug: true,
  host: __DEV__
    ? "http://" + Constants.default.manifest.hostUri.split(":")[0] + ":3000/api"
    : "http://15.207.85.98/api",
  admin: "aniketj18.instru@coep.ac.in",
};
