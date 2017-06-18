import { CollisionDetectedError } from '../collision/CollisionDetectedError.js'
import { PlacePieceCommand } from './PlacePieceCommand.js'
import { NextPieceCommand } from './NextPieceCommand.js'

export class MoveDownCommand {
  execute ({ player, game }) {
    const [x, y] = player.position
    try {
      player.position = [x, y + 1]
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e
      }
      player.position = [x, y]
      game.dispatch(new PlacePieceCommand(player.piece, player.position))
      game.dispatch(new NextPieceCommand())
    }
  }
}
