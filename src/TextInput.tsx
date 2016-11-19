import * as React from "react";

interface Props {
    visible: boolean;
    onChange: (e?: any) => void;
};

export class Component extends React.Component<Props, any> {
    render() {
        if (!this.props.visible) {
            // workaround
            // react的にはnullは許可されているが、typescript2系では不許可されている不具合がある
            // nullをnullではないと表明することで対処できる
            return null!;
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
};
