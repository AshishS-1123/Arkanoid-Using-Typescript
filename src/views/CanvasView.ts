import { Brick } from "~/sprites/Brick";
import { Ball } from "~/sprites/Ball";
import { Paddle } from "~/sprites/Paddle";
import { BRICK_IMAGES } from "~/setup";

export class CanvasView {
    canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private scoreDisplay: HTMLObjectElement | null;
    private start: HTMLObjectElement | null;
    private info: HTMLObjectElement | null;

    constructor (canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score') as HTMLObjectElement;
        this.start =  document.querySelector('#start') as HTMLObjectElement;
        this.info =  document.querySelector('#info') as HTMLObjectElement;
    }

    clearCanvas(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    initStartButton(startFunction: (view: CanvasView) => void): void {
        this.start?.addEventListener('click', () => startFunction(this));
    }

    drawScore(score: number): void {
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
    }

    drawInfo(text: string): void {
        if (this.info) this.info.innerHTML = text;
    }

    drawSprites(sprite: Brick | Paddle | Ball): void {
        if (!sprite) return;

        this.context?.drawImage(
            sprite.image,
            sprite.pos.x,
            sprite.pos.y,
            sprite.width,
            sprite.height,
        );
    }

    drawBricks(brick: Brick[]): void {
        brick.forEach(brick => this.drawSprites(brick));
    }
}