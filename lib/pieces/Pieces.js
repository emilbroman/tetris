import { Matrix } from '../Matrix.js'
import { Piece } from './Piece.js'

export const Pieces = {
  O: new Piece(new Matrix([
    [1, 1],
    [1, 1]
  ])),
  I: new Piece(new Matrix([
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 0]
  ])),
  S: new Piece(new Matrix([
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0]
  ])),
  Z: new Piece(new Matrix([
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0]
  ])),
  L: new Piece(new Matrix([
    [0, 5, 0],
    [0, 5, 0],
    [0, 5, 5]
  ])),
  J: new Piece(new Matrix([
    [0, 6, 0],
    [0, 6, 0],
    [6, 6, 0]
  ])),
  T: new Piece(new Matrix([
    [0, 0, 0],
    [7, 7, 7],
    [0, 7, 0]
  ]))
}
