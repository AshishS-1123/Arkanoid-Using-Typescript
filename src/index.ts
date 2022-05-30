import { CanvasView } from "./views/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";

// Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';

// Levels and colors.
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';

// Helpers
import { createBricks } from './helpers';

let gameOver = false;
let score = 0;

function setGameOver (view: CanvasView): void {
    view.drawInfo("Game Over!");
    // Reset the flag so that we can start it again.
    gameOver = false;
}

function setGameWin(view: CanvasView): void {
    view.drawInfo("Game Won!");
    gameOver = false;
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
): void {
    view.clearCanvas();
    view.drawBricks(bricks);
    view.drawSprites(paddle);
    view.drawSprites(ball);

    ball.moveBall();

    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - PADDLE_WIDTH)
    ) {
        paddle.movePaddle();
    }

    collision.checkBallCollision(ball, paddle, view);
    
    const collidingBrick = collision.isCollidingBricks(ball, bricks);

    if (collidingBrick) {
        score += 1;
        view.drawScore(score);
    }

    // Game over check
    if (ball.pos.y > view.canvas.height) gameOver = true;
    if (bricks.length === 0) return setGameWin(view);
    if (gameOver) return setGameOver(view);

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView): void {
    // Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(score);

    // Create collision
    const collision = new Collision();

    // Create all bricks
    const bricks = createBricks();

    // Create paddle
    const paddle = new Paddle(
        PADDLE_SPEED, 
        PADDLE_WIDTH, 
        PADDLE_HEIGHT, 
        {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5},
        PADDLE_IMAGE
    );

    // Create ball
    const ball = new Ball(
        BALL_SIZE, 
        {x: BALL_STARTX, y: BALL_STARTY}, 
        BALL_SPEED, 
        BALL_IMAGE
    );

    gameLoop(view, bricks, paddle, ball, collision);
}

// create new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);