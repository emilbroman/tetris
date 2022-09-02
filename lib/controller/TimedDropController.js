import { MoveDownCommand } from "../commands/MoveDownCommand.js";
import { DropPieceCommand } from "../commands/DropPieceCommand.js";

export class TimedDropController {
  #game;
  #interval = 1000;
  #timeout;

  constructor(game) {
    this.#game = game;
  }

  listen() {
    this.#game.on(MoveDownCommand, this.#set.bind(this));
    this.#game.on(DropPieceCommand, this.#set.bind(this));
    this.#set();
    window.setInterval(() => {
      this.#interval--;
    }, 700);
  }

  #set() {
    if (this.#timeout) {
      window.clearTimeout(this.#timeout);
    }

    this.#timeout = window.setTimeout(this.#tick.bind(this), this.#interval);
  }

  #tick() {
    if (this.#game.isRunning) {
      this.#game.dispatch(new MoveDownCommand());
    }
  }
}
