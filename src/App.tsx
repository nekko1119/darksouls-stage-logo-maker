import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

interface State {
    dataUrl?: string
};

const Preview = ({dataUrl}: {dataUrl?: string}) => (
    dataUrl ? <img src={dataUrl} width={480} /> : null!
);

class App extends React.Component<void, State> {

    static inputId = "upload-file";

    constructor() {
        super();
        this.state = {};
    }

    private handleImageSelect = (e: any) => {
        const image = e.target.files[0] as File;
        if (!image) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                dataUrl: reader.result
            });
        };
        reader.readAsDataURL(image.slice(0, image.size, image.type));
    };

    private forwardImageSelect = () => {
        const element = document.getElementById(App.inputId);
        element!.click();
    };

    render() {
        return (
            <div className="container">
                <h1>DARK SOULS風ステージロゴを画像に重ねる</h1>
                <input
                    id={App.inputId}
                    type="file"
                    onChange={this.handleImageSelect}
                    style={{ display: "none" }}
                    accept="image/*"
                />
                <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.forwardImageSelect}
                >
                    画像を選択
                </button>
                <p>YOU DIED</p>
                <Preview dataUrl={this.state.dataUrl} />
            </div>
        );
    }
};

const element = document.getElementById("app");

ReactDOM.render(<App />, element!);
