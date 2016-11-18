import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component<any, any> {
    render() {
        return (
            <p>YOU DIED</p>
        );
    }
};

const element = document.getElementById("app");

if (element !== null) {
    ReactDOM.render(<App />, element);
}
