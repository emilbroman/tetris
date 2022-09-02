import { NextPieceCommand } from "./commands/NextPieceCommand.js";

export class TetrisGame {
  #context;
  #listeners;
  #update;

  isRunning = false;

  constructor(context) {
    this.#context = { ...context, game: this };

    this.#update = this.#updateFn.bind(this);
    this.#listeners = new Map();
  }

  start() {
    this.isRunning = true;
    this.dispatch(new NextPieceCommand());
    this.#update(0);
  }

  stop() {
    this.isRunning = false;
    window.alert(`Final score: ${this.#context.player.score}`);
  }

  on(command, listener) {
    if (!this.#listeners.has(command)) {
      this.#listeners.set(command, []);
    }

    this.#listeners.get(command).push(listener);
  }

  dispatch(command) {
    this.#listeners.forEach((listeners, com) => {
      if (command instanceof com) {
        for (const l of listeners) {
          l(command);
        }
      }
    });
    command.execute(this.#context);
  }

  #updateFn(time) {
    this.#drawGameBoard();
    this.#drawPlayer();

    if (this.isRunning) {
      window.requestAnimationFrame(this.#update);
    }
  }

  #drawGameBoard() {
    const { board, painter } = this.#context;
    painter.fillMatrix([0, 0], board.matrix, { includeBackground: true });
  }

  #drawPlayer() {
    const { player, painter } = this.#context;
    if (player.piece == null) return;
    painter.fillMatrix(player.position, player.piece.matrix);
  }
}
