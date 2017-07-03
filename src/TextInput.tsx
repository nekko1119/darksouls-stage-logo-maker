import * as React from "react";

interface Props {
    visible: boolean;
    onChange: (e?: any) => void;
}

export class Component extends React.Component<Props, {}> {
    public render() {
        if (!this.props.visible) {
            return null;
        }
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
