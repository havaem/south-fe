import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class NameTag extends GameObject {
    text: string;
    fontSize: number = 16;
    fontFamily: string = "m5x7";
    position: Vector2;
    color: string = "cyan";
    constructor(config: { position: Vector2; text: string; fontSize?: number; fontFamily?: string; color?: string }) {
        super({});
        this.text = config.text;
        this.fontSize = config.fontSize ?? this.fontSize;
        this.fontFamily = config.fontFamily ?? this.fontFamily;
        this.position = config.position ?? new Vector2(0, 0);
        this.color = config.color ?? this.color;
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        const textWidth = ctx.measureText(this.text).width + 8;
        const textHeight = this.fontSize - 4;
        const backgroundX = x + this.position.x - textWidth / 2;
        const backgroundY = y + this.position.y - 10;
        ctx.fillRect(backgroundX, backgroundY, textWidth, textHeight);
        ctx.restore();

        ctx.save();
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.fillText(this.text, x + this.position.x, y + this.position.y);
        ctx.restore();
    }
}
