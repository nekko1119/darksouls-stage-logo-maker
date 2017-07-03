import * as React from "react";

interface Props {
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default class Component extends React.Component<Props, {}> {
    public render() {
        return (
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={this.props.onChange}
                    placeholder="ステージ名"
                />
            </div>
        );
    }
}
