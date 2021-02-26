import * as React from "react";

export const navigationRef = React.createRef();

export const notificationListener = React.createRef();
export const responseListener = React.createRef();
export const appState = React.createRef();
export const productState = React.createRef();
export const notificationClicked = React.createRef();
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
