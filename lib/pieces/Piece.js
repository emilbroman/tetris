export class Piece {
  constructor (matrix) {
    this.matrix = matrix
  }

  get width () {
    return this.matrix.width
  }

  get height () {
    return this.matrix.height
  }

  rotate () {
    this.matrix.reverseRows()
    this.matrix.transpose()
  }
}
