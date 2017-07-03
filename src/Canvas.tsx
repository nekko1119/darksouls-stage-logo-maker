import * as React from "react";

// canvasの最大の長辺の長さ
const MAX_CANVAS_SIZE = 640;

interface Props {
    dataUrl: string;
}

interface State {
    context: CanvasRenderingContext2D;
}

export default class Canvas extends React.Component<Props, State> {

    private canvasRef: HTMLCanvasElement;

    constructor(props: Props) {
        super(props);
    }

    public componentWillReceiveProps(nextProps: Props) {
        this.drawImage(nextProps.dataUrl);
    }

    public componentDidMount() {
        this.drawImage(this.props.dataUrl);
    }

    public render() {
        return <canvas ref={(c) => this.canvasRef = c} width={320} height={240} />;
    }

    private drawImage(dataUrl: string) {
        if (!this.canvasRef) {
            return;
        }
        const context = this.canvasRef.getContext("2d");
        if (!context) {
            return;
        }
        this.setState({ context });
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
            const aspectRate = image.naturalWidth / image.naturalHeight;
            let width: number;
            let height: number;
            if (aspectRate >= 1) {
                width = image.naturalWidth > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : image.naturalWidth;
                height = (width / aspectRate) > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : (width / aspectRate);
            } else {
                height = image.height > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : image.height;
                width = (height * aspectRate) > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : (height * aspectRate);
            }
            this.canvasRef.width = width;
            this.canvasRef.height = height;
            console.log(width);
            console.log(height);
            context.drawImage(image, 0, 0, width, height);
        };
    }
}
