import { NextPieceCommand } from './commands/NextPieceCommand.js'

export class TetrisGame {
  constructor (context) {
    this._context = Object.assign({}, context, {
      game: this
    })
    this.isRunning = false

    this._update = this._update.bind(this)
    this._listeners = new Map()
  }

  start () {
    this.isRunning = true
    this.dispatch(new NextPieceCommand())
    this._update(0)
  }

  stop () {
    this.isRunning = false
    window.alert(`Final score: ${this._context.player.score}`)
  }

  on (command, listener) {
    if (!this._listeners.has(command)) {
      this._listeners.set(command, [])
    }

    this._listeners.get(command).push(listener)
  }

  dispatch (command) {
    this._listeners.forEach((listeners, com) => {
      if (command instanceof com) {
        for (const l of listeners) {
          l(command)
        }
      }
    })
    command.execute(this._context)
  }

  _update (time) {
    this._drawGameBoard()
    this._drawPlayer()

    if (this.isRunning) {
      window.requestAnimationFrame(this._update)
    }
  }

  _drawGameBoard () {
    const { board, painter } = this._context
    painter.fillMatrix([0, 0], board.matrix, { includeBackground: true })
  }

  _drawPlayer () {
    const { player, painter } = this._context
    if (player.piece == null) return
    painter.fillMatrix(player.position, player.piece.matrix)
  }
}
