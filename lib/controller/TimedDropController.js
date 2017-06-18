import { MoveDownCommand } from '../commands/MoveDownCommand.js'
import { DropPieceCommand } from '../commands/DropPieceCommand.js'

export class TimedDropController {
  constructor (game) {
    this._game = game

    this._tick = this._tick.bind(this)
    this._set = this._set.bind(this)
    this._interval = 1000
  }

  listen () {
    this._game.on(MoveDownCommand, this._set)
    this._game.on(DropPieceCommand, this._set)
    this._set()
    window.setInterval(() => {
      this._interval--
    }, 700)
  }

  _set () {
    if (this._timeout) {
      window.clearTimeout(this._timeout)
    }

    this._timeout = window.setTimeout(this._tick, this._interval)
  }

  _tick () {
    if (this._game.isRunning) {
      this._game.dispatch(new MoveDownCommand())
    }
  }
}
