import { MoveLeftCommand } from "../commands/MoveLeftCommand.js";
import { MoveRightCommand } from "../commands/MoveRightCommand.js";
import { MoveDownCommand } from "../commands/MoveDownCommand.js";
import { RotatePieceCommand } from "../commands/RotatePieceCommand.js";
import { DropPieceCommand } from "../commands/DropPieceCommand.js";

const Keys = {
  Spacebar: 32,
  Escape: 27,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
};

export class KeyboardController {
  #game;

  constructor(game) {
    this.#game = game;
  }

  listen() {
    window.addEventListener("keydown", this.#onKeyDown.bind(this));
  }

  #onKeyDown({ keyCode }) {
    switch (keyCode) {
      case Keys.Down:
      case Keys.J:
        return this.#game.dispatch(new MoveDownCommand());
      case Keys.Left:
      case Keys.H:
        return this.#game.dispatch(new MoveLeftCommand());
      case Keys.Right:
      case Keys.L:
        return this.#game.dispatch(new MoveRightCommand());
      case Keys.Up:
      case Keys.K:
        return this.#game.dispatch(new RotatePieceCommand());
      case Keys.Spacebar:
      case Keys.Escape:
        return this.#game.dispatch(new DropPieceCommand());
    }
  }
}
