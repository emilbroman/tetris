import { CollisionDetectedError } from './CollisionDetectedError.js'

export class MatrixCollisionDetector {
  /**
   * @throws collision.CollisionDetectedError
   */
  check (parent, child, [x, y]) {
    child.forEachCell((cx, cy, ccell) => {
      const ocx = cx + x
      const ocy = cy + y

      if (ccell === 0) return

      const isOutsideParent =
        ocx < 0 ||
        ocy < 0 ||
        ocx >= parent.width ||
        ocy >= parent.height

      if (isOutsideParent) {
        throw new CollisionDetectedError([ocx, ocy])
      }

      const pcell = parent.cell(ocx, ocy)

      if (pcell > 0) {
        throw new CollisionDetectedError([ocx, ocy])
      }
    })
  }
}
