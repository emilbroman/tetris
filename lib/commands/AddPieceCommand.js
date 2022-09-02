export class AddPieceCommand {
  #piece;

  constructor(piece) {
    this.#piece = piece;
  }

  execute({ player }) {
    player.piece = this.#piece;
  }
}
