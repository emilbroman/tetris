import { MoveLeftCommand } from '../commands/MoveLeftCommand.js'
import { MoveRightCommand } from '../commands/MoveRightCommand.js'
import { MoveDownCommand } from '../commands/MoveDownCommand.js'
import { RotatePieceCommand } from '../commands/RotatePieceCommand.js'
import { DropPieceCommand } from '../commands/DropPieceCommand.js'

const Gesture = {
  Right: 'Right',
  Left: 'Left',
  Down: 'Down',
  Up: 'Up',
  Tap: 'Tap'
}

export class TouchController {
  constructor (game) {
    this._game = game

    this._onTouchStart = this._onTouchStart.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)
  }

  listen () {
    window.addEventListener('touchstart', this._onTouchStart)
    window.addEventListener('touchend', this._onTouchEnd)
    window.addEventListener('touchmove', () => {})
  }

  _onTouchStart (e) {
    e.preventDefault()
    this._startTouch = e.touches[0]
  }

  _onTouchEnd (e) {
    e.preventDefault()
    const endTouch = e.changedTouches[0]
    const startTouch = this._startTouch

    const xDiff = endTouch.clientX - startTouch.clientX
    const yDiff = endTouch.clientY - startTouch.clientY

    const direction = this._direction(xDiff, yDiff)

    switch (direction) {
      case Gesture.Down:
        return this._game.dispatch(new MoveDownCommand())
      case Gesture.Left:
        return this._game.dispatch(new MoveLeftCommand())
      case Gesture.Right:
        return this._game.dispatch(new MoveRightCommand())
      case Gesture.Tap:
        return this._game.dispatch(new RotatePieceCommand())
      case Gesture.Up:
        return this._game.dispatch(new DropPieceCommand())
    }
  }

  _direction (x, y) {
    if (Math.abs(x) + Math.abs(y) < 40) {
      return Gesture.Tap
    }

    if (Math.abs(x) > Math.abs(y)) {
      if (x > 0) {
        return Gesture.Right
      }
      return Gesture.Left
    }
    if (y > 0) {
      return Gesture.Down
    }
    return Gesture.Up
  }
}
