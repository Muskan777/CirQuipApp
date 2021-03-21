import * as Constants from "expo-constants";

//socketURL: "http://172.20.10.2:3000",
global.config = {
  socketURL: "http://15.207.85.98:3000",
  debug: true,
  host: __DEV__
    ? "http://" + Constants.default.manifest.hostUri.split(":")[0] + ":3000/api"
    : "https://api.cirquip.com",
  admin: [
    "cirquip_a1@yahoo.com",
    "cirquip_a2@yahoo.com",
    "cirquip_a3@outlook.com",
    "cirquip_a4@outlook.com",
  ],
};
