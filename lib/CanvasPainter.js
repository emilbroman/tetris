const Colors = [
  "#394348",
  "#f7db3e",
  "#3eb7f7",
  "#43de85",
  "#ef1f38",
  "#ef8d1f",
  "#4b84e2",
  "#b864e8",
];

export class CanvasPainter {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;

    this.#ctx.scale(CanvasPainter.SCALE, CanvasPainter.SCALE);
  }

  fillRect([x, y], [w, h], color) {
    this.#ctx.fillStyle = color;
    this.#ctx.fillRect(x, y, w, h);
  }

  fillMatrix([x, y], matrix, { includeBackground = false } = {}) {
    matrix.forEachCell((cx, cy, value) => {
      if (includeBackground || value > 0) {
        this.fillRect([x + cx, y + cy], [1, 1], Colors[value]);
      }
    });
  }
}

CanvasPainter.SCALE = 20;
