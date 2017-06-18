export class CompositeController {
  constructor (controllers) {
    this._controllers = controllers
  }

  listen () {
    for (const controller of this._controllers) {
      controller.listen()
    }
  }
}
