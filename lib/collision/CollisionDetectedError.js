export class CollisionDetectedError extends Error {
  constructor ([x, y]) {
    super(`Collision detected at (${x},${y})`)
  }
}
