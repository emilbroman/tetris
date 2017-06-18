export class Matrix {
  constructor (rows) {
    this.rows = rows
  }

  get width () {
    return this.rows[0].length
  }

  get height () {
    return this.rows.length
  }

  forEachCell (cb) {
    let broken = false
    let returnValue
    const br = (v) => {
      broken = true
      returnValue = v
    }
    this.rows.forEach((row, y) => {
      if (broken) return
      row.forEach((cell, x) => {
        if (broken) return
        cb(x, y, cell, br)
      })
    })
    return returnValue
  }

  reverseRows () {
    this.rows.reverse()
  }

  transpose () {
    let rows = []
    this.forEachCell((x, y, cell) => {
      rows[x] = rows[x] || []
      rows[x][y] = cell
    })
    this.rows = rows
  }

  cell (x, y) {
    return this.rows[y][x]
  }

  apply (matrix, [bx, by]) {
    matrix.forEachCell((x, y, cell) => {
      if (cell === 0) return
      this.rows[y + by][x + bx] = cell
    })
  }
}
