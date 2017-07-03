import * as React from "react";

// canvasの最大の長辺の長さ
const MAX_CANVAS_SIZE = 640;

interface Props {
    dataUrl: string;
    stageName: string;
    onCanvasChange: (canvas: HTMLCanvasElement) => void;
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
        this.props.onCanvasChange(this.canvasRef);
    }

    public componentDidMount() {
        this.drawImage(this.props.dataUrl);
        this.props.onCanvasChange(this.canvasRef);
    }

    public render() {
        return <canvas ref={(c) => this.canvasRef = c} />;
    }

    private drawImage(dataUrl: string) {
        if (!this.canvasRef) {
            return;
        }
        const canvas = this.canvasRef;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        this.setState({ context: ctx });
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
            const { width, height } = this.calcCanvasSize({
                naturalHeight: image.naturalHeight,
                naturalWidth: image.naturalWidth,
            });
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(image, 0, 0, width, height);
            ctx.font = `bold ${height / 11}px \
                "ヒラギノ明朝 ProN W6", "HiraMinProN-W6", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif`;
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(this.props.stageName, canvas.width / 2, canvas.height / 2, canvas.width);
            ctx.strokeText(this.props.stageName, canvas.width / 2, canvas.height / 2, canvas.width);
            this.drawUnderLine({
                canvas,
                ctx,
                text: this.props.stageName,
                textHeight: height / 11,
            });
        };
    }

    /**
     * 画像を長さからcanvasの縦横の長さを求める
     * @param size 画像の実際の縦と横の長さ
     * @return 縦の横の長い辺を最大640として、他方を元の画像の縦横比を保った長さにする
     */
    private calcCanvasSize(size: { naturalWidth: number; naturalHeight: number; }) {
        const {
            naturalHeight,
            naturalWidth,
        } = size;
        const aspectRate = naturalWidth / naturalHeight;

        // 横の方が長い場合
        if (aspectRate >= 1) {
            const width = naturalWidth > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : naturalWidth;
            const height = (width / aspectRate) > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : (width / aspectRate);
            return {
                height,
                width,
            };
        }

        // 縦の方が長い場合
        const height = naturalHeight > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : naturalWidth;
        const width = (height * aspectRate) > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : (height * aspectRate);
        return {
            height,
            width,
        };
    }

    /**
     * テキストに下線を描画する
     * @param param canvasとcontextと描画するテキストとそのテキストの縦幅
     */
    private drawUnderLine(param: {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        text: string;
        textHeight: number;
    }) {
        const {
            canvas,
            ctx,
            text,
            textHeight,
        } = param;
        const matrics = ctx.measureText(text);
        ctx.beginPath();
        ctx.moveTo((canvas.width / 2) - (matrics.width / 2), (canvas.height / 2) + (textHeight / 2));
        ctx.lineTo((canvas.width / 2) + (matrics.width / 2), (canvas.height / 2) + (textHeight / 2));
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}
