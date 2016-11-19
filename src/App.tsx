import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TextInput from "./TextInput";

import "bootstrap/dist/css/bootstrap.css";

interface State {
    dataUrl?: string;
    stage?: string;
};

const Preview = ({dataUrl}: {dataUrl?: string}) => (
    // workaround
    // react的にはnullは許可されているが、typescript2系では不許可されている不具合がある
    // nullをnullではないと表明することで対処できる
    dataUrl ? <img src={dataUrl} className="img-thumbnail" /> : null!
);

class App extends React.Component<void, State> {

    static inputId = "upload-file";

    constructor() {
        super();
        this.state = {};
    }

    private handleTextChange = (e: any) => {
        const text = e.target.value;
        this.setState({
            stage: text
        });
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
                <h1>DARK SOULS風にステージロゴを画像に重ねる</h1>
                <div
                    className="alert alert-warning"
                    role="alert"
                >
                    未完成！
                </div>
                <input
                    id={App.inputId}
                    type="file"
                    onChange={this.handleImageSelect}
                    style={{ display: "none" }}
                    accept="image/*"
                />
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-primary form-group"
                                onClick={this.forwardImageSelect}
                            >
                                画像を選択
                            </button>
                        </div>
                        <TextInput.Component
                            visible={!!this.state.dataUrl}
                            onChange={this.handleTextChange}
                        />
                    </div>
                    <div className="col-md-8">
                        <Preview dataUrl={this.state.dataUrl} />
                    </div>
                </div>
            </div>
        );
    }
};

const element = document.getElementById("app");

ReactDOM.render(<App />, element!);
