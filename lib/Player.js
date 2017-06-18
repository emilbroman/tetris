import { CollisionDetectedError } from './collision/CollisionDetectedError.js'

export class Player {
  constructor (board, collisionDetector) {
    this._board = board
    this._collisionDetector = collisionDetector

    this._score = 0
    this.piece = null
    this._position = [0, 0]
    this._scoreListeners = []
  }

  get score () {
    return this._score
  }

  set score (score) {
    this._score = score
    for (const listener of this._scoreListeners) {
      listener(score)
    }
  }

  get position () {
    return this._position
  }

  set position (position) {
    this._position = position

    this._checkCollision()
  }

  onScoreUpdated (listener) {
    this._scoreListeners.push(listener)
  }

  _checkCollision () {
    if (this.piece == null) return

    this._collisionDetector.check(
      this._board.matrix,
      this.piece.matrix,
      this.position
    )
  }

  resetPosition () {
    const y = 0
    const x = Math.floor(
      this._board.width / 2 - this.piece.width / 2
    )
    this.position = [x, y]
  }

  rotatePiece () {
    if (this.piece == null) return
    try {
      this.piece.rotate()
      this._moveOutOfCollisions()
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e
      }
      this.piece.rotate()
      this.piece.rotate()
      this.piece.rotate()
    }
  }

  _moveOutOfCollisions (checkDistance = 1) {
    try {
      this._checkCollision()
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e
      }

      const [x, y] = this.position
      if (y + this.piece.height > this._board.height) {
        this._position = [x, y - 1]
      } else if (x < 0) {
        this._position = [x + 1, y]
      } else if (x + this.piece.width > this._board.width) {
        this._position = [x - 1, y]
      } else {
        this._position = [x + checkDistance, y]
        if (checkDistance > 2) {
          throw e
        }
        checkDistance = -(checkDistance * 2)
      }

      this._moveOutOfCollisions(checkDistance)
    }
  }
}
