import { CanvasPainter } from './lib/CanvasPainter.js'
import { TetrisGame } from './lib/TetrisGame.js'
import { Player } from './lib/Player.js'
import { GameBoard } from './lib/GameBoard.js'
import { KeyboardController } from './lib/controller/KeyboardController.js'
import { TouchController } from './lib/controller/TouchController.js'
import { TimedDropController } from './lib/controller/TimedDropController.js'
import { CompositeController } from './lib/controller/CompositeController.js'
import { MatrixCollisionDetector } from './lib/collision/MatrixCollisionDetector.js'

const $nomodule = document.querySelector('nomodule')
$nomodule.parentNode.removeChild($nomodule)

const $canvas = document.querySelector('#tetris')
const painter = new CanvasPainter($canvas.getContext('2d'))
const $audio = document.querySelector('audio')
const $score = document.querySelector('#score')

function newGame () {
  const board = new GameBoard(
    $canvas.width / CanvasPainter.SCALE,
    $canvas.height / CanvasPainter.SCALE
  )

  $audio.currentTime = 0
  $score.textContent = 0

  const collisionDetector = new MatrixCollisionDetector()

  const player = new Player(board, collisionDetector)

  player.onScoreUpdated(score => {
    $score.textContent = score
  })

  const game = new TetrisGame({
    painter,
    board,
    player,
    collisionDetector
  })
  if (window.game && window.game.isRunning) {
    window.game.stop()
  }
  window.game = game

  const controller = new CompositeController([
    new KeyboardController(game),
    new TimedDropController(game),
    new TouchController(game)
  ])
  controller.listen()

  game.start()
}
window.newGame = newGame

newGame()

window.toggleMusic = () => {
  if ($audio.paused) {
    $audio.play()
  } else {
    $audio.pause()
  }
}
