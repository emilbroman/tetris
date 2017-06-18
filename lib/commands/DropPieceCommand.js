import { CollisionDetectedError } from '../collision/CollisionDetectedError.js'

export class DropPieceCommand {
  execute ({ player }) {
    let [x, y] = []
    try {
      while (true) {
        [x, y] = player.position
        player.position = [x, y + 1]
      }
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e
      }
      player.position = [x, y]
    }
  }
}
