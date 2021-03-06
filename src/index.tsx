import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./App";

declare var module: any;

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("app"));
};

render(App);
if (module.hot) {
    module.hot.accept("./App", () => render(App));
}
