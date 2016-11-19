import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary">Primary</button>
                <p>YOU DIED</p>
            </div>
        );
    }
};

const element = document.getElementById("app");

if (element !== null) {
    ReactDOM.render(<App />, element);
}
