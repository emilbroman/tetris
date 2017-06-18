import { CollisionDetectedError } from '../collision/CollisionDetectedError.js'
import { AddRandomPieceCommand } from './AddRandomPieceCommand.js'

export class NextPieceCommand {
  execute ({ player, game }) {
    try {
      game.dispatch(new AddRandomPieceCommand())
      player.resetPosition()
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e
      }
      game.stop()
    }
  }
}
