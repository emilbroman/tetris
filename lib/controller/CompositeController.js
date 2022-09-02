export class CompositeController {
  #controllers;

  constructor(controllers) {
    this.#controllers = controllers;
  }

  listen() {
    for (const controller of this.#controllers) {
      controller.listen();
    }
  }
}
