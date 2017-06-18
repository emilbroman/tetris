import { CollisionDetectedError } from '../collision/CollisionDetectedError.js'

export class MoveLeftCommand {
  execute ({ player }) {
    const [x, y] = player.position
    try {
      player.position = [x - 1, y]
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e
      }
      player.position = [x, y]
    }
  }
}
