import { Matrix } from './Matrix.js'

export class GameBoard {
  constructor (width, height) {
    this.width = width
    this.height = height

    this.matrix = new Matrix(
      new Array(height).fill(
        new Array(width).fill(0)
      ).map(r => r.slice())
    )
  }

  place (piece, position) {
    this.matrix.apply(piece.matrix, position)
  }

  collectRows () {
    let rows = 0
    for (const row of this.matrix.rows) {
      let filled = true
      for (const cell of row) {
        if (cell === 0) {
          filled = false
          break
        }
      }
      if (filled) {
        const detachedRow = this.matrix.rows.splice(
          this.matrix.rows.indexOf(row),
          1
        )[0]
        this.matrix.rows.unshift(detachedRow.fill(0))

        rows++
      }
    }
    return rows
  }
}
