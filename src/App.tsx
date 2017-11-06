import * as React from "react";
import Canvas from "./Canvas";
import TextInput from "./TextInput";

import "bootstrap/dist/css/bootstrap.min";
import "./style";

interface State {
    dataUrl?: string;
    stageName: string;
    canvas?: HTMLCanvasElement;
}

const ReleaseNotes = () => (
    <div className="base release-note">
        <h3>更新履歴</h3>
        <ul>
            <li className="base">2017/mm/dd v0.1.0 公開</li>
        </ul>
    </div>
);

export default class App extends React.Component<{}, State> {

    private static inputId = "upload-file";

    constructor() {
        super();
        this.state = {
            stageName: "",
        };
    }

    public render() {
        const {
            dataUrl,
            stageName,
        } = this.state;

        return (
            <div className="container">
                <h1 className="base">DARK SOULSのステージ表示風に画像に文字列を重ねる</h1>
                <div className="alert alert-warning" role="alert">
                    <strong>注意</strong> 高解像度の画像を使用すると重くなります
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
                        {
                            dataUrl ? (
                                <div>
                                    <TextInput
                                        onChange={this.handleTextChange}
                                    />
                                    <a
                                        type="button"
                                        className="btn btn-primary form-group"
                                        download="darksouls-stage-logo-image.png"
                                        target="_blank"
                                        onClick={this.saveImage}
                                    >
                                        画像を保存
                                    </a>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="col-md-8">
                        {
                            dataUrl ? (
                                <Canvas
                                    dataUrl={dataUrl}
                                    stageName={stageName}
                                    setCanvas={this.setCanvas}
                                />
                            ) : null
                        }
                    </div>
                </div>
                <ReleaseNotes />
            </div>
        );
    }

    private handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        this.setState({
            stageName: text,
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

    private setCanvas = (canvas: HTMLCanvasElement) => {
        this.setState({
            canvas,
        });
    }

    private saveImage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!this.state.canvas) {
            return;
        }
        const a = e.currentTarget;
        a.href = this.state.canvas.toDataURL("image/png");
    }
}
