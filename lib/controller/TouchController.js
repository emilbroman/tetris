import { MoveLeftCommand } from "../commands/MoveLeftCommand.js";
import { MoveRightCommand } from "../commands/MoveRightCommand.js";
import { MoveDownCommand } from "../commands/MoveDownCommand.js";
import { RotatePieceCommand } from "../commands/RotatePieceCommand.js";
import { DropPieceCommand } from "../commands/DropPieceCommand.js";

const Gesture = {
  Right: "Right",
  Left: "Left",
  Down: "Down",
  Up: "Up",
  Tap: "Tap",
};

export class TouchController {
  #game;
  #startTouch;

  constructor(game) {
    this.#game = game;
  }

  listen() {
    window.addEventListener("touchstart", this.#onTouchStart.bind(this));
    window.addEventListener("touchend", this.#onTouchEnd.bind(this));
    window.addEventListener("touchmove", () => {});
  }

  #onTouchStart(e) {
    e.preventDefault();
    this.#startTouch = e.touches[0];
  }

  #onTouchEnd(e) {
    e.preventDefault();
    const endTouch = e.changedTouches[0];
    const startTouch = this.#startTouch;

    const xDiff = endTouch.clientX - startTouch.clientX;
    const yDiff = endTouch.clientY - startTouch.clientY;

    const direction = this.#direction(xDiff, yDiff);

    switch (direction) {
      case Gesture.Down:
        return this.#game.dispatch(new MoveDownCommand());
      case Gesture.Left:
        return this.#game.dispatch(new MoveLeftCommand());
      case Gesture.Right:
        return this.#game.dispatch(new MoveRightCommand());
      case Gesture.Tap:
        return this.#game.dispatch(new RotatePieceCommand());
      case Gesture.Up:
        return this.#game.dispatch(new DropPieceCommand());
    }
  }

  #direction(x, y) {
    if (Math.abs(x) + Math.abs(y) < 40) {
      return Gesture.Tap;
    }

    if (Math.abs(x) > Math.abs(y)) {
      if (x > 0) {
        return Gesture.Right;
      }
      return Gesture.Left;
    }
    if (y > 0) {
      return Gesture.Down;
    }
    return Gesture.Up;
  }
}
