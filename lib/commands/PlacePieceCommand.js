export class PlacePieceCommand {
  constructor (piece, position) {
    this._piece = piece
    this._position = position
  }

  execute ({ board, player }) {
    board.place(this._piece, this._position)
    const points = board.collectRows()
    player.score += points
  }
}
