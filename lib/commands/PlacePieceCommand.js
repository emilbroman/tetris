export class PlacePieceCommand {
  #piece;
  #position;

  constructor(piece, position) {
    this.#piece = piece;
    this.#position = position;
  }

  execute({ board, player }) {
    board.place(this.#piece, this.#position);
    const rows = board.collectRows();
    const points = this.#score(rows);
    player.score += points;
  }

  #score(rows) {
    return new Array(rows).fill(2).reduce((c, t, i) => (c + i + 1) * t, 0) * 10;
  }
}
