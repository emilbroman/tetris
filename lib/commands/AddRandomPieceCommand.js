import { AddPieceCommand } from './AddPieceCommand.js'
import { Pieces } from '../pieces/Pieces.js'

export class AddRandomPieceCommand extends AddPieceCommand {
  constructor () {
    const letters = 'OISZLJT'
    const randomLetter = letters[Math.floor(letters.length * Math.random())]

    super(Pieces[randomLetter])
  }
}
