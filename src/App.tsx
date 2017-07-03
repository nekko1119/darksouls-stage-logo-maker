import * as React from "react";
import Canvas from "./Canvas";
import TextInput from "./TextInput";

import "bootstrap/dist/css/bootstrap.css";

interface State {
    dataUrl?: string;
    stageName?: string;
}

export default class App extends React.Component<{}, State> {

    private static inputId = "upload-file";

    constructor() {
        super();
        this.state = {};
    }

    public render() {
        const {
            dataUrl,
        } = this.state;

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
                        <TextInput
                            visible={!!this.state.dataUrl}
                            onChange={this.handleTextChange}
                        />
                    </div>
                    <div className="col-md-8">
                        {
                            dataUrl ? <Canvas dataUrl={dataUrl} /> : null
                        }
                    </div>
                </div>
            </div>
        );
    }

    private handleTextChange = (e: any) => {
        const text = e.target.value;
        this.setState({
            stage: text,
        });
    }

    private handleImageSelect = (e: any) => {
        const image = e.target.files[0] as File;
        if (!image) {
            // ファイルが選択されていないなら終了
            return;
        }
        if (!image.type.startsWith("image/")) {
            // 画像以外が選択されたなら終了
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                dataUrl: reader.result,
            });
        };
        reader.readAsDataURL(image.slice(0, image.size, image.type));
    }

    private forwardImageSelect = () => {
        const element = document.getElementById(App.inputId);
        element!.click();
    }
}
