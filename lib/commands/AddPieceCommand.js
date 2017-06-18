export class AddPieceCommand {
  constructor (piece) {
    this._piece = piece
  }

  execute ({ player }) {
    player.piece = this._piece
  }
}
