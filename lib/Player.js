import { CollisionDetectedError } from "./collision/CollisionDetectedError.js";

export class Player {
  #board;
  #collisionDetector;
  #score = 0;
  #position = [0, 0];
  #scoreListeners = [];

  piece;

  constructor(board, collisionDetector) {
    this.#board = board;
    this.#collisionDetector = collisionDetector;
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
    for (const listener of this.#scoreListeners) {
      listener(score);
    }
  }

  get position() {
    return this.#position;
  }

  set position(position) {
    this.#position = position;

    this.#checkCollision();
  }

  onScoreUpdated(listener) {
    this.#scoreListeners.push(listener);
  }

  #checkCollision() {
    if (this.piece == null) return;

    this.#collisionDetector.check(
      this.#board.matrix,
      this.piece.matrix,
      this.position
    );
  }

  resetPosition() {
    const y = 0;
    const x = Math.floor(this.#board.width / 2 - this.piece.width / 2);
    this.position = [x, y];
  }

  rotatePiece() {
    if (this.piece == null) return;
    try {
      this.piece.rotate();
      this.#moveOutOfCollisions();
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e;
      }
      this.piece.rotate();
      this.piece.rotate();
      this.piece.rotate();
    }
  }

  #moveOutOfCollisions(checkDistance = 1) {
    try {
      this.#checkCollision();
    } catch (e) {
      if (!(e instanceof CollisionDetectedError)) {
        throw e;
      }

      const [x, y] = this.position;
      if (y + this.piece.height > this.#board.height) {
        this.#position = [x, y - 1];
      } else if (x < 0) {
        this.#position = [x + 1, y];
      } else if (x + this.piece.width > this.#board.width) {
        this.#position = [x - 1, y];
      } else {
        this.#position = [x + checkDistance, y];
        if (checkDistance > 2) {
          throw e;
        }
        checkDistance = -(checkDistance * 2);
      }

      this.#moveOutOfCollisions(checkDistance);
    }
  }
}
