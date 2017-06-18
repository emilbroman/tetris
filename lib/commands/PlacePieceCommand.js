export class PlacePieceCommand {
  constructor (piece, position) {
    this._piece = piece
    this._position = position
  }

  execute ({ board, player }) {
    board.place(this._piece, this._position)
    const rows = board.collectRows()
    const points = this._score(rows)
    player.score += points
  }

  _score (rows) {
    return new Array(rows).fill(2)
      .reduce((c, t, i) => (c + i + 1) * t, 0) * 10
  }
}
